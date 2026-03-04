import { useEffect, useState } from "react";
import type { OrderResponseDto } from "../../models/order/OrderResponseDto";
import { OrderApiService } from "../../api_services/orderApi/OrderApiService";
import { useAuth } from "../../hooks/auth/useAuthHook";


export default function UserOrdersPage() {
    const [orders, setOrders] = useState<OrderResponseDto[]>([]);
    const service = new OrderApiService();

    const { token } = useAuth();

    useEffect(() => {
        if (token) {
            service.getMyOrders(token).then(setOrders);
        }
    }, [token]);

    return (
        <div className="p-10 text-white">
            <h1 className="text-2xl mb-6">Moje narudžbine</h1>

            {orders.map(order => (
                <div
                    key={order.orderId}
                    className="border border-[#1F3337] p-4 mb-4 rounded"
                >
                    <p>ID: {order.orderId}</p>
                    <p>Status: {order.orderStatus}</p>
                    <p>Ukupno: {order.totalPrice} RSD</p>
                </div>
            ))}
        </div>
    );
}