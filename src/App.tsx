import 'antd/dist/reset.css';
import './App.scss';

import axios from 'axios';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Dashboard from './Dashboard';
import Layout from './Layout';
import Login from './Login';

axios.defaults.baseURL = 'https://mfweb.maisfluxo.com.br/MaisFluxoServidorWEB/rest';

const App: React.FC = () => {
    return (
        <>
            <RouterProvider
                router={createBrowserRouter([
                    {
                        errorElement: <>...</>,
                        element: <Layout />,
                        children: [
                            { path: '', element: <Login /> },
                            { path: 'dashboard', element: <Dashboard /> },
                        ],
                    },
                ])}
            />
        </>
    );
};

export default App;
