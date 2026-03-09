import type { AccessoryValidationErrors } from "../../validation/accessory/AccessoryValidationErrors";

export type AccessoryDetailsCardProps = {
    name: string
    setName: (v: string) => void

    price: number | null
    setPrice: React.Dispatch<React.SetStateAction<number | null>>

    description: string
    setDescription: (v: string) => void

    content: string
    setContent: (v: string) => void

    errors : AccessoryValidationErrors
};