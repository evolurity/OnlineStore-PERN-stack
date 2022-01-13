import React, {useContext, useState} from 'react';
import {Container, Form, Card, Button, Row} from "react-bootstrap";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/constants";
import {NavLink, useLocation, useNavigate} from "react-router-dom"
import {login, registration} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const navigation = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const click = async () => {
        try {
            let userData
            if (isLogin) {
                userData = await login(email, password)
            } else {
                userData = await registration(email, password)
            }
            user.setUser(userData)
            user.setIsAuth(true)
            navigation(SHOP_ROUTE)
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    return (
        <Container className="d-flex justify-content-center align-items-center"
                   style={{height: window.innerHeight - 54}}>
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">{isLogin ? 'Log in' : "Registration"}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Enter your email.."
                        value={email}
                        onChange={e => setEmail(e.target.value)}>
                    </Form.Control>
                    <Form.Control
                        className="mt-3"
                        placeholder="Enter your password.."
                        value={password}
                        type="password"
                        onChange={e => setPassword(e.target.value)}>
                    </Form.Control>
                    <Row className="d-flex justify-content-between mt-3 px-lg-3">
                        {isLogin ?
                            <div>
                                Haven't account? <NavLink to={REGISTRATION_ROUTE}>Registration</NavLink>
                            </div>
                            :
                            <div>
                                Do you have account? <NavLink to={LOGIN_ROUTE}>Log in</NavLink>
                            </div>
                        }
                        <Button
                            variant="outline-success"
                            onClick={click}>
                            {isLogin ? "Log in" : "Registration"}
                        </Button>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
});

export default Auth;