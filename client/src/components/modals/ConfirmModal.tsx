import type { ConfirmModalProps } from "../../types/props/modal_props/ConfirmModalProps"

export default function ConfirmModal({
    isOpen,
    title,
    message,
    onConfirm,
    onCancel
}: ConfirmModalProps) {

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-[#142326] border border-[#1F3337] rounded-2xl p-6 w-[360px]">
                <h2 className="text-lg font-semibold mb-3">
                    {title}
                </h2>

                <p className="text-sm text-gray-300 mb-6">
                    {message}
                </p>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-500"
                    >
                        Otkaži
                    </button>

                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500"
                    >
                        Obriši
                    </button>
                </div>
            </div>
        </div>
    )
}