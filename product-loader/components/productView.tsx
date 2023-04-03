import myStyles from '@/styles/myStyles.module.scss'
import IProduct from '@/types/Product'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import Image from 'next/image'
import cart from "../assets/img/cart.png"
import { useActions } from '@/hooks/useActions'
import { useTypedSelector } from '@/hooks/useTypeSelector'
import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';


const ProductView: React.FC<{ willDeleteProduct?: boolean, willLoadFunc?: boolean, data?: IProduct[] }> = ({ willDeleteProduct, willLoadFunc, data }) => {

    const [page, setPage] = useState<number>(1);
    const { products } = useTypedSelector(state => state)
    const { setProducts } = useActions()
    const [more, setMore] = useState<boolean>(willLoadFunc || false)

    useEffect(() => {
        setTimeout(() => {
            data && Array.isArray(data) && setProducts([...products, ...data])
        }, 5000)

    }, [])


    const loadProducts = async () => {
        if (willLoadFunc) {
            try {
                console.log(page)
                const response = await fetch(`https://dummyjson.com/products?skip=${page * 20}&limit=20`);
                if (!response.ok) {
                    throw new Error(`Ошибка HTTP: ${response.status}`);
                }
                const json = await response.json();
                if (json.products.length == 0) {
                    setMore(false)
                    return
                }
                setProducts([...products, ...(json.products)]);
                setPage(prev => prev + 1)
            } catch (error: unknown) {
                alert((error as Error).message);
            }
        }
    };

    const deleteElement = (id: string) => {

        let copy = Object.assign([], products)
        copy = copy.filter(product => product["id"] !== id)

        setProducts(copy)
        localStorage.setItem("products", JSON.stringify(copy))
    }

    return (
        <div>

            <InfiniteScroll
                dataLength={products.length}
                next={loadProducts}
                hasMore={more}
                loader={
                    <div className={myStyles.loader}>
                        <div className={myStyles.spinner}></div>
                    </div>
                }
            >
                <TransitionGroup component="div" className={myStyles.product__show}>
                    {products && products.map((element, index) =>
                        <CSSTransition key={element.id} timeout={500} classNames="card" className={myStyles.card} mountOnEnter unmountOnExit>
                            <div className={myStyles.card} key={element.id}>
                                {willDeleteProduct && <Image src={cart} alt="Удалить" className={myStyles.card__cart} onClick={() => deleteElement(element.id)}></Image>}
                                <img src={element.images[0]} alt="Изображение товара" />
                                <div className={myStyles.card__content}>
                                    <h3 className={myStyles.card__title}>{element.title}</h3>
                                    <div className={myStyles.card__description}>
                                        {element.description}
                                    </div>
                                    <div className={myStyles.card__price}>
                                        {String(element.price).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} руб.
                                    </div>
                                </div>
                            </div>
                        </CSSTransition>
                    )}
                </TransitionGroup>
            </InfiniteScroll>

        </div>
    )
}

export default ProductView