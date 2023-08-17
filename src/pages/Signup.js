import { useState, memo } from 'react';
import { Form, Button, Row, FormControl, Container } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.css";

import axios from 'axios';

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRePassword] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = () => {
        if (password !== repassword) {
            alert("Password is not match");
        } else {
            axios.post('/auth/signup', {
                username: username,
                password: password,
                email: email
            })
                .then((response) => {
                    console.log(response);

                    if (response.data.error) alert(response.data.error);
                    else {
                        localStorage.setItem('accessToken', response.data.token);
                        console.log('Token: ' + response.data.token);
                    }
                })
        }
    }


    return (
        <Container className='my-5'>
            <Row className='justify-content-center'>
                <Form style={{ maxWidth: 700 }}>
                    <FormControl
                        type='text'
                        placeholder='username'
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                    <FormControl
                        type='password'
                        placeholder='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <FormControl
                        type='password'
                        placeholder='repassword'
                        value={repassword}
                        onChange={e => setRePassword(e.target.value)}
                    />
                    <FormControl
                        type='email'
                        placeholder='email'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Button onClick={handleSubmit}>Send</Button>
                </Form>
            </Row>
        </Container>
    )
}

export default memo(Login);