import {useSelector, useDispatch} from 'react-redux';
import {db} from "../../config/firebase.js";
import {collection, getDocs} from 'firebase/firestore';
import {useEffect, useState} from "react";
import ProductSingleton from "../../components/ProductSingleton.jsx";
import Grid from "../../components/Grid.jsx";
import {removeFromCart} from "../../store.js";

export default function Cart() {
    const cartState = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const productsCollection = collection(db, "products");
    const [filteredProduct, setFilteredProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getDocs(productsCollection);
                const allProducts = data.docs.map(doc => ({id: doc.id, ...doc.data()}));
                const filteredProducts = allProducts.filter(item => cartState.cart.includes(item.id));
                setFilteredProducts(filteredProducts);
            } catch (e) {
                console.log(e)
            }
        }
        fetchProducts();
    }, [cartState?.cart])

    return (
        <div>
            <h1 className='mb-6 font-semibold text-2xl'>Количка (Cart)</h1>
            {filteredProduct.length > 0 ?
                <Grid>{filteredProduct.map(product => (
                    <div key={product.id}>
                        <button
                            onClick={() => dispatch(removeFromCart(product.id))}
                            className='text-red-500 font-semibold border-2 border-red-500 px-2 py-1 text-xs rounded-2xl hover:text-white hover:bg-red-500 transition-colors'>X
                            Remove from cart
                        </button>
                        <ProductSingleton title={product.title}
                                          id={product.id}
                                          category={product.category}
                                          discount={product.discount}
                                          price={product.price}
                                          sizes={product.sizes}
                                          image={product.image}
                        />
                    </div>))}</Grid> :
                <h1 className='text-xl font-semibold'>Нямате продукти в количката! (Your cart is empty)</h1>}
        </div>
    )
}