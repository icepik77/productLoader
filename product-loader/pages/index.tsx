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
import { useState, createRef, RefObject, Ref, useEffect } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { CSSTransitionProps } from 'react-transition-group/CSSTransition'
import IProduct from '@/types/product'
import ProductView from '@/components/productView'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {




  const deleteProduct = (index: number) => {

    // addProducts(products?.filter((el) => products[index] != el) || null)

    const copy = Object.assign([], products)
    copy.splice(index, 1)
    addProducts(copy)
    localStorage.setItem("products", JSON.stringify(copy))
  }

  return (
    <>

      <div className={myStyles.wrapper}>

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
      </div>

    </>
  )
}
