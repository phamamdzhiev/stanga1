import {Link} from "react-router-dom";

export default function NotFound() {
    return (
        <div className='text-center my-16'>
            <h1 className='text-3xl font-semibold'>404 Тази страница не съществува (404 This page does not exist)</h1>
            <h3 className='text-gray-600 text-xl my-5'>Моля, върнете се към началната страница (Please, return back to the homepage)</h3>
            <Link to="/" className='btn-primary max-w-sm'>НАЧАЛНА СТРАНИЦА (HOMEPAGE)</Link>
        </div>
    )
}