import { Link, Outlet } from "react-router-dom";

export default function AdminLayout() {

  return (

    <div className="flex min-h-screen bg-[#0E1A1E] text-white">

      <aside className="w-60 bg-[#152529] p-6">

        <h2 className="text-xl font-bold mb-10">
          Admin Panel
        </h2>

        <nav className="flex flex-col gap-4">

          <Link to="/admin">
            Dashboard
          </Link>

          <Link to="/admin/items">
            Items
          </Link>

          <Link to="/admin/orders">
            Orders
          </Link>

        </nav>

      </aside>

      <main className="flex-1 p-10">
        <Outlet />
      </main>

    </div>

  )
}