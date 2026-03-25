import { useEffect, useState } from "react"
import type { ItemImageDto } from "../../models/item/details/ItemImageDto"

type Props = {
  initialImages?: ItemImageDto[]
  onChange: (files: File[], primaryIndex: number | null) => void
  onDeleteExisting?: (imageId: number) => void
}

export default function ImageUploader({
  onChange,
  initialImages = [],
  onDeleteExisting
}: Props) {

  const [images, setImages] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])
  const [primary, setPrimary] = useState<number | null>(null)

  // set initial primary
  useEffect(() => {
    const index = initialImages.findIndex(img => img.isPrimary)
    if (index !== -1) setPrimary(index)
  }, [initialImages])

  function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return

    const files = Array.from(e.target.files)

    const newImages = [...images, ...files]
    const newPreviews = [
      ...previews,
      ...files.map(file => URL.createObjectURL(file))
    ]

    setImages(newImages)
    setPreviews(newPreviews)

    let newPrimary = primary

    if (primary === null && newImages.length > 0) {
      newPrimary = initialImages.length // prvi novi
      setPrimary(newPrimary)
    }

    onChange(newImages, newPrimary)
  }

  function selectPrimary(index: number) {
    setPrimary(index)
    onChange(images, index)
  }

  function removeImage(index: number) {
    URL.revokeObjectURL(previews[index])

    const newImages = images.filter((_, i) => i !== index)
    const newPreviews = previews.filter((_, i) => i !== index)

    setImages(newImages)
    setPreviews(newPreviews)

    setPrimary(null)
    onChange(newImages, null)
  }

  return (
    <div className="space-y-4">

      <p className="text-sm text-[#9DB7AA]">
        Klikni na sliku da je postaviš kao glavnu (primary).
      </p>

      <label className="btn-secondary cursor-pointer text-center block">
        Dodaj slike
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFiles}
          className="hidden"
        />
      </label>

      <div className="grid grid-cols-3 gap-4">

        {/* POSTOJEĆE */}
        {initialImages.map((img, index) => {
          const isPrimary = primary === index

          return (
            <div
              key={img.imageId}
              className={`relative border rounded-xl overflow-hidden
              ${isPrimary ? "border-green-500" : "border-[#1F3337]"}`}
            >
              <img
                src={img.imageUrl}
                className="w-full h-24 object-cover cursor-pointer"
                onClick={() => selectPrimary(index)}
              />

              <button
                type="button"
                onClick={() => onDeleteExisting?.(img.imageId)}
                className="absolute top-1 right-1 bg-black/70 text-white w-5 h-5 rounded-full text-xs"
              >
                ✕
              </button>

              {isPrimary && (
                <div className="text-xs text-center bg-green-600 pb-1">
                  Primary slika
                </div>
              )}
            </div>
          )
        })}

        {/* NOVE */}
        {previews.map((src, index) => {
          const realIndex = initialImages.length + index
          const isPrimary = primary === realIndex

          return (
            <div
              key={index}
              className={`relative border rounded-xl overflow-hidden
              ${isPrimary ? "border-green-500" : "border-[#1F3337]"}`}
            >
              <img
                src={src}
                className="w-full h-24 object-cover cursor-pointer"
                onClick={() => selectPrimary(realIndex)}
              />

              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 bg-black/70 text-white w-5 h-5 rounded-full text-xs"
              >
                ✕
              </button>

              {isPrimary && (
                <div className="text-xs text-center bg-green-600 pb-1">
                  Primary slika
                </div>
              )}
            </div>
          )
        })}

      </div>
    </div>
  )
}