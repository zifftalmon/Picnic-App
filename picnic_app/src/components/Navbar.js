import { Link } from "react-router-dom"
const Navbar = (props) => {
    return (
    <>
        <div>
            <nav>
            <h1><Link to='/'>Navbar</Link></h1>
                <ul>
                    <li><Link to='/provisions'>Provision List & Status</Link></li>
                    <li><Link to='/recommendations'>Recommendations</Link></li>
                    <li><Link to='/favorites'>Favorite Locations</Link></li>
                </ul>
            </nav>
        </div>
    </>
    )
}

export default Navbar