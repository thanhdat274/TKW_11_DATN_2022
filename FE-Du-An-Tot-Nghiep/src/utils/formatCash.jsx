export const formatPrice = (price) => {
    return price?.toLocaleString("vi", {
        style: "currency",
        currency: "VND",
    })
} 