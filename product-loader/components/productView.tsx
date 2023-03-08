import myStyles from '@/styles/myStyles.module.scss'
import IProduct from '@/types/product'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import Image from 'next/image'
import cart from "../assets/img/cart.png"
import IProductView from '@/types/productView'


export default function ProductView({ products, addProduct, deleteProduct }: IProductView) {

    return (
        <div className={myStyles.product__show}>
            <TransitionGroup className={myStyles.product__show} component="div">
                {products && products.map((element, index) =>
                    <CSSTransition key={index} timeout={500} classNames="card" mountOnEnter unmountOnExit>
                        <div className={myStyles.card} key={index}>
                            {deleteProduct && <Image src={cart} alt="Удалить" className={myStyles.card__cart} onClick={() => deleteProduct(index)}></Image>}
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
    )
}