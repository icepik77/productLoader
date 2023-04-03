
import myStyles from '@/styles/myStyles.module.scss'
import Button from '@mui/material/Button'
import React, { useState } from 'react'
import IProduct from '@/types/Product'
import ProductView from '@/components/productView'
import { useActions } from '@/hooks/useActions'
import { useTypedSelector } from '@/hooks/useTypeSelector'

export function uniqueId(): string {
    const dateString = Date.now().toString(36)
    const randomness = Math.random().toString(36).substr(2)
    return dateString + randomness
}

const FormAddProduct: React.FC = () => {

    const { setProducts } = useActions()

    const { products } = useTypedSelector(state => state)

    const [newProduct, setProduct] = useState<IProduct>({
        id: uniqueId(),
        title: "",
        price: 0,
        description: "",
        category: "",
        discountPercentage: 0,
        stock: 0,
        brand: "",
        thumbnail: "",
        images: [],
        rating: {
            rate: 0,
            count: 0
        }
    })

    const [isValidPrice, setIsValidPrice] = useState(true)
    const [isValid, setIsValid] = useState<boolean>(true)

    const setImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const image = (event.target as HTMLInputElement).value
        setProduct((prevProduct: IProduct) => ({
            ...prevProduct,
            images: [image, ...prevProduct.images.slice(1)]
        }));
    }

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {

        setProduct({ ...newProduct, [(event.target as HTMLInputElement).name]: (event.target as HTMLInputElement).value })
    }

    const changeHandlerPrice = (event: React.ChangeEvent<HTMLInputElement>) => {

        const inputVal = event.target.value;

        // Проверяем, является ли значение числом
        if (!isNaN(Number(inputVal))) {
            setProduct({ ...newProduct, [(event.target as HTMLInputElement).name]: (event.target as HTMLInputElement).value })
            setIsValidPrice(true)
        } else {
            setIsValidPrice(false)
        }
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
                discountPercentage: 0,
                stock: 0,
                brand: "",
                thumbnail: "",
                images: ["",],
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
                            <input onChange={(event) => setImage(event)} name="image" type="productImage" id="productImage" className={myStyles.inputText} value={newProduct.images[0]} />

                            <label htmlFor="productCost" className={myStyles.inputLabel}>Цена товара</label>
                            <input onChange={(event) => changeHandlerPrice(event)} name="price" value={newProduct.price ? String(newProduct.price) : ''}
                                type="productCost" id="productCost" className={myStyles.inputText}
                            />
                            {!isValidPrice && <div style={{ color: 'red' }}>Пожалуйста, введите число</div>}

                            <Button
                                variant="contained"
                                disabled={!newProduct.title || !newProduct.price || !newProduct.images}
                                className={myStyles.Button}
                                onClick={() => addProduct()}>
                                Добавить товар
                            </Button>
                        </div>
                    </form>
                </div>
                <div className={myStyles.scroll}>
                    <ProductView willDeleteProduct={true} willLoadFunc={false} />
                </div>

            </div>
        </>
    )
}

export default FormAddProduct

