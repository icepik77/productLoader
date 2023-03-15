import IRating from "./rating.type";

export default interface IProduct {
    id: string,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string,
    rating: IRating
}