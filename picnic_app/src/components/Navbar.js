import { Link } from "react-router-dom"
const Navbar = (props) => {
    return (
    <>
        <div>
            <nav>
            <h1><Link style={{textDecoration:'none', color:'black'}} to='/'><span><img alt='picnic-img' src="icons8-picnic-64 (2).png"/></span>Ap|picnic</Link></h1>
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