import ProductSingleton from "./ProductSingleton";
import Grid from './Grid.jsx'
import {useEffect, useState} from "react";
import {db} from '../config/firebase.js';
import {collection, getDocs, limit, orderBy, query} from 'firebase/firestore';

export default function LatestProducts() {
    const [latestProducts, setLatestProducts] = useState([]);
    const productsCollection = query(collection(db, "products"), orderBy("createdAt", "desc"), limit(10));

    useEffect(() => {
        const fetchLatestProducts = async () => {
            try {
                const data = await getDocs(productsCollection);
                const latestProduct = data.docs.map(doc => ({id: doc.id, ...doc.data()}));
                setLatestProducts(latestProduct);
            } catch (e) {
                console.log(e)
            }
        }

        fetchLatestProducts();
    }, [])

    return (<div>
        <h1 className='mb-6 font-semibold text-2xl'>Последно добавени (Latest products)</h1>
        {latestProducts.length > 0 ?
            <Grid>{latestProducts.map(product => <ProductSingleton key={product.id} title={product.title}
                                                                   id={product.id}
                                                                   category={product.category}
                                                                   discount={product.discount} price={product.price}
                                                                   sizes={product.sizes}
                                                                   image={product.image}
            />)}</Grid> :
            <h1 className='text-xl font-semibold'>Няма добавени продукти!</h1>}
    </div>);
}