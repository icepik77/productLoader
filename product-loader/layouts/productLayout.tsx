
import React, { useEffect, useState } from "react"
import myStyles from '@/styles/myStyles.module.scss'
import BasicSelect from "@/components/select"
import IProduct from "@/types/Product"
import IProductLayoutProps from "@/types/productLayout.type"
import { useTypedSelector } from "@/hooks/useTypeSelector"
import { useActions } from "@/hooks/useActions"



const ProductLayout: React.FC<IProductLayoutProps> = ({ title, children }) => {

    const { products } = useTypedSelector(state => state)
    const { setProducts } = useActions()

    // const [productsState, addProducts] = useState<IProduct[]>(products)


    const sortName = () => {
        const strName = products ? [...products].sort((a, b) =>
            a.title > b.title ? 1 : -1,
        ) : []
        setProducts(strName)
    }

    const sortAscending = () => {
        const numAscending = products ? [...products].sort((a, b) => (a.price && b.price) ? a.price - b.price : 0) : []
        setProducts(numAscending)
    }

    const sortDescending = () => {
        const numDescending = products ? [...products].sort((a, b) => (a.price && b.price) ? b.price - a.price : 0) : []
        setProducts(numDescending)
    }

    return (
        <>
            <div className={myStyles.wrapper}>
                <div className={myStyles.topBlock}>
                    <h1>{title}</h1>
                    <BasicSelect name={() => sortName()} ascending={() => sortAscending()} descending={() => sortDescending()} />
                </div>
                {children}
            </div>
        </>
    )
}
export default ProductLayout
