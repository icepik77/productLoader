import IProduct from "./product.type";

export default interface IProductView {
    products: IProduct[]
    deleteProduct?: (id: string) => void,
    loadFunc: (page: number) => void
}