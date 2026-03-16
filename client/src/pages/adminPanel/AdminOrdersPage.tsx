import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import type { OrderResponseDto } from "../../models/order/OrderResponseDto"
import type { OrderApiProps } from "../../types/props/order_props/OrderApiProps"
import { useAuth } from "../../hooks/auth/useAuthHook"
import Pagination from "../../components/pagination/Pagination"

export default function AdminOrdersPage({ orderApi }: OrderApiProps) {

  const [orders, setOrders] = useState<OrderResponseDto[]>([])
  const [statusFilter, setStatusFilter] = useState("sve")

  const [currentPage, setCurrentPage] = useState(1)
  const ordersPerPage = 10

  const navigate = useNavigate()
  const { token } = useAuth()

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    if (!token) return

    const data = await orderApi.getAllOrders(token)
    setOrders(data)
  }

  // filtriranje po statusu
  const filteredOrders =
    statusFilter === "sve"
      ? orders
      : orders.filter((o) => o.orderStatus === statusFilter)

  // pagination logika
  const indexOfLastOrder = currentPage * ordersPerPage
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage

  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  )

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage)

  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-semibold">
        Sve narudžbine
      </h1>

      <div className="bg-[#142326] border border-[#1F3337] rounded-2xl p-6 shadow-lg space-y-6">

        <div className="flex items-center gap-4">

          <label className="text-sm text-[#9DB7AA]">
            Filtriraj po statusu:
          </label>

          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value)
              setCurrentPage(1)
            }}
            className="bg-[#142326] border border-[#1F3337] text-[#EAF4EF]
                       pl-4 pr-3 py-2 rounded-lg
                       focus:outline-none focus:border-[#3F8A4B]"
          >
            <option value="sve">Sve</option>
            <option value="na_cekanju">Na čekanju</option>
            <option value="placeno">Plaćeno</option>
            <option value="poslato">Poslato</option>
            <option value="otkazano">Otkazano</option>
          </select>

        </div>

        <p className="text-sm text-[#9DB7AA]">
          Ukupno narudžbina: {filteredOrders.length}
        </p>

        <div className="bg-[#142326] rounded-2xl shadow-xl border border-[#1F3337] overflow-x-auto w-250">

          <table className="min-w-[500px] w-full text-sm text-center">

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

              {currentOrders.map((order) => {

                const isFinalStatus =
                  order.orderStatus === "poslato" ||
                  order.orderStatus === "otkazano"

                return (

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

                    <td
                      className="px-6 py-4"
                      onClick={(e) => e.stopPropagation()}
                    >

                      <select
                        value={order.orderStatus}
                        disabled={isFinalStatus}
                        onChange={async (e) => {

                          if (!token) return

                          const newStatus = e.target.value

                          const success = await orderApi.changeStatus(
                            token,
                            order.orderId,
                            newStatus
                          )

                          if (success) {
                            setOrders((prev) =>
                              prev.map((o) =>
                                o.orderId === order.orderId
                                  ? { ...o, orderStatus: newStatus }
                                  : o
                              )
                            )
                          }

                        }}
                        className={`border border-[#1F3337] rounded px-2 py-1 text-sm
                          ${isFinalStatus
                            ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                            : "bg-[#142326] text-[#EAF4EF]"
                          }`}
                      >
                        <option value="na_cekanju">Na čekanju</option>
                        <option value="placeno">Plaćeno</option>
                        <option value="poslato">Poslato</option>
                        <option value="otkazano">Otkazano</option>
                      </select>

                    </td>

                    <td className="px-6 py-4 font-semibold text-[#3F8A4B]">
                      {order.totalPrice} RSD
                    </td>

                    <td className="px-6 py-4 text-[#9DB7AA]">
                      {new Date(order.orderDate).toLocaleString("sr-RS")}
                    </td>

                  </tr>

                )
              })}

            </tbody>

          </table>

        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />

      </div>

    </div>
  )
}