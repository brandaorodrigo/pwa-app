import 'antd/dist/reset.css';
import './App.scss';

import axios from 'axios';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Dashboard from './Dashboard';
import Layout from './Layout';
import Login from './Login';

// axios -------------------------------------------------------------------------------------------

axios.defaults.baseURL = 'https://mfweb.maisfluxo.com.br/MaisFluxoServidorWEB/rest';

const token = window.localStorage.getItem('token');

if (token) {
    axios.defaults.headers.common.Authorization = `Basic ${token}`;
}

// routes ------------------------------------------------------------------------------------------

const routePrivate = [{ path: '', element: <Dashboard /> }];

const routePublic = [{ path: '', element: <Login /> }];

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
