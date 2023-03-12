import {useState} from "react";
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth} from "../../config/firebase.js";
import {Link, Navigate, useNavigate} from 'react-router-dom';
import {useAuthContext} from "../../contexts/AuthContext.jsx";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const user = useAuthContext();

    const validateFields = () => {
        let isFormValid = true;

        if (email === '' || password === '') {
            isFormValid = false;
            setError("Имейлът и паролата са задължителни. (The email and password are required)");
        }

        if (password !== repeatPassword) {
            isFormValid = false;
            setError("Паролите не съвпадат (Passwords do not match)")
        }

        return isFormValid;
    }

    const registerSubmitHandler = async (e) => {
        e.preventDefault();
        if (validateFields()) {
            try {
                await createUserWithEmailAndPassword(auth, email, password);
            } catch (e) {
                console.log(e)
            }
        }
    }

    return (user ? <Navigate to="/"/> : <div className='max-w-xl mx-auto'>
        <h1 className='text-2xl font-semibold mb-6 text-center'>Регистрация (Register)</h1>
        <form onSubmit={registerSubmitHandler}>
            <div className="form-group">
                <label htmlFor="email" className='form-label required'>Имейл (Email)</label>
                <input className='form-input' type="text" id='email'
                       onChange={e => setEmail(e.target.value)}/>
            </div>
            <div className="form-group">
                <label htmlFor="password" className='form-label required'>Парола (Password)</label>
                <input className='form-input' type="password" id='password'
                       onChange={e => setPassword(e.target.value)}/>
            </div>
            <div className="form-group">
                <label htmlFor="repeatPassword" className='form-label required'>Повтори паролата (Repeat
                    password)</label>
                <input className='form-input' type="password" id='repeatPassword'
                       onChange={e => setRepeatPassword(e.target.value)}/>
            </div>
            <button type='submit' className='btn-primary'>Регистрация (Register)</button>
            {error && <p className='text-red-500 text-sm font-semibold my-3 text-center'>{error}</p>}
        </form>
        <div className='flex justify-center items-center space-x-1 mt-5'>
            <h5 className='text-gray-600'>You are already registered?</h5>
            <Link to='/login' className='font-semibold'>Login from here</Link>
        </div>
    </div>);
}