import { useEffect, useState } from "react";
import type { OrderResponseDto } from "../../models/order/OrderResponseDto";
import { useAuth } from "../../hooks/auth/useAuthHook";
import { useNavigate } from "react-router-dom";
import type { OrderApiProps } from "../../types/props/order_props/OrderApiProps";


export default function UserOrdersPage({ orderApi }: OrderApiProps) {
  const [orders, setOrders] = useState<OrderResponseDto[]>([]);
  const navigate = useNavigate();
  const { token } = useAuth();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    if (!token) return;
    const data = await orderApi.getMyOrders(token);
    setOrders(data);
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "na_cekanju":
        return {
          label: "Na čekanju",
          className: "bg-yellow-500/20 text-yellow-400",
        };
      case "poslato":
        return {
          label: "Poslato",
          className: "bg-green-500/20 text-green-400",
        };
      case "otkazano":
        return {
          label: "Otkazano",
          className: "bg-red-500/20 text-red-400",
        };
      case "isporuceno":
        return {
          label: "Isporučeno",
          className: "bg-blue-500/20 text-blue-400",
        };
      default:
        return {
          label: status,
          className: "bg-gray-500/20 text-gray-400",
        };
    }
  };


  return (
    <div className="min-h-screen px-4 sm:px-8 md:px-12 py-8">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-10">
        Moje narudžbine
      </h1>

      {orders.length === 0 ? (
        <div className="bg-[#142326] border border-[#1F3337] rounded-2xl p-8 text-center text-[#9DB7AA]">
          Nemate nijednu narudžbinu.
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-220">
          {orders.map((order) => ( 
            <div
              key={order.orderId}
              onClick={() => navigate(`/orders/${order.orderId}`)}
              className="bg-[#142326] border border-[#1F3337] rounded-2xl p-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transition cursor-pointer group"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">
                  #{order.orderId}
                </h2>

                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusConfig(order.orderStatus).className}`}>
                  {getStatusConfig(order.orderStatus).label}
                </span>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#9DB7AA]">Ukupno</span>
                  <span className="font-semibold text-[#3F8A4B]">
                    {order.totalPrice} RSD
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-[#9DB7AA]">Datum</span>
                  <span>
                    {new Date(order.orderDate).toLocaleString("sr-RS")}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}