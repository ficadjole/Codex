import { useState } from "react"
import type { ImageUploaderProps } from "../../types/props/admin_add_item_props/ImageUploaderProps"

export default function ImageUploader({ onChange }: ImageUploaderProps) {

  const [images, setImages] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])
  const [primary, setPrimary] = useState<number | null>(null)

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
      newPrimary = 0
      setPrimary(0)
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

    let newPrimary = primary

    if (primary === index) {
      newPrimary = newImages.length > 0 ? 0 : null
    }

    setPrimary(newPrimary)
    onChange(newImages, newPrimary)
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

        {previews.map((src, index) => {

          const isPrimary = primary === index

          return (

            <div
              key={index}
              className={`relative border rounded-xl overflow-hidden
              ${isPrimary ? "border-green-500" : "border-[#1F3337]"}`}
            >

              <img
                src={src}
                className="w-full h-24 object-cover cursor-pointer"
                onClick={() => selectPrimary(index)}
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