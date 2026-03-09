import { useEffect, useState } from "react"
import ImageUploader from "./ImageUploader"
import { useAuth } from "../../hooks/auth/useAuthHook"
import type { GenreDto } from "../../models/genre/GenreDto"
import type { AdminApiProps } from "../../types/props/admin_add_item_props/AdminAddItemProps"
import PdfUploader from "../bookForm/PdfUploader"
import BookDetailsCard from "../bookForm/BookDetailsCard"
import DiscountCard from "./DiscountCard"
import { validateBookCreateData } from "../../api_services/validators/bookForm/BookCreateValidator"
import { mapToBookDto } from "../../helpers/bookMapper"
import type { BookValidationErrors } from "../../types/validation/book/BookValidationErrors"

export default function BookForm({ genreApi, itemApi, itemImageApi }: AdminApiProps) {
  const { token } = useAuth()
  const [itemId, setItemId] = useState<number | null>(null) //null knjiga nije napravljena, number knjiga postoji
  const [name, setName] = useState("")
  const [price, setPrice] = useState<number | null>(null)
  const [author, setAuthor] = useState("")
  const [isbn, setIsbn] = useState("")
  const [nmbrOfPages, setNmbrOfPages] = useState<number | null>(null)
  const [description, setDescription] = useState("")
  const [goodreadsLink, setGoodreadsLink] = useState("")
  const [publicationYear, setPublicationYear] = useState<number | null>(null)
  const [genreIds, setGenreIds] = useState<number[]>([])
  const [cover, setCover] = useState<"meke" | "tvrde">("meke")
  const [pdf, setPdf] = useState<File | null>(null)
  const [discountPercent, setDiscountPercent] = useState<number | null>(null)
  const [discountFrom, setDiscountFrom] = useState<string>("")
  const [discountTo, setDiscountTo] = useState<string>("")

  const [genres, setGenres] = useState<GenreDto[]>([]);

  const [images, setImages] = useState<File[]>([])
  const [primary, setPrimary] = useState<number>(0)

  const [errors, setErrors] = useState<BookValidationErrors>({})

  async function handleSubmit(e: React.FormEvent) {

    e.preventDefault() //sluzi da spreci podrazumevano ponasanje browsera

    const validation = validateBookCreateData(
      name,
      author,
      isbn,
      price,
      nmbrOfPages,
      description,
      publicationYear,
      genreIds,
      goodreadsLink,
      discountPercent,
      discountFrom,
      discountTo
    )

    if (!validation.success) {
      setErrors(validation.errors)
      return
    }

    setErrors({})

    if (!token) return

    try {
      //price : price!
      //! znači: "Siguran sam da nije null jer sam proverio u validatoru."
      const book = mapToBookDto({
        name,
        price,
        description,
        author,
        isbn,
        nmbrOfPages,
        goodreadsLink,
        publicationYear,
        cover,
        pdf,
        genreIds,
        discountPercent,
        discountFrom,
        discountTo
      })

      const id = await itemApi.addBook(token, book)

      if (!id) {
        alert("Greška pri dodavanju knjige")
        return
      }
      setItemId(id)
      alert("Knjiga uspešno kreirana! Sada možeš dodati slike.")
    } catch (err) {
      console.error(err)
      alert("Greška pri dodavanju knjige")
    }
  }

  async function handleImageUpload() {

    if (!token || !itemId) return

    try {

      for (let i = 0; i < images.length; i++) {

        const imageUrl = URL.createObjectURL(images[i])

        await itemImageApi.addImage(
          token,
          itemId,
          {
            imageUrl,
            isPrimary: i === primary,
            sortOrder: i
          }
        )

      }

      alert("Slike uspešno dodate!")

      setImages([])
      setPrimary(0)

    } catch (err) {
      console.error(err)
      alert("Greška pri uploadu slika")
    }

  }

  useEffect(() => {
    async function loadGenres() {
      const data = await genreApi.getAll()
      setGenres(data)
    }
    loadGenres()
  }, [])

  function toggleGenre(id: number) {
    setGenreIds(prev => {

      if (prev.includes(id)) {
        return prev.filter(g => g !== id)
      }

      return [...prev, id]

    })

  }

  return (
    <div className="grid lg:grid-cols-3 gap-10">

      <BookDetailsCard
        name={name}
        setName={setName}
        author={author}
        setAuthor={setAuthor}
        isbn={isbn}
        setIsbn={setIsbn}
        price={price}
        setPrice={setPrice}
        nmbrOfPages={nmbrOfPages}
        setNmbrOfPages={setNmbrOfPages}
        description={description}
        setDescription={setDescription}
        goodreadsLink={goodreadsLink}
        setGoodreadsLink={setGoodreadsLink}
        publicationYear={publicationYear}
        setPublicationYear={setPublicationYear}
        cover={cover}
        setCover={setCover}
        genres={genres}
        genreIds={genreIds}
        toggleGenre={toggleGenre}
        errors={errors}
      />

      <div className="flex flex-col gap-8 h-full">

        <div className="card relative min-h-[320px]">

          <h2 className="text-xl font-semibold mb-4">
            Slike
          </h2>

          {!itemId && (
            <div className="absolute inset-0 bg-[#0F1A1C]/80 backdrop-blur-sm flex flex-col items-center justify-center rounded-2xl z-10 text-center p-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 text-[#9DB7AA]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 11c1.1 0 2 .9 2 2v2a2 2 0 11-4 0v-2c0-1.1.9-2 2-2zm6-3V7a6 6 0 10-12 0v1H4v12h16V8h-2z"
                />
              </svg>
              <p className="text-sm text-[#9DB7AA] max-w-[220px]">
                Prvo kreiraj knjigu da bi mogao dodati slike.
              </p>
            </div>
          )}

          <div className={!itemId ? "opacity-40 pointer-events-none" : ""}>

            <ImageUploader
              onChange={(files, primaryIndex) => {
                setImages(files)
                setPrimary(primaryIndex ?? 0)
              }}
            />

            {itemId && (
              <button
                className="btn-primary w-full mt-4"
                onClick={handleImageUpload}
              >
                Sačuvaj slike
              </button>
            )}

          </div>

        </div>

        <PdfUploader onChange={(file) => setPdf(file)} />


        <DiscountCard
          discountPercent={discountPercent}
          setDiscountPercent={setDiscountPercent}
          discountFrom={discountFrom}
          setDiscountFrom={setDiscountFrom}
          discountTo={discountTo}
          setDiscountTo={setDiscountTo}
          errors={errors}
        />

        <button
          className="btn-primary"
          onClick={handleSubmit}
        >
          Kreiraj knjigu
        </button>

      </div>

    </div>
  )
}