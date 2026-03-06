import { useState } from "react"
import ImageUploader from "./ImageUploader"
import { itemApi } from "../../api_services/itemApi/ItemApiService"
import { useAuth } from "../../hooks/auth/useAuthHook"
import axios from "axios"
import type { BookCreateDto } from "../../models/item/BookCreateDto"
import { itemImageApi } from "../../api_services/itemImageApi/ItemImageApiService"

export default function BookForm() {

  const { token } = useAuth()

  const [name, setName] = useState("")
  const [price, setPrice] = useState(0)
  const [author, setAuthor] = useState("")
  const [isbn, setIsbn] = useState("")
  const [pages, setPages] = useState(0)
  const [description, setDescription] = useState("")
  const [goodreadsLink, setGoodreadsLink] = useState("")
  const [publicationDate, setPublicationDate] = useState<number>(0)
  const [genreIds, setGenreIds] = useState<number[]>([])
  const [discountPercent, setDiscountPercent] = useState<number>(0)
  const [discountFrom, setDiscountFrom] = useState<string>("")
  const [discountTo, setDiscountTo] = useState<string>("")

  const [images, setImages] = useState<File[]>([])
  const [primary, setPrimary] = useState<number>(0)

  async function uploadImage(file: File) {

    const formData = new FormData()
    formData.append("file", file)

    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/uploadImage`,
      formData
    )

    return res.data.imageUrl
  }

  async function handleSubmit(e: React.FormEvent) {

    e.preventDefault()

    if (!token) return

    try {

      const book: BookCreateDto = {
        name,
        price,
        author,
        isbn,
        pages,
        description,
        goodreadsLink,
        publicationDate,
        genreIds,
        discountPercent,
        discountFrom,
        discountTo
      }

      // 1️⃣ napravi item
      const itemId = await itemApi.addItem(token, book)

      if (!itemId) {
        alert("Greška pri dodavanju knjige")
        return
      }

      // 2️⃣ upload slika
      for (let i = 0; i < images.length; i++) {

        const imageUrl = await uploadImage(images[i])

        await itemImageApi.addImage(
          token,
          itemId,
          imageUrl,
          i === primary,
          i
        )
      }

      alert("Knjiga uspešno dodata!")

      // reset forme
      setName("")
      setPrice(0)
      setAuthor("")
      setIsbn("")
      setPages(0)
      setDescription("")
      setGoodreadsLink("")
      setPublicationDate(0)
      setGenreIds([])
      setImages([])
      setPrimary(0)

    } catch (err) {

      console.error(err)
      alert("Greška pri dodavanju knjige")

    }
  }
  return (
    <div className="grid lg:grid-cols-3 gap-10">

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
            onChange={e => setPrice(Number(e.target.value))}
          />

          <input
            type="number"
            placeholder="Broj strana"
            className="input"
            onChange={e => setPages(Number(e.target.value))}
          />

        </div>

        <textarea
          placeholder="Opis knjige"
          rows={4}
          className="input"
          onChange={e => setDescription(e.target.value)}
        />

        <input
          placeholder="Goodreads link"
          className="input"
          onChange={e => setGoodreadsLink(e.target.value)}
        />

        <input
          type="number"
          placeholder="Godina izdanja (npr. 2026)"
          className="input"
          onChange={e => setPublicationDate(Number(e.target.value))}
        />

      </div>

      <div className="space-y-8">

        <div className="card">
          <h2 className="text-xl font-semibold mb-6">
            Slike
          </h2>

          <ImageUploader
            onChange={(files, primaryIndex) => {
              setImages(files)
              setPrimary(primaryIndex ?? 0)
            }}
          />
        </div>

        <div className="card space-y-4">

          <h2 className="text-xl font-semibold">
            Popust
          </h2>

          <input
            type="number"
            placeholder="Procenat popusta"
            className="input"
            onChange={e => setDiscountPercent(Number(e.target.value))}
          />

          <input
            type="date"
            className="input"
            onChange={e => setDiscountFrom(e.target.value)}
          />

          <input
            type="date"
            className="input"
            onChange={e => setDiscountTo(e.target.value)}
          />

          <button
            className="btn-primary"
            onClick={handleSubmit}
          >
            Kreiraj knjigu
          </button>

        </div>

      </div>

    </div>
  )
}