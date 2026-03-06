import { useEffect, useState } from "react"
import type { GenreDto } from "../../models/genre/GenreDto"
import { useAuth } from "../../hooks/auth/useAuthHook"
import type { GenreApiProps } from "../../types/props/genre_props/GenreApiProps"
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa"

export default function GenreAdminPanel({ genreApi }: GenreApiProps) {

    const { token } = useAuth()

    const [genres, setGenres] = useState<GenreDto[]>([])
    const [newGenre, setNewGenre] = useState("")
    const [editingId, setEditingId] = useState<number | null>(null)
    const [editingName, setEditingName] = useState("")

    async function loadGenres() {
        const data = await genreApi.getAll()
        setGenres(data)
    }

    useEffect(() => {
        loadGenres()
    }, [])

    async function handleAdd() {
        if (!token || newGenre.trim() === "") return

        const success = await genreApi.addGenre(token, newGenre)

        if (success) {
            setNewGenre("")
            loadGenres()
        } else {
            alert("Greška pri dodavanju žanra")
        }
    }

    async function handleDelete(id: number) {
        if (!token) return

        const success = await genreApi.deleteGenre(token, id)

        if (success) {
            setGenres(prev => prev.filter(g => g.genreId !== id))
        } else {
            alert("Greška pri brisanju")
        }
    }

    function handleEditStart(id: number, name: string) {
        setEditingId(id)
        setEditingName(name)
    }

    async function handleEditSave(id: number) {

        if (!token) return

        const success = await genreApi.updateGenre(token, id, editingName)

        if (success) {

            setGenres(prev =>
                prev.map(g =>
                    g.genreId === id ? { ...g, name: editingName } : g
                )
            )

            setEditingId(null)
            setEditingName("")

        } else {

            alert("Greška pri izmjeni")

        }
    }

    function handleEditCancel() {
        setEditingId(null)
        setEditingName("")
    }

    return (

        <div className="space-y-6">

            <h1 className="text-2xl font-semibold">
                Upravljanje žanrovima
            </h1>

            <div className="bg-[#142326] border border-[#1F3337] rounded-2xl p-6 shadow-lg space-y-6">

                <div className="flex gap-4">

                    <input
                        className="input"
                        placeholder="Novi žanr"
                        value={newGenre}
                        onChange={e => setNewGenre(e.target.value)}
                    />

                    <button
                        className="btn-primary"
                        onClick={handleAdd}
                    >
                        Dodaj
                    </button>

                </div>

                <div className="space-y-2">

                    {genres.map(g => (

                        <div
                            key={g.genreId}
                            className="flex justify-between items-center gap-4 border border-[#1F3337] p-3 rounded hover:border-[#3F8A4B] transition"
                        >

                            {editingId === g.genreId ? (

                                <input
                                    className="input w-56"
                                    value={editingName}
                                    onChange={e => setEditingName(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleEditSave(g.genreId)}
                                    autoFocus
                                />

                            ) : (

                                <span className="font-medium">
                                    {g.name}
                                </span>

                            )}

                            <div className="flex items-center gap-2">

                                {editingId === g.genreId ? (

                                    <>
                                        <button
                                            onClick={() => handleEditSave(g.genreId)}
                                            className="p-2 rounded-md text-emerald-400 hover:bg-[#1F3337]"
                                        >
                                            <FaCheck size={18} />
                                        </button>

                                        <button
                                            onClick={handleEditCancel}
                                            className="p-2 rounded-md text-gray-400 hover:bg-[#1F3337]"
                                        >
                                            <FaTimes size={18} />
                                        </button>
                                    </>

                                ) : (

                                    <>
                                        <button
                                            onClick={() => handleEditStart(g.genreId, g.name)}
                                            className="p-2 rounded-md text-gray-400 hover:bg-[#1F3337]"
                                        >
                                            <FaEdit size={18} />
                                        </button>

                                        <button
                                            onClick={() => handleDelete(g.genreId)}
                                            className="p-2 rounded-md text-gray-400 hover:bg-[#1F3337] hover:text-red-400"
                                        >
                                            <FaTrash size={16} />
                                        </button>
                                    </>

                                )}

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </div>

    )
}