import IRating from "./Rating";

export default interface IProduct {
    id: string,
    title: string,
    description: string,
    price: number,
    discountPercentage: number,
    rating: IRating,
    stock: number,
    brand: string,
    category: string,
    thumbnail: string,
    images: string[],

}
