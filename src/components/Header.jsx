import {Link} from "react-router-dom";
import {useAuthContext} from "../contexts/AuthContext.jsx";
import {signOut} from 'firebase/auth';
import {auth} from "../config/firebase.js";
import {useSelector} from "react-redux";

export default function Header() {
    const user = useAuthContext();
    const cart = useSelector((state) => state.cart);

    const hasUser = () => {
        if (user) {
            return (<div className='flex flex-col place-items-center space-y-2'>
                <p>Hi, {user?.email}</p>
                <div className='flex items-center space-x-3'>
                    <Link to='product/add'
                          className='flex items-center space-x-1 bg-white text-black px-3 py-1 font-semibold rounded-2xl'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                             className="w-5 h-5">
                            <path
                                d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z"/>
                        </svg>
                        <span>Add product</span>
                    </Link>
                    <button className='text-red-500 font-semibold flex items-center space-x-1' type='button'
                            onClick={() => signOut(auth)}>
                        <span>Logout</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"/>
                        </svg>
                    </button>
                </div>
            </div>)
        }

        return (<Link to="/register">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                 strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/>
            </svg>
        </Link>);
    }

    return (<nav className='bg-black'>
        <div className="container mx-auto">
            <div className='flex justify-between items-center py-6 text-white'>
                <Link to="/">GOTTI.bg</Link>
                <ul className='flex items-center space-x-3'>
                    <li>
                        <Link to="/cart" className='relative'>
                            <sup className='absolute top-0 -right-2'>{cart.cart.length}</sup>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                 strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"/>
                            </svg>
                        </Link>
                    </li>
                    <li>{hasUser()}</li>
                </ul>
            </div>
        </div>
    </nav>)
}