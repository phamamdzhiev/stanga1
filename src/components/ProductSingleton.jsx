import useDiscountPrice from "../hooks/useDiscountPrice.js";
import {useDispatch, useSelector} from 'react-redux';
import {addToCart} from "../store.js";
import {useLocation} from "react-router-dom";

export default function ProductSingleton({id, title, price, category, sizes, discount, image}) {
    const dispatch = useDispatch();
    const cartState = useSelector((state) => state.cart);
    const location = useLocation();

    return (<div
        className="product-singleton-slider relative"
    >
        <div>
            <img
                src={image}
                alt="Дамски спортни обувки GOTTI 44634 – BEIGE"
                className="aspect-square object-cover object-center lg:h-full lg:w-full md:-hover:opacity-75"
            />
        </div>
        <div className="mt-4 mb-2 text-center">
            <div>
                <p className='uppercase text-xs text-gray-600'>{category}</p>
                <h3 className="text-sm md:text-base font-medium first-letter:text-gray-700 mb-2 overflow-hidden text-ellipsis">
                    {title}
                </h3>
                <div className="flex flex-wrap justify-center items-center gap-1">
                    <p className={discount ? 'text-xs line-through' : 'text-sm font-semibold'}>{price.toFixed(2) + ' лв.'}</p>
                    {discount && <p className='text-sm font-semibold'>{useDiscountPrice(price, discount) + ' лв.'}</p>}
                </div>
            </div>
            <div className="flex flex-wrap justify-center items-center md:gap-2 gap-1 mt-3">
                {sizes.map((size) => {
                    return (<span
                        key={size}
                        className="flex items-center justify-center rounded-2xl py-0.5 px-3 select-none text-xxs md:text-xs bg-[#f2f2f2] text-black/80 font-semibold">
                            {size}
                        </span>)
                })}
            </div>
            {
                location.pathname !== '/cart' &&
                <button onClick={() => dispatch(addToCart(id))}
                        className='mt-5 btn-primary py-1 capitalize text-xs max-w-[150px]'>
                    {cartState?.cart.includes(id) ? 'Added' : 'Add to cart'}
                </button>
            }
        </div>
    </div>)
}