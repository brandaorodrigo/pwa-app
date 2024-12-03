import { App } from 'antd';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Google = () => {
    const { message } = App.useApp();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.hash.substring(1));
        const token = params.get('access_token');
        if (token) {
            window.localStorage.setItem('type', 'GoogleToken');
            window.localStorage.setItem('token', token);
            window.location.href = '/';
        } else {
            message.error({ content: 'Ocorreu um erro inesperado' });
            navigate('/');
        }
    }, []);

    return <></>;
};

export default Google;
