import {Link} from 'react-router-dom';

function Navbar() {
    return <nav className="navbar bg-dark container mt-100">
        <ul>
            <li><h4><Link to='/dashboard'>Home</Link></h4></li>
            <li><h4><Link to='/tasks'>All Tasks</Link></h4></li>
            <li><h4><Link to='/profile'>Profile</Link></h4></li>
        </ul>
    </nav>
}

export default Navbar;