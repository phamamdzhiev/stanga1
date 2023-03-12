export default function Grid(props) {
    return (
        <div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
            {props.children}
        </div>
    )
}