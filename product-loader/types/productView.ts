import IProduct from "./product";

export default interface IProductView {
    products: IProduct[],
    addProduct?: () => void,
    deleteProduct?: (index: number) => void
}