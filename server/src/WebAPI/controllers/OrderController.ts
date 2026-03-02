import { Router, Request, Response } from "express";
import { IOrderService } from "../../Domain/services/order/IOrderService";
import { authenticate } from "../middlewere/authentification/AuthMiddleware";
import { authorize } from "../middlewere/authorization/AuthorizeMiddleware";
import { UserRole } from "../../Domain/enums/UserRole";

export class OrderController {
    private router: Router;
    private service: IOrderService;

    constructor(service: IOrderService) {
        this.router = Router();
        this.service = service;
        this.initializeRoutes();
    }

    private initializeRoutes(): void {

        // Kreiranje narudžbine (ulogovan korisnik)
        this.router.post(
            "/createOrder",
            authenticate,
            this.createOrder.bind(this)
        );

        // Sve moje narudžbine
        this.router.get(
            "/getMyOrders",
            authenticate,
            this.getMyOrders.bind(this)
        );

        // Jedna narudžbina po ID
        this.router.get(
            "/getOrderById/:orderId",
            authenticate,
            this.getOrderById.bind(this)
        );

        // Admin – sve narudžbine
        this.router.get(
            "/getAllOrders",
            authenticate,
            authorize(UserRole.ADMIN),
            this.getAllOrders.bind(this)
        );

        // Admin – promena statusa
        this.router.put(
            "/changeStatus/:orderId",
            authenticate,
            authorize(UserRole.ADMIN),
            this.changeStatus.bind(this)
        );

        // Brisanje (admin)
        this.router.delete(
            "/deleteOrder/:orderId",
            authenticate,
            authorize(UserRole.ADMIN),
            this.deleteOrder.bind(this)
        );
    }

    private async createOrder(req: Request, res: Response) {
        try {
            const userId = (req as any).user.userId;
            const orderData = req.body;

            const result = await this.service.createOrder(userId, orderData);

            if (result.orderId === null)
                return res
                    .status(400)
                    .json({ success: false, message: "Failed to create order." });

            res
                .status(201)
                .json({ success: true, message: "Order created successfully." });
        } catch {
            res.status(500).json({ success: false, message: "Server error." });
        }
    }

    private async getMyOrders(req: Request, res: Response) {
        try {
            const userId = (req as any).user.userId;

            const result = await this.service.getUserOrders(userId);

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
            const user = (req as any).user;

            if (isNaN(orderId))
                return res.status(400).json({ success: false, message: "Invalid orderId." });

            const order = await this.service.getOrderById(orderId);

            if (!order)
                return res.status(404).json({ success: false, message: "Order not found." });

            // Ako nije admin i nije vlasnik narudžbine
            if (user.userRole !== UserRole.ADMIN && order.userId !== user.userId) {
                return res.status(403).json({
                    success: false,
                    message: "You are not allowed to view this order."
                });
            }

            res.status(200).json({ success: true, data: order });

        } catch {
            res.status(500).json({ success: false, message: "Server error." });
        }
    }

    private async getAllOrders(req: Request, res: Response) {
        try {
            const result = await this.service.getAllOrders();

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

            const result = await this.service.changeStatus(orderId, status);

            if (!result)
                return res
                    .status(400)
                    .json({ success: false, message: "Failed to update status." });

            res
                .status(200)
                .json({ success: true, message: "Order status updated." });
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

            const result = await this.service.deleteOrder(orderId);

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