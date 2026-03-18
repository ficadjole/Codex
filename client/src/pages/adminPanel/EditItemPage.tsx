import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import BookForm from "../../components/forms/BookForm"
import type { ItemApiProps } from "../../types/props/admin_add_item_props/ItemProps"
import type { BookDetailsDto } from "../../models/item/details/BookDetailsDto"
import AccessoryForm from "../../components/forms/AccessoryForm"
import type { AccessoryDetailsDto } from "../../models/item/details/AccessoryDetailsDto"

export default function EditItemPage({ itemApi, genreApi, itemImageApi }: ItemApiProps) {

  const { id } = useParams()

  const [book, setBook] = useState<BookDetailsDto | null>(null)
  const [accessory, setAccessory] = useState<AccessoryDetailsDto | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadItem()
  }, [id])

  async function loadItem() {

    if (!id) return

    try {

      const item = await itemApi.getItemById(Number(id))

      if (item.type === "knjiga") {
        const bookData = await itemApi.getBook(Number(id))

        setBook({
          ...bookData,
          price: item.price,
          discountPercent: item.discountPercent,
          discountFrom: item.discountFrom,
          discountTo: item.discountTo
        })
      }

      if (item.type === "aksesoar") {

        const accessoryData = await itemApi.getAccessory(Number(id))

        setAccessory({
          ...accessoryData,
          price: item.price,
          discountPercent: item.discountPercent,
          discountFrom: item.discountFrom,
          discountTo: item.discountTo
        })

      }

    } catch (err) {
      console.error(err)
    }

    setLoading(false)
  }

  if (loading) return <div>Loading...</div>

  if (!book && !accessory) return <div>Artikal nije pronađen</div>

  if (book) {
    return (
      <BookForm
        itemApi={itemApi}
        genreApi={genreApi}
        itemImageApi={itemImageApi}
        initialData={book}
        isEdit={true}
      />
    )
  }

  if (accessory) {
    return (
      <AccessoryForm
        itemApi={itemApi}
        itemImageApi={itemImageApi}
        initialData={accessory}
        isEdit={true}
      />
    )
  }

  return null
}