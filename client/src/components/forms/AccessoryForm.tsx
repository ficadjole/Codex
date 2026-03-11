import { useEffect, useState } from "react"
import { useAuth } from "../../hooks/auth/useAuthHook"
import ImageUploader from "./ImageUploader"
import DiscountCard from "./DiscountCard"
import AccessoryDetailsCard from "../accessoryForm/AccessoryDetailsCard"
import type { AccessoryFormProps } from "../../types/props/admin_add_item_props/AccessoryFormProps"
import { validateAccessoryCreateData } from "../../api_services/validators/accessoryForm/AccessoryCreateValidator"
import type { AccessoryValidationErrors } from "../../types/validation/accessory/AccessoryValidationErrors"
import { mapToAccessoryDto, mapToAccessoryUpdateDto } from "../../helpers/accessoryMapper"
import toast from "react-hot-toast"

export default function AccessoryForm({ itemApi, itemImageApi, initialData, isEdit = false }: AccessoryFormProps) {

  const { token } = useAuth()

  const [itemId, setItemId] = useState<number | null>(null)
  const [name, setName] = useState("")
  const [price, setPrice] = useState<number | null>(null)
  const [description, setDescription] = useState("")
  const [content, setContent] = useState("")
  const [discountPercent, setDiscountPercent] = useState<number | null>(null)
  const [discountFrom, setDiscountFrom] = useState("")
  const [discountTo, setDiscountTo] = useState("")
  const [loading, setLoading] = useState(false)

  const [images, setImages] = useState<File[]>([])
  const [primary, setPrimary] = useState<number>(0)

  const [errors, setErrors] = useState<AccessoryValidationErrors>({})

  async function handleSubmit() {

    const validation = validateAccessoryCreateData(
      name,
      price,
      description,
      content,
      discountPercent,
      discountFrom,
      discountTo
    );

    if (!validation.success) {
      setErrors(validation.errors)
      return
    }

    setErrors({})

    if (!token) {
      toast.error("Niste ulogovani")
      return
    }

    try {

      // EDIT
      if (isEdit && itemId) {

        const dto = mapToAccessoryUpdateDto({
          name,
          price,
          description,
          content,
          discountPercent,
          discountFrom,
          discountTo
        }, itemId)

        const success = await itemApi.updateItem(token, itemId, dto)

        if (!success) {
          toast.error("Greška pri izmeni aksesoara")
          return
        }

        if (discountPercent && discountFrom && discountTo) {

          await itemApi.addDiscount(
            token,
            itemId,
            discountPercent,
            discountFrom,
            discountTo
          )

        }

        toast.success("Aksesoar uspešno izmenjen")
        return
      }

      // CREATE
      const dto = mapToAccessoryDto({
        name,
        price,
        description,
        content,
        discountPercent,
        discountFrom,
        discountTo
      })

      const id = await itemApi.addAccessory(token, dto)

      if (!id) {
        toast.error("Greška pri kreiranju aksesoara")
        return
      }

      setItemId(id)
      toast.success("Aksesoar uspešno kreiran. Sada dodaj slike.")

    } catch {
      toast.error("Došlo je do greške")
    }
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

    toast.success("Slike uspešno dodate")
    setImages([])
  }

  useEffect(() => {

    if (!initialData) return

    setItemId(initialData.itemId!)
    setName(initialData.name)
    setPrice(initialData.price)
    setDescription(initialData.description)
    setContent(initialData.content)

    setDiscountPercent(initialData.discountPercent ?? null)
    setDiscountFrom(initialData.discountFrom?.split("T")[0] ?? "")
    setDiscountTo(initialData.discountTo?.split("T")[0] ?? "")

  }, [initialData])

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
        errors={errors}
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
          errors={errors}
        />

        <button
          className="btn-primary w-full"
          onClick={handleSubmit}
        >
          {isEdit ? "Sačuvaj izmene" : "Kreiraj aksesoar"}
        </button>
      </div>

    </div>

  )
}