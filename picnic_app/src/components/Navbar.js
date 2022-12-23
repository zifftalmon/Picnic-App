import { Link } from "react-router-dom"
const Navbar = (props) => {
    return (
    <>
        <div>
            <nav>
            <h1><Link style={{textDecoration:'none', color:'black'}} to='/'>Navbar</Link></h1>
                <ul>
                    <li><Link style={{textDecoration:'none', color:'black'}} to='/provisions'>Provision List & Status</Link></li>
                    <li><Link style={{textDecoration:'none', color:'black'}} to='/recommendations'>Recommendations</Link></li>
                    <li><Link style={{textDecoration:'none', color:'black'}} to='/favorites'>Favorite Locations</Link></li>
                </ul>
            </nav>
        </div>
    </>
    )
}

export default Navbar