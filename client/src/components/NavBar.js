import React, {useContext} from 'react';
import {Context} from "../index";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../utils/constants";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate()

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.clear()
        navigate(LOGIN_ROUTE)
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink style={{color: "white"}} to={SHOP_ROUTE}>YanShop</NavLink>
                {user.isAuth ?
                    <Nav className="ms-lg-auto" style={{color: "white"}}>
                        <Button
                            variant="outline-light"
                            onClick={logOut}>Log out</Button>
                        <Button
                            variant="outline-light"
                            className="mx-lg-2"
                            onClick={() => navigate(ADMIN_ROUTE)}
                        >Admin panel</Button>
                    </Nav>
                    :
                    <Nav className="ms-lg-auto" style={{color: "white"}}>
                        <Button variant="outline-light" onClick={() => navigate(LOGIN_ROUTE)}>Log in</Button>
                    </Nav>
                }
            </Container>
        </Navbar>
    );
});

export default NavBar;