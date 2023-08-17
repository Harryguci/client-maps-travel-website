import { useState, memo } from 'react';
import { Form, Button, Row, FormControl, Container } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    // const [email, setEmail] = useState("");
    let navigator = useNavigate();

    const handleSubmit = () => {
        axios.post('/auth/login', {
            username: username,
            password: password,
        })
            .then((response) => {
                if (response.data.error)
                    alert(response.data.error);
                else {
                    localStorage.setItem('accessToken', response.data.token);
                    // console.log('Token: ' + response.data.token);
                    navigator('/');
                }
            });

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
                    <Button onClick={handleSubmit}>Send</Button>
                </Form>
            </Row>
        </Container>
    )
}

export default memo(Login);