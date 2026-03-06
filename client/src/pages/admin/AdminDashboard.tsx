import { Link } from "react-router-dom"

export default function AdminDashboard(){

  return(

    <div className="max-w-6xl mx-auto px-6 py-12">

      <h1 className="text-4xl font-bold mb-12">
        Admin panel
      </h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

        <Link
          to="/admin/items"
          className="card hover:border-[#3F8A4B]"
        >
          <h2 className="text-xl font-semibold mb-2">
            Artikli
          </h2>

          <p className="text-[#9DB7AA] text-sm">
            Pregled i uređivanje svih artikala
          </p>
        </Link>

        <Link
          to="/admin/orders"
          className="card hover:border-[#3F8A4B]"
        >
          <h2 className="text-xl font-semibold mb-2">
            Porudžbine
          </h2>

          <p className="text-[#9DB7AA] text-sm">
            Pregled porudžbina kupaca
          </p>
        </Link>

        <Link
          to="/admin/items/add"
          className="card hover:border-[#3F8A4B]"
        >
          <h2 className="text-xl font-semibold mb-2">
            Dodaj artikal
          </h2>

          <p className="text-[#9DB7AA] text-sm">
            Dodavanje novog proizvoda
          </p>
        </Link>

      </div>

    </div>

  )
}