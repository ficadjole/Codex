import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { OrderResponseDto } from "../../models/order/OrderResponseDto";
import type { OrderApiProps } from "../../types/props/order_props/OrderApiProps";
import { useAuth } from "../../hooks/auth/useAuthHook";

export default function AdminOrdersPage({ orderApi }: OrderApiProps) {
  const [orders, setOrders] = useState<OrderResponseDto[]>([]);
  const navigate = useNavigate();
  const { token } = useAuth();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    if (!token) return;

    const data = await orderApi.getAllOrders(token);
    setOrders(data);
  };

  return (
    <div className="px-4 sm:px-8 md:px-12 py-8">
      <h1 className="text-2xl sm:text-3xl font-semibold mb-8">
        Sve narudžbine
      </h1>

      <div className="bg-[#142326] rounded-2xl shadow-xl border border-[#1F3337] overflow-x-auto w-300">
        <table className="min-w-[700px] w-full text-sm text-center">
          <thead className="bg-[#1B2E33] text-[#9DB7AA] uppercase text-xs tracking-wider">
            <tr>
              <th className="px-6 py-4">ID</th>
              <th className="px-6 py-4">Korisnik</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Ukupno</th>
              <th className="px-6 py-4">Datum</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order.orderId}
                onClick={() =>
                  navigate(`/admin/orders/${order.orderId}`)
                }
                className="border-t border-[#1F3337] hover:bg-[#1B2E33] transition cursor-pointer"
              >
                <td className="px-6 py-4 font-medium">
                  #{order.orderId}
                </td>
                <td className="px-6 py-4">
                  {order.firstname} {order.lastname}
                </td>
                <td className="px-6 py-4">
                  {order.orderStatus}
                </td>
                <td className="px-6 py-4 font-semibold text-[#3F8A4B]">
                  {order.totalPrice} RSD
                </td>
                <td className="px-6 py-4 text-[#9DB7AA]">
                  {new Date(order.orderDate).toLocaleString("sr-RS")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}