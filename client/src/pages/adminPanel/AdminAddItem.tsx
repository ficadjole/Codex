import { useState } from "react"
import BookForm from "../../components/admin/BookForm"
import AccessoryForm from "../../components/admin/AccessoryForm"
import type { AdminApiProps } from "../../types/props/admin_add_item_props/AdminAddItemProps"


export default function AdminAddItem({genreApi, itemApi} : AdminApiProps){

const [type,setType] = useState("knjiga")

return(

<div className="space-y-6">

<h1 className="text-2xl font-semibold">
Dodaj artikal
</h1>

<div className="bg-[#142326] border border-[#1F3337] rounded-2xl p-6 shadow-lg space-y-6">

<div className="flex justify-between items-center">

<select
value={type}
onChange={(e)=>setType(e.target.value)}
className="bg-[#142326] border border-[#1F3337] rounded-lg p-3"
>
<option value="knjiga">Knjiga</option>
<option value="aksesoar">Aksesoar</option>
</select>

</div>

{type==="knjiga" && <BookForm genreApi={genreApi} itemApi={itemApi}/>}
{type==="aksesoar" && <AccessoryForm/>}

</div>

</div>

)
}