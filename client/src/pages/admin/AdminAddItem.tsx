import { useState } from "react"
import BookForm from "../../components/admin/BookForm"
import AccessoryForm from "../../components/admin/AccessoryForm"

export default function AdminAddItem(){

  const [type,setType] = useState("book")

  return(

    <div className="min-h-screen bg-[#0F1C1F] text-[#EAF4EF] py-16 px-6">

      <div className="max-w-6xl mx-auto">

        <div className="flex justify-between items-center mb-10">

          <h1 className="text-4xl font-bold">
            Add Item
          </h1>

          <select
            value={type}
            onChange={(e)=>setType(e.target.value)}
            className="bg-[#142326] border border-[#1F3337] rounded-lg p-3"
          >
            <option value="book">Book</option>
            <option value="accessory">Accessory</option>
          </select>

        </div>

        {type === "book" && <BookForm/>}
        {type === "accessory" && <AccessoryForm/>}

      </div>

    </div>

  )
}