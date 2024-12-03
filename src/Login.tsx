import { App, Button, Col, Form, Input, Row } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import { baseURL } from './App';

const Login = () => {
    const [loading, setLoading] = useState(false);
    const { message } = App.useApp();

    const onFinish = (values: any) => {
        setLoading(true);
        axios
            .post(`${baseURL}login`, values)
            .then(() => {
                window.localStorage.setItem('token', btoa(`${values.login}:${values.password}`));
                window.location.href = '/';
            })
            .catch(() => {
                message.error({ content: 'Usuário ou senha incorretos' });
                setLoading(false);
            });
    };

    const onGoogleLogin = () => {
        const clientId = '507806281292-sb2plqvrn08uvei9jbatppa69s0ik4gr.apps.googleusercontent.com';
        const redirectUri = `${window.location.origin}/google`;
        const scope = 'profile email';
        const responseType = 'token';
        const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=${responseType}`;
        window.location.href = url;
    };

    return (
        <Row
            justify='center'
            align='middle'
            style={{
                height: 'calc(100vh - 30px)',
                margin: '0 auto',
                maxWidth: 240,
                width: 'calc(100dvw - 30px)',
            }}
        >
            <Col span={24}>
                <Col
                    span={24}
                    style={{
                        margin: '0 0 20px 0',
                        textAlign: 'center',
                    }}
                >
                    <img src='/logo_dark.png' alt='Mais Fluxo' style={{ width: '200px' }} />
                </Col>

                <Form onFinish={onFinish} style={{ margin: '0 0 -20px 0' }} layout='vertical'>
                    <Form.Item
                        name='login'
                        label='Usuário'
                        className='nolabel'
                        rules={[{ required: true }]}
                    >
                        <Input placeholder='Usuário' />
                    </Form.Item>
                    <Form.Item
                        name='password'
                        label='Senha'
                        className='nolabel'
                        rules={[{ required: true }]}
                    >
                        <Input.Password placeholder='Senha' />
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary' htmlType='submit' block loading={loading}>
                            Entrar
                        </Button>
                    </Form.Item>
                </Form>
                <Button onClick={onGoogleLogin} block style={{ marginTop: '10px' }}>
                    <FcGoogle size={24} /> Entrar com Google
                </Button>
                <Link
                    to='https://maisfluxo.com.br/politica-de-privacidade'
                    target='_blank'
                    style={{
                        textAlign: 'center',
                        margin: '50px 0 0 0',
                        display: 'block',
                        fontSize: '14px',
                        opacity: 0.7,
                    }}
                >
                    Política de privacidade
                </Link>
            </Col>
        </Row>
    );
};

export default Login;
