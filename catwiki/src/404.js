import { Link } from "react-router-dom";
import ErrorCat from './images/errorCat.png'

export default function Error404() {
    return (
        <div>
            <div id="Error404">
                <div id="Error-left">
            <h1>404</h1>
            <p>The Site you were trying to reach couldn't be found. Please open up another Site or go back to our Homepage:</p>
            <Link to="/"><button>Back to Homepage</button></Link>
            </div>
            <div id="Error-right">
                <img src={ErrorCat} alt="Error" width="60%" />
            </div>
            </div>
        </div>
    )
}