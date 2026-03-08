import { useState } from "react"
import { useAuth } from "../../hooks/auth/useAuthHook"
import type { AccessoryCreateDto } from "../../models/item/AccessoryCreateDto"
import ImageUploader from "./ImageUploader"
import DiscountCard from "./DiscountCard"
import AccessoryDetailsCard from "../accessoryForm/AccessoryDetailsCard"
import type { AccessoryFormProps } from "../../types/props/admin_add_item_props/AccessoryFormProps"

export default function AccessoryForm({ itemApi, itemImageApi }: AccessoryFormProps) {

  const { token } = useAuth()

  const [itemId, setItemId] = useState<number | null>(null)
  const [name, setName] = useState("")
  const [price, setPrice] = useState(0)
  const [description, setDescription] = useState("")
  const [content, setContent] = useState("")
  const [discountPercent, setDiscountPercent] = useState<number | null>(null)
  const [discountFrom, setDiscountFrom] = useState("")
  const [discountTo, setDiscountTo] = useState("")

  const [images, setImages] = useState<File[]>([])
  const [primary, setPrimary] = useState<number>(0)

  async function handleSubmit() {

    if (!token) return

    const accessory: AccessoryCreateDto = {
      name,
      price,
      description,
      content,
      discountPercent: discountPercent ?? null,
      discountFrom: discountFrom ?? null,
      discountTo: discountTo ?? null
    }

    const id = await itemApi.addAccessory(token, accessory)

    if (!id) {
      alert("Greška pri kreiranju aksesoara")
      return
    }

    setItemId(id)

    alert("Aksesoar uspešno kreiran. Sada dodaj slike.")
  }

  async function handleImageUpload() {

    if (!token || !itemId) return

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

    alert("Slike uspešno dodate")
    setImages([])
  }

  return (

    <div className="grid lg:grid-cols-3 gap-10">

      <AccessoryDetailsCard
        name={name}
        setName={setName}
        price={price}
        setPrice={setPrice}
        description={description}
        setDescription={setDescription}
        content={content}
        setContent={setContent}
      />

      <div className="space-y-8">

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
                Prvo kreiraj aksesoar da bi mogao dodati slike.
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

        <DiscountCard
          discountPercent={discountPercent}
          setDiscountPercent={setDiscountPercent}
          discountFrom={discountFrom}
          setDiscountFrom={setDiscountFrom}
          discountTo={discountTo}
          setDiscountTo={setDiscountTo}
        />

        <button
          className="btn-primary w-full"
          onClick={handleSubmit}
        >
          Kreiraj aksesoar
        </button>
      </div>

    </div>

  )
}