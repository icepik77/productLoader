
import myStyles from '@/styles/myStyles.module.scss'
import Button, { ButtonProps } from '@mui/material/Button'
import React, { useState, createRef, RefObject, Ref, useEffect } from 'react'
import IProduct from '@/types/product.type'
import ProductView from '@/components/productView'
import { useActions } from '@/hooks/useActions'
import { useTypedSelector } from '@/hooks/useTypeSelector'

export function uniqueId(): string {
    const dateString = Date.now().toString(36)
    const randomness = Math.random().toString(36).substr(2)
    return dateString + randomness
}

const FormAddProduct: React.FC = () => {

    const { addItem, setProducts, removeItem } = useActions()

    const { products } = useTypedSelector(state => state)

    const [newProduct, setProduct] = useState<IProduct>({
        id: uniqueId(),
        title: "",
        price: 0,
        description: "",
        category: "",
        image: "",
        rating: {
            rate: 0,
            count: 0
        }
    })

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {

        setProduct({ ...newProduct, [(event.target as HTMLInputElement).name]: (event.target as HTMLInputElement).value })
    }

    const changeHandlerTextArea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {

        setProduct({ ...newProduct, [(event.target as HTMLTextAreaElement).name]: (event.target as HTMLTextAreaElement).value })
    }

    const addProduct = () => {

        let copy = Object.assign([], products)
        copy.push(newProduct)
        setProducts(copy)
        setProduct(
            {
                id: uniqueId(),
                title: "",
                price: 0,
                description: "",
                category: "",
                image: "",
                rating: {
                    rate: 0,
                    count: 0
                }
            }
        )
        console.log("Products в addProduct:" + copy)
        localStorage.setItem("products", JSON.stringify(copy))
    }

    return (
        <>
            <div className={myStyles.product}>
                <div className={myStyles.product__add}>
                    <form action="" className={myStyles.form}>
                        <div className={myStyles.form__content}>
                            <label htmlFor="nameProduct" className={myStyles.inputLabel}>Наименование товара</label>
                            <input type="nameProduct" value={newProduct.title} id="nameProduct" name='title' className={myStyles.inputText} onChange={(event) => changeHandler(event)} />

                            <label htmlFor="productDescription">Описание товара</label>
                            <textarea
                                name="description"
                                id="filled-textarea productDescription"
                                cols={40}
                                rows={5}
                                className={myStyles.inputText}
                                onChange={(event) => changeHandlerTextArea(event)}
                                value={newProduct.description}
                            />

                            <label htmlFor="productImage" className={myStyles.inputLabel}>Ссылка на изображение товара</label>
                            <input onChange={(event) => changeHandler(event)} name="image" type="productImage" id="productImage" className={myStyles.inputText} value={newProduct.image} />

                            <label htmlFor="productCost" className={myStyles.inputLabel}>Цена товара</label>
                            <input onChange={(event) => changeHandler(event)} name="price" value={newProduct.price ? String(newProduct.price) : ''}
                                type="productCost" id="productCost" className={myStyles.inputText}
                            />

                            <Button
                                variant="contained"
                                disabled={!newProduct.title || !newProduct.price || !newProduct.image}
                                className={myStyles.Button}
                                onClick={() => addProduct()}>
                                Добавить товар
                            </Button>
                        </div>
                    </form>
                </div>
                <ProductView deleteProduct={true} />
            </div>
        </>
    )
}

export default FormAddProduct

