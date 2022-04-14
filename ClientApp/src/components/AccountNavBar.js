import { Link, NavLink} from "react-router-dom"
import { useState } from "react";
import { NavItem } from "reactstrap";


const AccountNavBar = () => {

    const [userIsLogged, setUserIslogged] = useState(false);
    const [username, setUsername] = useState('none');

    return (
        userIsLogged ? (
            <NavItem>
                <NavLink tag={Link} className="btn btn-dark" to="/login">Log Out</NavLink>
            </NavItem>
        ) : (
            
            <NavLink tag={Link} className="btn btn-dark" to="/login">Sign In</NavLink>
        )
    )
}

export default AccountNavBar