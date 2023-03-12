import {Link, Navigate} from "react-router-dom";
import {useState} from "react";
import {useAuthContext} from "../../contexts/AuthContext.jsx";
import {signInWithEmailAndPassword} from 'firebase/auth'
import {auth} from "../../config/firebase.js";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const user = useAuthContext();

    const validateFields = () => {
        let isFormValid = true;

        if (email === '' || password === '') {
            isFormValid = false;
            setError("Имейлът и паролата са задължителни. (The email and password are required)");
        }

        return isFormValid;
    }

    const loginSubmitHandler = async (e) => {
        e.preventDefault();
        if (validateFields()) {
            try {
                await signInWithEmailAndPassword(auth, email, password);
            } catch (e) {
                console.log(e);
            }
        }
    }

    return (user ? <Navigate to='/'/> : <div className='max-w-xl mx-auto'>
        <h1 className='text-2xl font-semibold mb-6 text-center'>Вход (Login)</h1>
        <form onSubmit={loginSubmitHandler}>
            <div className="form-group">
                <label htmlFor="email" className='form-label required'>Имейл (Email)</label>
                <input className='form-input' type="text" id='email' onChange={e => setEmail(e.target.value)}/>
            </div>
            <div className="form-group">
                <label htmlFor="password" className='form-label required'>Парола (Password)</label>
                <input className='form-input' type="password" id='password'
                       onChange={e => setPassword(e.target.value)}/>
            </div>
            <button type='submit' className='btn-primary'>Вход (Login)</button>
            {error && <p className='text-red-500 text-sm font-semibold my-3 text-center'>{error}</p>}
        </form>
        <div className='flex justify-center items-center space-x-1 mt-5'>
            <h5 className='text-gray-600'>You don't have registration?</h5>
            <Link to='/register' className='font-semibold'>Register from here</Link>
        </div>
    </div>);
}