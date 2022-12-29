import { Link } from "react-router-dom"
const Navbar = (props) => {
    return (
    <>
        <div>
            <nav>
                <div className="icon">
                    <Link style={{textDecoration:'none', color:'black'}} to='/'><img alt='picnic-img' src="icons8-picnic-64 (2).png"/></Link>
                    <h1><Link style={{textDecoration:'none', color:'black'}} to='/'>Ap|picnic</Link></h1>
                </div>
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