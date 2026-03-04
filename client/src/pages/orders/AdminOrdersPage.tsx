import { useEffect, useState } from "react";
import { OrderApiService } from "../../api_services/orderApi/OrderApiService";
import type { OrderResponseDto } from "../../models/order/OrderResponseDto";
import { useAuth } from "../../hooks/auth/useAuthHook";

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<OrderResponseDto[]>([]);
    const service = new OrderApiService();

    const { token } = useAuth();

    useEffect(() => {
        if (token) {
            service.getAllOrders(token).then(setOrders);
        }
    }, [token]);

    return (
        <div className="p-10 text-white">
            <h1 className="text-2xl mb-6">Sve narudžbine</h1>

            {orders.map(order => (
                <div
                    key={order.orderId}
                    className="border border-[#1F3337] p-4 mb-4 rounded"
                >
                    <p>ID: {order.orderId}</p>
                    <p>Korisnik ID: {order.userId}</p>
                    <p>Status: {order.orderStatus}</p>
                    <p>Ukupno: {order.totalPrice} RSD</p>
                </div>
            ))}
        </div>
    );
}