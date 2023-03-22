import myStyles from '@/styles/myStyles.module.scss'
import IProduct from '@/types/product.type'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import Image from 'next/image'
import cart from "../assets/img/cart.png"
import IProductView from '@/types/productView.type'
import { useActions } from '@/hooks/useActions'
import { useTypedSelector } from '@/hooks/useTypeSelector'
import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal, Key, useEffect, useState } from 'react'
import { uniqueId } from './formAddProduct'
import { types } from 'sass'
import InfiniteScroll from 'react-infinite-scroller'

const ProductView: React.FC<IProductView> = ({ products, deleteProduct, loadFunc }) => {

    let page: number = 1

    return (
        <div className={myStyles.product__show}>
            <TransitionGroup className={myStyles.product__show} component="div">
                <InfiniteScroll
                    pageStart={page}
                    loadMore={loadFunc}
                    hasMore={true || false}
                    loader={<div className="loader" key={0}>Loading ...</div>}
                >
                    {products && products.map((element, index) =>
                        <CSSTransition key={index} timeout={500} classNames="card" mountOnEnter unmountOnExit>
                            <div className={myStyles.card} key={index}>
                                {deleteProduct && <Image src={cart} alt="Удалить" className={myStyles.card__cart} onClick={() => deleteProduct(element.id)}></Image>}
                                <img src={element.images[0]} alt="Изображение товара" />
                                <div className={myStyles.card__content}>
                                    <h3 className={myStyles.card__title}>{element.title}</h3>
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
                </InfiniteScroll>
                {/* {products && products.map((element, index) =>
                    <CSSTransition key={index} timeout={500} classNames="card" mountOnEnter unmountOnExit>
                        <div className={myStyles.card} key={index}>
                            {deleteProduct && <Image src={cart} alt="Удалить" className={myStyles.card__cart} onClick={() => deleteItem(element.id)}></Image>}
                            <img src={element.image} alt="Изображение товара" />
                            <div className={myStyles.card__content}>
                                <h3 className={myStyles.card__title}>{element.title}</h3>
                                <div className={myStyles.card__description}>
                                    {element.description}
                                </div>
                                <div className={myStyles.card__price}>
                                    {String(element.price).replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
                                </div>
                            </div>
                        </div>
                    </CSSTransition>
                )} */}
            </TransitionGroup>
        </div>
    )
}


export default ProductView