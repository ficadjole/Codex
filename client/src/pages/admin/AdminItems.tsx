import { Link } from "react-router-dom"

export default function AdminItems(){

  return(

    <div>

      <div className="flex justify-between mb-6">

        <h1 className="text-2xl font-bold">
          Items
        </h1>

        <Link
          to="/admin/items/add"
          className="bg-[#9DB7AA] text-black px-4 py-2 rounded"
        >
          + Add item
        </Link>

      </div>

      {/* ovde ide tabela artikala */}

    </div>

  )
}