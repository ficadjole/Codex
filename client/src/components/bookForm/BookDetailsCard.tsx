import type { BookDetailsCardProps } from "../../types/props/admin_add_item_props/BookDetailsCardProps";

export default function BookDetailsCard({
    name,
    setName,
    author,
    setAuthor,
    isbn,
    setIsbn,
    price,
    setPrice,
    nmbrOfPages,
    setNmbrOfPages,
    description,
    setDescription,
    goodreadsLink,
    setGoodreadsLink,
    publicationYear,
    setPublicationYear,
    cover,
    setCover,
    genres,
    genreIds,
    toggleGenre
}: BookDetailsCardProps) {

    return (

        <div className="lg:col-span-2 card space-y-6">

            <h2 className="text-2xl font-semibold">
                Informacije o knjizi
            </h2>

            <input
                placeholder="Naziv knjige"
                className="input"
                value={name}
                onChange={e => setName(e.target.value)}
            />

            <input
                placeholder="Autor"
                className="input"
                value={author}
                onChange={e => setAuthor(e.target.value)}
            />

            <input
                placeholder="ISBN broj"
                className="input"
                value={isbn}
                onChange={e => setIsbn(e.target.value)}
            />

            <div className="grid grid-cols-2 gap-4">

                <input
                    type="number"
                    placeholder="Cena (RSD)"
                    className="input"
                    value={price || ""}
                    onChange={e => setPrice(Number(e.target.value))}
                />

                <input
                    type="number"
                    placeholder="Broj strana"
                    className="input"
                    value={nmbrOfPages || ""}
                    onChange={e => setNmbrOfPages(Number(e.target.value))}
                />

            </div>

            <textarea
                placeholder="Opis knjige"
                rows={4}
                className="input"
                value={description}
                onChange={e => setDescription(e.target.value)}
            />

            <input
                placeholder="Goodreads link"
                className="input"
                value={goodreadsLink}
                onChange={e => setGoodreadsLink(e.target.value)}
            />

            <input
                type="number"
                placeholder="Godina izdanja"
                className="input"
                value={publicationYear || ""}
                onChange={e => setPublicationYear(Number(e.target.value))}
            />

            <div className="space-y-2">

                <p className="font-medium">
                    Tip korica
                </p>

                <div className="relative">

                    <select
                        value={cover}
                        onChange={e => setCover(e.target.value as "meke" | "tvrde")}
                        className="input appearance-none pr-10 cursor-pointer"
                    >
                        <option value="meke">Meke korice</option>
                        <option value="tvrde">Tvrde korice</option>
                    </select>

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9DB7AA] pointer-events-none"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>

                </div>

            </div>

            <div className="space-y-3">

                <p className="font-medium">
                    Žanrovi
                </p>

                <div className="grid grid-cols-2 gap-2">

                    {genres.map(g => (

                        <label
                            key={g.genreId}
                            className="flex items-center gap-2 cursor-pointer"
                        >

                            <input
                                type="checkbox"
                                checked={genreIds.includes(g.genreId)}
                                onChange={() => toggleGenre(g.genreId)}
                            />

                            <span>{g.name}</span>

                        </label>

                    ))}

                </div>

            </div>

        </div>
    )
}