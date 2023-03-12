import {lazy, Suspense} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./pages/home/Home";
import Header from "./components/Header";
import {AuthProvider} from './contexts/AuthContext';
import ProtectedRoutes from "./utils/ProtectedRoutes";
import {Provider as ReduxProvider} from "react-redux";
import {store} from "./store.js";
import {ErrorBoundary} from "./components/ErrorBounday.jsx";

const Cart = lazy(() => import('./pages/cart/Cart'));
const Register = lazy(() => import('./components/auth/Register'));
const Login = lazy(() => import('./components/auth/Login.jsx'));
const NotFound = lazy(() => import('./pages/404/NotFound'));
const AddProduct = lazy(() => import('./pages/admin/AddProduct'));

function App() {
    return (<ErrorBoundary>
            <ReduxProvider store={store}>
                <Router>
                    <AuthProvider>
                        <Header/>
                        <div className='container mx-auto my-6'>
                            <Routes>
                                <Route path="/" element={<Home/>}/>
                                <Route path="/cart"
                                       element={<Suspense fallback={<h1>Loading...</h1>}><Cart/></Suspense>}/>
                                <Route path="/register"
                                       element={<Suspense fallback={<h1>Loading...</h1>}><Register/></Suspense>}/>
                                <Route path="/login"
                                       element={<Suspense fallback={<h1>Loading...</h1>}><Login/></Suspense>}/>
                                <Route element={<ProtectedRoutes/>}>
                                    <Route path='/product/add'
                                           element={<Suspense fallback={<h1>Loading...</h1>}><AddProduct/></Suspense>}/>
                                </Route>
                                <Route path="*"
                                       element={<Suspense fallback={<h1>Loading...</h1>}><NotFound/></Suspense>}/>
                            </Routes>
                        </div>
                    </AuthProvider>
                </Router>
            </ReduxProvider>
        </ErrorBoundary>)
}

export default App
