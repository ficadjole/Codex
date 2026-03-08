import { useState } from "react"
import type { PdfUploaderProps } from "../../types/props/admin_add_item_props/PdfUploaderProps"

export default function PdfUploader({ onChange }: PdfUploaderProps) {

    const [pdf, setPdf] = useState<File | null>(null)

    function handleFile(e: React.ChangeEvent<HTMLInputElement>) {

        if (!e.target.files) return

        const file = e.target.files[0]

        if (!file) return

        setPdf(file)
        onChange(file)
    }

    function removePdf() {
        setPdf(null)
        onChange(null)
    }

    return (

        <div className="card space-y-4">

            <h2 className="text-xl font-semibold">
                PDF odlomak knjige
            </h2>

            {!pdf && (
                <label className="btn-primary cursor-pointer text-center block">
                    Dodaj PDF
                    <input
                        type="file"
                        accept="application/pdf"
                        onChange={handleFile}
                        className="hidden"
                    />
                </label>
            )}
            {pdf && (
                <div className="relative border border-[#1F3337] rounded-xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">

                        <span className="text-xl">
                            📄
                        </span>

                        <span className="text-sm">
                            {pdf.name}
                        </span>

                    </div>
                    <button
                        type="button"
                        onClick={removePdf}
                        className="bg-black/70 text-white w-6 h-6 rounded-full text-xs"
                    >
                        ✕
                    </button>
                </div>
            )}

        </div>

    )
}