import { NavLink, Outlet } from "react-router-dom";

export default function AdminLayout() {

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md transition
     hover:bg-[#1F3337] hover:text-[#9DB7AA]
     ${isActive ? "bg-[#1F3337] text-[#9DB7AA]" : ""}`;

  return (

    <div className="min-h-screen text-white flex justify-center py-10">

      {/* GLAVNI ADMIN PANEL */}
      <div className="w-[1400px] bg-[#0F1C1F] rounded-xl border border-[#1F3337] flex ">

        {/* SIDEBAR */}
        <aside className="w-64 bg-[#152529] p-6 flex flex-col">

          <h2 className="text-xl font-bold mb-6">
            Admin Panel
          </h2>

          <hr className="border-[#1F3A40] mb-6" />

          <nav className="flex flex-col gap-2 text-sm">

            <NavLink to="/admin/orders" className={linkClass}>
              Narudžbine
            </NavLink>

            <NavLink to="/admin/items" end className={linkClass}>
              Artikli
            </NavLink>

            <NavLink to="/admin/genres" className={linkClass}>
              Žanrovi
            </NavLink>

          </nav>

        </aside>

        {/* CONTENT */}
        <main className="flex-1 p-8">

          <Outlet />

        </main>

      </div>

    </div>

  )
}