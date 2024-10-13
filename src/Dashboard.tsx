import { App, Col, Row, Table, Tabs } from 'antd';
import axios from 'axios';
import type React from 'react';
import { useEffect, useState } from 'react';
import { MdLogout } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
    const [selectedPeriod, setSelectedPeriod] = useState('Ontem');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any>();
    const { message } = App.useApp();

    const handleTabChange = (key: string) => {
        setSelectedPeriod(key);
    };

    const logout = () => {
        window.localStorage.clear();
        navigate('/');
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const endpoints = [
                '/empresa/todas/ontem',
                '/empresa/todas/hoje',
                '/empresa/todas/mes',
                '/empresa/todas/ano',
            ];

            try {
                const [ontem, hoje, mes, ano] = await axios.all(
                    endpoints.map((url) => axios.get(url)),
                );

                const data = {} as any;

                data.ontem = ontem.data;
                data.hoje = hoje.data;
                data.mes = mes.data;
                data.ano = ano.data;

                setData(data);
            } catch (error) {
                message.error({ content: 'Ocorreu um erro inesperado' });
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const periods = ['Ontem', 'Hoje', 'Mês', 'Ano'];

    const columns = [
        {
            title: 'Nome',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Pessoas',
            dataIndex: 'visitors',
            key: 'visitors',
        },
        {
            title: 'R$',
            dataIndex: 'sales',
            key: 'sales',
        },
        {
            title: '%',
            dataIndex: 'growth',
            key: 'growth',
        },
    ];

    return (
        <Row
            justify='center'
            align='middle'
            style={{
                margin: '0 auto',
                padding: '15px',
                width: 'calc(100dvw - 30px)',
            }}
        >
            <Col span={24}>
                <Row style={{ textAlign: 'center', margin: '0 0 15px 0' }}>
                    <Col flex='30px' />
                    <Col flex='auto'>
                        <img src='/logo_dark.png' alt='Mais Fluxo' style={{ width: '130px' }} />
                    </Col>
                    <Col flex='30px'>
                        <MdLogout
                            size={20}
                            onClick={() => logout()}
                            style={{
                                cursor: 'pointer',
                                display: 'block',
                                float: 'right',
                                margin: '10px 0',
                            }}
                        />
                    </Col>
                </Row>
                {loading ? (
                    <div className='loading' />
                ) : (
                    <Tabs defaultActiveKey={selectedPeriod} onChange={handleTabChange} centered>
                        {periods.map((period) => (
                            <Tabs.TabPane tab={period} key={period}>
                                <Table
                                    columns={columns}
                                    dataSource={data?.[period] || []}
                                    pagination={false}
                                    scroll={{ x: true }}
                                    size='small'
                                />
                            </Tabs.TabPane>
                        ))}
                    </Tabs>
                )}
            </Col>
        </Row>
    );
};

export default Dashboard;
