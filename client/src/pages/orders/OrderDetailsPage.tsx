import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { OrderDetailsResponseDto } from "../../models/order/OrderDetailsResponseDto";
import type { OrderApiProps } from "../../types/props/order_props/OrderApiProps";
import { useAuth } from "../../hooks/auth/useAuthHook";

export default function OrderDetailsPage({
    orderApi,
}: OrderApiProps) {
    const { orderId } = useParams();
    const [data, setData] = useState<OrderDetailsResponseDto | null>(null);
    const { token } = useAuth();


    useEffect(() => {
        fetchDetails();
    }, []);

    const fetchDetails = async () => {
        if (!token || !orderId) return;

        const result = await orderApi.getFullDetails(
            Number(orderId),
            token
        );

        setData(result);
    };

    if (!data)
        return <div className="p-10 text-white">Loading...</div>;

    const { order, items } = data;

    return (
  <div className="min-h-screen bg-[#0F1C1F] text-[#EAF4EF] py-16 px-6">
    <div className="max-w-6xl mx-auto">

      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-12">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">
            Narudžbina #{order.orderId}
          </h1>
          <p className="text-[#9DB7AA] mt-2">
            {new Date(order.orderDate).toLocaleString("sr-RS")}
          </p>
        </div>

        <span
          className={`
            mt-4 md:mt-0
            px-4 py-2 rounded-full text-sm font-medium
            ${
              order.orderStatus === "pending"
                ? "bg-yellow-500/20 text-yellow-400"
                : order.orderStatus === "completed"
                ? "bg-green-500/20 text-green-400"
                : "bg-blue-500/20 text-blue-400"
            }
          `}
        >
          {order.orderStatus}
        </span>
      </div>

      <div className="grid lg:grid-cols-3 gap-10">

        <div className="lg:col-span-2 bg-[#142326] rounded-2xl border border-[#1F3337] shadow-xl p-8">
          <h2 className="text-2xl font-semibold mb-8">Stavke</h2>

          <div className="space-y-6">
            {items.map((item) => (
              <div
                key={item.orderId}
                className="flex justify-between items-center border-b border-[#1F3337] pb-4"
              >
                <div>
                  <p className="font-medium text-lg">
                    Proizvod #{item.itemId}
                  </p>
                  <p className="text-sm text-[#9DB7AA]">
                    Količina: {item.quantity}
                  </p>
                  <p className="text-sm text-[#9DB7AA]">
                    Cena po komadu: {item.price} RSD
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-semibold text-[#3F8A4B] text-lg">
                    {item.quantity * item.price} RSD
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#142326] rounded-2xl border border-[#1F3337] shadow-xl p-8 space-y-6">
          <h2 className="text-xl font-semibold">Podaci o kupcu</h2>

          <div className="space-y-2 text-sm">
            <p className="font-medium">
              {order.firstname} {order.lastname}
            </p>
            <p className="text-[#9DB7AA]">{order.email}</p>
            <p className="text-[#9DB7AA]">{order.city}</p>
            <p className="text-[#9DB7AA]">
              {order.streat} {order.streatNumber}
            </p>
          </div>

          <hr className="border-[#1F3337]" />

          <div className="flex justify-between text-lg font-semibold">
            <span>Ukupno</span>
            <span className="text-[#3F8A4B]">
              {order.totalPrice} RSD
            </span>
          </div>
        </div>

      </div>
    </div>
  </div>
);
}