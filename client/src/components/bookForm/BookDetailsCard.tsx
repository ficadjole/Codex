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
    toggleGenre,
    errors
}: BookDetailsCardProps) {

    return (

        <div className="lg:col-span-2 card space-y-6">

            <h2 className="text-2xl font-semibold">
                Informacije o knjizi
            </h2>

            <div className="space-y-1">
                <label className="text-sm">
                    Naziv knjige <span className="text-red-500">*</span>
                </label>
                <input
                    className={`input ${errors.name ? "border-red-500" : ""}`}
                    value={name}
                    onChange={e => setName(e.target.value)}
                />

                {errors.name && (
                    <p className="text-red-500 text-xs">
                        {errors.name}
                    </p>
                )}
            </div>

            <div className="space-y-1">
                <label className="text-sm">
                    Autor <span className="text-red-500">*</span>
                </label>
                <input
                    className="input"
                    value={author}
                    onChange={e => setAuthor(e.target.value)}
                />

                {errors.author && (
                    <p className="text-red-500 text-xs">
                        {errors.author}
                    </p>
                )}
            </div>

            <div className="space-y-1">
                <label className="text-sm">
                    ISBN broj <span className="text-red-500">*</span>
                </label>
                <input
                    className="input"
                    value={isbn}
                    onChange={e => setIsbn(e.target.value)}
                />
                {errors.isbn && (
                    <p className="text-red-500 text-xs">
                        {errors.isbn}
                    </p>
                )}
            </div>

            <div className="grid grid-cols-2 gap-4">

                <div className="space-y-1">
                    <label className="text-sm">
                        Cena (RSD)<span className="text-red-500">*</span>
                    </label>
                    <input
                        type="number"
                        className="input"
                        value={price || ""}
                        onChange={e => setPrice(e.target.value ? Number(e.target.value) : null)}
                    />
                    {errors.price && (
                        <p className="text-red-500 text-xs">
                            {errors.price}
                        </p>
                    )}
                </div>

                <div className="space-y-1">
                    <label className="text-sm">
                        Broj strana <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="number"
                        className="input"
                        value={nmbrOfPages || ""}
                        onChange={e =>
                            setNmbrOfPages(e.target.value ? Number(e.target.value) : null)
                        } />
                    {errors.pages && (
                        <p className="text-red-500 text-xs">
                            {errors.pages}
                        </p>
                    )}
                </div>

            </div>

            <div className="space-y-1">
                <label className="text-sm">
                    Opis knjige <span className="text-red-500">*</span>
                </label>
                <textarea
                    rows={4}
                    className="input"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
                {errors.description && (
                    <p className="text-red-500 text-xs">
                        {errors.description}
                    </p>
                )}
            </div>

            <div className="space-y-1">
                <label className="text-sm">
                    Goodreads link 
                </label>
                <input
                    className="input"
                    value={goodreadsLink}
                    onChange={e => setGoodreadsLink(e.target.value)}
                />
                <button
                    type="button"
                    className="text-sm text-blue-400 underline"
                    onClick={() => window.open(goodreadsLink, "_blank")}
                >
                    Proveri link
                </button>
                {errors.goodreadsLink && (
                    <p className="text-red-500 text-xs">
                        {errors.goodreadsLink}
                    </p>
                )}
            </div>

            <div className="space-y-1">
                <label className="text-sm">
                    Godina izdanja <span className="text-red-500">*</span>
                </label>
                <input
                    type="number"
                    className="input"
                    value={publicationYear || ""}
                    onChange={e =>
                        setPublicationYear(e.target.value ? Number(e.target.value) : null)
                    } />
                {errors.publicationYear && (
                    <p className="text-red-500 text-xs">
                        {errors.publicationYear}
                    </p>
                )}
            </div>

            <div className="space-y-2">

                <p className="text-sm">
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

                <p className="text-sm">
                    Žanrovi <span className="text-red-500">*</span>
                </p>

                <div className="space-y-1">

                    <div className="grid grid-cols-3 gap-2">

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

                                <span className="text-sm">{g.name}</span>

                            </label>

                        ))}

                    </div>

                </div>
                {errors.genreIds && (
                    <p className="text-red-500 text-xs">
                        {errors.genreIds}
                    </p>
                )}
            </div>

        </div>
    )
}