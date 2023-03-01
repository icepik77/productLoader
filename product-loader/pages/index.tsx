import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import BasicSelect from '@/components/select'
import myStyles from '@/styles/myStyles.module.scss'
import TextField from '@mui/material/TextField'
import Button, { ButtonProps } from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import { grey } from '@mui/material/colors'
import photo from '../assets/img/photo.png'
import cart from "../assets/img/cart.png"
import { useState, createRef, RefObject, Ref } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { CSSTransitionProps } from 'react-transition-group/CSSTransition'

interface IProduct {
  image: string,
  name: string,
  description: string,
  price: number | null,
}


const inter = Inter({ subsets: ['latin'] })




export default function Home() {

  const [products, addProducts] = useState<IProduct[]>(() => [{
    image: "https://pixel24.ru/page_images/images/08-eos-r-adaptors-control-ring-customise-function-v4_161193699623451.jpg",
    name: "Фотоаппарат",
    description: "Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк.",
    price: 10000
  },
  {
    image: "https://www.yarkiy.ru/system/uploads/preview/photo_storage/36413/PowerShot-SX620-HS-BK-FSL.jpg",
    name: "Фотоаппарат",
    description: "Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк.",
    price: 100000
  }
  ])
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
  }
  const deleteProduct = (index: number) => {
    const copy = Object.assign([], products)
    delete copy[index]
    addProducts(copy)
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </Head>
      <div className={myStyles.wrapper}>
        <div className={myStyles.topBlock}>
          <h1>
            Добавление товара
          </h1>
          <BasicSelect />
        </div>
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
          <div className={myStyles.product__show}>
            <TransitionGroup className={myStyles.product__show} component="div">
              {products.map((element, index, nodeRef) =>
                <CSSTransition key={index} timeout={500} classNames={myStyles.card} mountOnEnter unmountOnExit>
                  <div className={myStyles.card} key={index}>
                    <Image src={cart} alt="Удалить" className={myStyles.card__cart} onClick={() => deleteProduct(index)}></Image>
                    <img src={element.image} alt="Изображение товара" />
                    <div className={myStyles.card__content}>
                      <h3 className={myStyles.card__title}>{element.name}</h3>
                      <div className={myStyles.card__description}>
                        {element.description}
                      </div>
                      <div className={myStyles.card__price}>
                        {String(element.price).replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
                      </div>
                    </div>
                  </div>
                </CSSTransition>
              )}
            </TransitionGroup>
          </div>
        </div>
      </div>

    </>
  )
}
