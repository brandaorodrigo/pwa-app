import { App } from 'antd';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { baseURL } from './App';

const Google = () => {
    const { message } = App.useApp();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.hash.substring(1));
        const tokenId = params.get('id_token');
        if (tokenId) {
            axios
                .post(`${baseURL}login`, { googleToken: tokenId })
                .then(() => {
                    window.localStorage.setItem('token', tokenId);
                    window.location.href = '/';
                })
                .catch(() => {
                    message.error({ content: 'Ocorreu um erro ao tentar efetuar login' });
                    navigate('/');
                });
        }
    }, []);

    return <></>;
};

export default Google;
