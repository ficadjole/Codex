import { Router, Request, Response } from "express";
import { IOrderService } from "../../Domain/services/order/IOrderService";
import { authenticate } from "../middlewere/authentification/AuthMiddleware";
import { authorize } from "../middlewere/authorization/AuthorizeMiddleware";
import { UserRole } from "../../Domain/enums/UserRole";
import { optionalAuth } from "../middlewere/authentification/OptionalAuthMiddleware";

export class OrderController {
    private router: Router;
    private orderService: IOrderService;

    constructor(orderService: IOrderService) {
        this.router = Router();
        this.orderService = orderService;
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        // Kreiranje narudžbine (ulogovan korisnik)
        this.router.post("/createOrder", optionalAuth, this.createOrder.bind(this));

        // Sve moje narudžbine
        this.router.get("/getMyOrders", authenticate, this.getMyOrders.bind(this));

        // Jedna narudžbina po ID
        this.router.get(
            "/getOrderById/:orderId",
            authenticate,
            this.getOrderById.bind(this),
        );

        this.router.get(
            "/getFullDetails/:orderId",
            authenticate,
            this.getFullOrderDetails.bind(this)
        );

        // Admin – sve narudžbine
        this.router.get(
            "/getAllOrders",
            authenticate,
            authorize(UserRole.ADMIN),
            this.getAllOrders.bind(this),
        );

        // Admin – promena statusa
        this.router.put(
            "/changeStatus/:orderId",
            authenticate,
            authorize(UserRole.ADMIN),
            this.changeStatus.bind(this),
        );

        // Brisanje (admin)
        this.router.delete(
            "/deleteOrder/:orderId",
            authenticate,
            authorize(UserRole.ADMIN),
            this.deleteOrder.bind(this),
        );
    }

    private async createOrder(req: Request, res: Response) {
        try {
            const userId = req.user?.id; // iz tokena ako ga nema saljemo undefined tj null sto je okej jer nam to baza podrzava
            const orderData = req.body;
            const result = await this.orderService.createOrder(userId!, orderData);

            if (result.orderId === null)
                return res
                    .status(400)
                    .json({ success: false, message: "Failed to create order." });
                    
            
            

            res.status(201).json({ success: true, message: "Order created successfully." });
        } catch {
            res.status(500).json({ success: false, message: "Server error." });
        }
    }

    private async getMyOrders(req: Request, res: Response) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized",
                });
            }
            const result = await this.orderService.getUserOrders(userId);

            if (result.length === 0)
                return res
                    .status(404)
                    .json({ success: false, message: "No orders found." });

            res.status(200).json({ success: true, data: result });
        } catch {
            res.status(500).json({ success: false, message: "Server error." });
        }
    }

    private async getOrderById(req: Request, res: Response) {
        try {
            const orderId = parseInt(req.params.orderId);
            const user = req.user;

            if (user === undefined) {
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized",
                });
            }

            if (isNaN(orderId))
                return res
                    .status(400)
                    .json({ success: false, message: "Invalid orderId." });

            const order = await this.orderService.getOrderById(orderId);

            if (!order)
                return res
                    .status(404)
                    .json({ success: false, message: "Order not found." });

            // Ako nije admin i nije vlasnik narudžbine
            if (user.userRole !== UserRole.ADMIN && order.userId !== user.id) {
                return res.status(403).json({
                    success: false,
                    message: "You are not allowed to view this order.",
                });
            }

            res.status(200).json({ success: true, data: order });
        } catch {
            res.status(500).json({ success: false, message: "Server error." });
        }
    }

    private async getFullOrderDetails(
        req: Request,
        res: Response
    ): Promise<void> {
        try {
            const orderId = parseInt(req.params.orderId as string, 10);

            if (isNaN(orderId)) {
                res.status(400).json({
                    success: false,
                    message: "Invalid orderId.",
                });
                return;
            }

            const user = req.user;

            if (!user) {
                res.status(401).json({
                    success: false,
                    message: "Unauthorized",
                });
                return;
            }

            const result = await this.orderService.getFullOrderDetails(orderId);

            if (!result || !result.order) {
                res.status(404).json({
                    success: false,
                    message: "Order not found.",
                });
                return;
            }

            if (
                user.userRole !== UserRole.ADMIN &&
                result.order.userId !== user.id
            ) {
                res.status(403).json({
                    success: false,
                    message: "You are not allowed to view this order.",
                });
                return;
            }

            res.status(200).json({
                success: true,
                message: "Order details fetched successfully.",
                data: result,
            });
        } catch {
            res.status(500).json({
                success: false,
                message: "Server error occurred.",
            });
        }
    }


    private async getAllOrders(req: Request, res: Response) {
        try {
            const result = await this.orderService.getAllOrders();

            if (result.length === 0)
                return res
                    .status(404)
                    .json({ success: false, message: "No orders available." });

            res.status(200).json({ success: true, data: result });
        } catch {
            res.status(500).json({ success: false, message: "Server error." });
        }
    }

    private async changeStatus(req: Request, res: Response) {
        try {
            const orderId = parseInt(req.params.orderId);
            const { status } = req.body;

            if (isNaN(orderId))
                return res
                    .status(400)
                    .json({ success: false, message: "Invalid orderId." });

            const result = await this.orderService.changeStatus(orderId, status);

            if (!result)
                return res
                    .status(400)
                    .json({ success: false, message: "Failed to update status." });

            res.status(200).json({ success: true, message: "Order status updated." });
        } catch {
            res.status(500).json({ success: false, message: "Server error." });
        }
    }

    private async deleteOrder(req: Request, res: Response) {
        try {
            const orderId = parseInt(req.params.orderId);

            if (isNaN(orderId))
                return res
                    .status(400)
                    .json({ success: false, message: "Invalid orderId." });

            const result = await this.orderService.deleteOrder(orderId);

            if (!result)
                return res
                    .status(400)
                    .json({ success: false, message: "Failed to delete order." });

            res
                .status(200)
                .json({ success: true, message: "Order deleted successfully." });
        } catch {
            res.status(500).json({ success: false, message: "Server error." });
        }
    }

    public getRouter(): Router {
        return this.router;
    }
}
