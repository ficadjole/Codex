import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/auth/useAuthHook"
import { FaTrash, FaEdit, FaPercent } from "react-icons/fa"
import type { ItemDto } from "../../models/item/ItemDto"
import type { ItemApiProps } from "../../types/props/admin_add_item_props/ItemProps"
import Pagination from "../../components/pagination/Pagination"
import DiscountCard from "../../components/forms/DiscountCard"
import { validateDiscount } from "../../api_services/validators/discountComponent/DiscountValidator"
import type { DiscountValidationErrors } from "../../types/validation/discount/DiscountValidationErrors"
import toast from "react-hot-toast"
import ConfirmModal from "../../components/modals/ConfirmModal"

export default function AdminItems({ itemApi }: ItemApiProps) {

    const { token } = useAuth()
    const navigate = useNavigate()

    const [items, setItems] = useState<ItemDto[]>([])
    const [currentPage, setCurrentPage] = useState(1)

    const itemsPerPage = 10

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage

    const [selectedItem, setSelectedItem] = useState<ItemDto | null>(null)
    const [showDiscountModal, setShowDiscountModal] = useState(false)

    const [discountPercent, setDiscountPercent] = useState<number | null>(null)
    const [discountFrom, setDiscountFrom] = useState("")
    const [discountTo, setDiscountTo] = useState("")

    const [errors, setErrors] = useState<DiscountValidationErrors>({})

    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [itemToDelete, setItemToDelete] = useState<number | null>(null)

    const [search, setSearch] = useState("")
    const [typeFilter, setTypeFilter] = useState<"sve" | "knjiga" | "aksesoar">("sve")

    const filteredItems = items.filter(item => {

        const matchesSearch =
            item.name.toLowerCase().includes(search.toLowerCase())

        const matchesType =
            typeFilter === "sve" || item.type === typeFilter

        return matchesSearch && matchesType
    })

    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem)
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage)

    useEffect(() => {
        loadItems()
    }, [])

    async function loadItems() {
        try {
            const data = await itemApi.getAllItems()
            setItems(data)
        } catch {
            toast.error("Greška pri učitavanju artikala")
        }
    }

    function openDeleteModal(itemId: number) {
        setItemToDelete(itemId)
        setShowDeleteModal(true)
    }

    async function handleDelete() {

        if (!token || !itemToDelete) return

        try {

            const success = await itemApi.deleteItem(token, itemToDelete)

            if (success) {
                setItems(prev => prev.filter(i => i.itemId !== itemToDelete))
                toast.success("Artikal je uspešno obrisan")
            } else {
                toast.error("Greška pri brisanju artikla")
            }

        } catch {
            toast.error("Greška pri brisanju artikla")
        }

        setShowDeleteModal(false)
    }

    function openDiscountModal(item: ItemDto) {

        setSelectedItem(item)

        setDiscountPercent(item.discountPercent ?? null)
        setDiscountFrom(item.discountFrom ?? "")
        setDiscountTo(item.discountTo ?? "")

        setErrors({})

        setShowDiscountModal(true)
    }

    async function saveDiscount() {

        if (!token || !selectedItem) return

        const discountErrors = validateDiscount(
            discountPercent,
            discountFrom,
            discountTo
        )

        if (Object.keys(discountErrors).length > 0) {
            setErrors(discountErrors)
            return
        }

        setErrors({})

        try {

            const success = await itemApi.addDiscount(
                token,
                selectedItem.itemId!,
                discountPercent!,
                discountFrom,
                discountTo
            )

            if (!success) {
                toast.error("Greška pri dodavanju popusta")
                return
            }

            const updatedItem: ItemDto = {
                ...selectedItem,
                discountPercent,
                discountFrom,
                discountTo
            }

            setItems(prev =>
                prev.map(i =>
                    i.itemId === selectedItem.itemId ? updatedItem : i
                )
            )
            toast.success("Popust je uspešno dodat")
            setShowDiscountModal(false)

        } catch {
            toast.error("Greška pri dodavanju popusta")
        }
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold">
                Artikli
            </h1>
            <div className="bg-[#142326] border border-[#1F3337] rounded-2xl p-6 shadow-lg space-y-4">

                {/* TOP CONTROLS */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                    <div className="flex items-center gap-4">

                        {/* SEARCH */}
                        <input
                            type="text"
                            placeholder="Pretraži artikle..."
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value)
                                setCurrentPage(1)
                            }}
                            className="bg-[#142326] border border-[#1F3337] text-[#EAF4EF]
                            pl-4 pr-3 py-2 rounded-lg w-56
                            focus:outline-none focus:border-[#3F8A4B]"
                        />

                        {/* FILTER */}
                        <select
                            value={typeFilter}
                            onChange={(e) => {
                                setTypeFilter(e.target.value as "sve" | "knjiga" | "aksesoar")
                                setCurrentPage(1)
                            }}
                            className="bg-[#142326] border border-[#1F3337] text-[#EAF4EF]
                            px-3 py-2 rounded-lg
                            focus:outline-none focus:border-[#3F8A4B]"
                        >
                            <option value="sve">Svi artikli</option>
                            <option value="knjiga">Knjige</option>
                            <option value="aksesoar">Aksesoari</option>
                        </select>

                    </div>

                    <Link
                        to="/admin/items/add"
                        className="bg-[#3F8A4B] hover:bg-[#34733f] text-white px-4 py-2 rounded-lg transition"
                    >
                        + Dodaj artikal
                    </Link>

                </div>

                {/* RESULT COUNT */}
                <p className="text-sm text-[#9DB7AA]">
                    Pronađeno: {filteredItems.length}
                </p>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-center">
                        <thead className="bg-[#1B2E33] text-[#9DB7AA] uppercase text-xs">
                            <tr>
                                <th className="px-6 py-4">Naziv</th>
                                <th className="px-6 py-4">Tip</th>
                                <th className="px-6 py-4">Originalna cena</th>
                                <th className="px-6 py-4">Popust</th>
                                <th className="px-6 py-4">Cena sa popustom</th>
                                <th className="px-6 py-4"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map(item => {
                                const price = Number(item.price ?? 0)
                                const discountedPrice =
                                    item.discountPercent
                                        ? price - (price * item.discountPercent) / 100
                                        : price
                                return (
                                    <tr
                                        key={item.itemId}
                                        className="border-t border-[#1F3337] hover:bg-[#1B2E33] transition"
                                    >

                                        <td className="px-6 py-4 font-medium">
                                            {item.name}
                                        </td>

                                        <td className="px-6 py-4">
                                            {item.type}
                                        </td>

                                        <td className="px-6 py-4">

                                            {item.discountPercent ? (
                                                <span className="line-through text-gray-400">
                                                    {item.price} RSD
                                                </span>
                                            ) : (
                                                <span>{item.price} RSD</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-orange-400 font-semibold">
                                            {item.discountPercent
                                                ? `${item.discountPercent}%`
                                                : "-"}
                                        </td>
                                        <td className="px-6 py-4 text-[#3F8A4B] font-semibold">
                                            {discountedPrice.toFixed(2)} RSD
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex justify-center gap-3">

                                                <button
                                                    onClick={() => navigate(`/admin/items/edit/${item.itemId}`)}
                                                    title="Izmeni artikal"
                                                    className="p-2 rounded-md text-gray-400 hover:bg-[#1F3337]"
                                                >
                                                    <FaEdit size={16} />
                                                </button>

                                                <button
                                                    onClick={() => openDeleteModal(item.itemId!)}
                                                    title="Obriši artikal"
                                                    className="p-2 rounded-md text-gray-400 hover:bg-[#1F3337] hover:text-red-400"
                                                >
                                                    <FaTrash size={16} />
                                                </button>

                                                <button
                                                    onClick={() => openDiscountModal(item)}
                                                    title="Dodaj popust"
                                                    className="p-2 rounded-md text-gray-400 hover:bg-[#1F3337] hover:text-yellow-400"
                                                >
                                                    <FaPercent size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                            {currentItems.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="py-10 text-gray-400 text-center">
                                        Nema pronađenih artikala
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </div>
            </div>

            {showDiscountModal && selectedItem && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-[#142326] border border-[#1F3337] rounded-2xl p-6 w-[400px]">

                        <h2 className="text-xl font-semibold mb-4">
                            Popust za: {selectedItem.name}
                        </h2>

                        <DiscountCard
                            discountPercent={discountPercent}
                            setDiscountPercent={setDiscountPercent}
                            discountFrom={discountFrom}
                            setDiscountFrom={setDiscountFrom}
                            discountTo={discountTo}
                            setDiscountTo={setDiscountTo}
                            errors={errors}
                        />

                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                onClick={() => {
                                    setShowDiscountModal(false)
                                    setErrors({})
                                }}
                                className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-500"
                            >
                                Otkaži
                            </button>

                            <button
                                onClick={saveDiscount}
                                className="px-4 py-2 rounded-lg bg-[#3F8A4B] hover:bg-[#34733f]"
                            >
                                Sačuvaj
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <ConfirmModal
                isOpen={showDeleteModal}
                title="Potvrda brisanja"
                message="Da li ste sigurni da želite da obrišete ovaj artikal?"
                onConfirm={handleDelete}
                onCancel={() => setShowDeleteModal(false)}
            />
        </div>
    )
}