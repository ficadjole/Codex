import { useState } from "react"
import ImageUploader from "../bookForm/ImageUploader"

export default function AccessoryForm(){

  const [images,setImages] = useState<File[]>([])
  const [primary,setPrimary] = useState<number|null>(null)

  function handleImages(files:File[],primaryIndex:number|null){

    setImages(files)
    setPrimary(primaryIndex)

  }

  return(

    <div className="grid lg:grid-cols-3 gap-10">

      <div className="lg:col-span-2 card space-y-6">

        <h2 className="text-2xl font-semibold">
          Informacije o dodatku
        </h2>

        <input
          placeholder="Naziv proizvoda"
          className="input"
        />

        <input
          type="number"
          placeholder="Cena (RSD)"
          className="input"
        />

        <textarea
          placeholder="Opis proizvoda"
          rows={4}
          className="input"
        />

        <textarea
          placeholder="Sadržaj pakovanja"
          rows={3}
          className="input"
        />

      </div>

      <div className="space-y-8">

        <div className="card">

          <h2 className="text-xl font-semibold mb-6">
            Slike
          </h2>

          <ImageUploader onChange={handleImages}/>

        </div>

        <div className="card space-y-4">

          <h2 className="text-xl font-semibold">
            Popust
          </h2>

          <input
            type="number"
            placeholder="Procenat popusta"
            className="input"
          />

          <label className="text-sm text-[#9DB7AA]">
            Početak popusta
          </label>

          <input type="date" className="input"/>

          <label className="text-sm text-[#9DB7AA]">
            Kraj popusta
          </label>

          <input type="date" className="input"/>

          <button className="btn-primary">
            Kreiraj proizvod
          </button>

        </div>a

      </div>

    </div>

  )
}