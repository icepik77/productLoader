
import myStyles from '@/styles/myStyles.module.scss'
import Button, { ButtonProps } from '@mui/material/Button'
import React, { useState, createRef, RefObject, Ref, useEffect } from 'react'
import IProduct from '@/types/product'
import ProductView from '@/components/productView'


const NewProduct: React.FC = () => {

    const [newProduct, setProduct] = useState<IProduct>({
        image: "",
        name: "",
        description: "",
        price: null
    })



    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {

        setProduct({ ...newProduct, [(event.target as HTMLInputElement).name]: (event.target as HTMLInputElement).value })
    }

    const changeHandlerTextArea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {

        setProduct({ ...newProduct, [(event.target as HTMLTextAreaElement).name]: (event.target as HTMLTextAreaElement).value })
    }

    const addProduct = () => {

        const copy = Object.assign([], products)
        copy.push(newProduct)
        addProducts(copy)
        setProduct(
            {
                image: "",
                name: "",
                description: "",
                price: null
            }
        )

        localStorage.setItem("products", JSON.stringify(products))
    }

    return (
        <>
            <div className={myStyles.product}>
                <div className={myStyles.product__add}>
                    <form action="" className={myStyles.form}>
                        <div className={myStyles.form__content}>
                            <label htmlFor="nameProduct" className={myStyles.inputLabel}>Наименование товара</label>
                            <input type="nameProduct" value={newProduct.name} id="nameProduct" name='name' className={myStyles.inputText} onChange={(event) => changeHandler(event)} />

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
                                disabled={!newProduct.name || !newProduct.price || !newProduct.image}
                                className={myStyles.Button}
                                onClick={() => addProduct()}>
                                Добавить товар
                            </Button>
                        </div>
                    </form>
                </div>
                <ProductView products={products} />
            </div>
        </>
    )
} 