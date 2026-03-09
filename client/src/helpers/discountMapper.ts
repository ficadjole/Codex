export function mapDiscount(percent: number | null, from: string, to: string) {
    return {
        discountPercent: percent ?? null,
        discountFrom: from || null,
        discountTo: to || null
    }
}