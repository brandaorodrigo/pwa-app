import 'antd/dist/reset.css';
import './App.scss';

import axios from 'axios';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Dashboard from './Dashboard';
import Google from './Google';
import Layout from './Layout';
import Login from './Login';

// axios -------------------------------------------------------------------------------------------

// axios.defaults.baseURL = 'https://mfweb.maisfluxo.com.br/MaisFluxoServidorWEB/rest';
// axios.defaults.baseURL = 'https://mfas02.maisfluxo.com.br/MaisFluxoServidorWEB/rest';

const baseURL = 'https://app.maisfluxo.com.br/proxy.php?endpoint=';

export { baseURL };

const token = window.localStorage.getItem('token');

if (token) {
    axios.defaults.headers.common.Authorization = `Basic ${token}`;
}

// mock --------------------------------------------------------------------------------------------

/*
axios.interceptors.request.use((config) => {
    const url = new URL(window.location.href);
    const base = `${url.pathname.split('/')[0]}/mock`;
    config.baseURL = base;
    config.url = config.url ? `${config.url.replace(/[/?]/g, '_')}.json` : undefined;
    return config;
});
*/

// routes ------------------------------------------------------------------------------------------

const routePrivate = [{ path: '', element: <Dashboard /> }];

const routePublic = [
    { path: '', element: <Login /> },
    { path: 'google', element: <Google /> },
];

const route = [
    {
        errorElement: <></>,
        element: <Layout />,
        children: token ? routePrivate : routePublic,
    },
];

// app ---------------------------------------------------------------------------------------------

const App: React.FC = () => {
    return (
        <>
            <RouterProvider router={createBrowserRouter(route)} />
        </>
    );
};

export default App;
