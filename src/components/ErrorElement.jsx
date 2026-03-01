import { Link } from "react-router-dom"

const Error = () => {
    return (
        <div className="mt-50">
            <p className="font-bold">Oh! this route doesn't exist</p>
            <p>Click <Link to='/' className="text-blue-600">here</Link> to go back to home page.</p>
        </div>
    )
};

export default Error;