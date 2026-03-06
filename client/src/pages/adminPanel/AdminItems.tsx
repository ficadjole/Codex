import { Link } from "react-router-dom";

export default function AdminItems(){

return(

<div className="space-y-6">

<h1 className="text-2xl font-semibold">
Artikli
</h1>

<div className="bg-[#142326] border border-[#1F3337] rounded-2xl p-6 shadow-lg">

<div className="flex justify-end mb-6">

<Link
to="/admin/items/add"
className="bg-[#3F8A4B] hover:bg-[#34733f] text-white px-4 py-2 rounded-lg transition"
>
+ Dodaj artikal
</Link>

</div>

{/* tabela */}

</div>

</div>

)
}