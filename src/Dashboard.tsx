import { App, Button, Col, Row, Table, Tabs } from 'antd';
import axios from 'axios';
import type React from 'react';
import { useEffect, useState } from 'react';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa6';
import { MdLogout } from 'react-icons/md';
import { baseURL } from './App';

const Dashboard: React.FC = () => {
    const [selectedPeriod, setSelectedPeriod] = useState('Hoje');
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<any>({});
    const { message } = App.useApp();

    const fetchData = async (period: string) => {
        setLoading(true);
        const endpointMap: Record<string, string> = {
            Ontem: `${baseURL}empresa/todas/ontem`,
            Hoje: `${baseURL}empresa/todas/hoje`,
            Mês: `${baseURL}empresa/todas/mes`,
            Ano: `${baseURL}empresa/todas/ano`,
        };

        try {
            const response = await axios.get(endpointMap[period]);
            setData((prevData: any) => ({ ...prevData, [period]: response.data.lista }));
        } catch (error) {
            message.error({ content: 'Ocorreu um erro inesperado' });
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    const handleTabChange = (key: string) => {
        setSelectedPeriod(key);
        fetchData(key);
    };

    const logout = () => {
        window.localStorage.clear();
        window.location.href = '/';
    };

    const calculate = (value: string) => {
        if (value) {
            const down = value.startsWith('-');
            return (
                <span
                    style={{
                        color: down ? 'var(--ant-red)' : 'var(--ant-color-link)',
                    }}
                >
                    {down ? (
                        <FaArrowDown size={16} style={{ margin: '3px 5px 0 0', float: 'left' }} />
                    ) : (
                        <FaArrowUp size={16} style={{ margin: '3px 5px 0 0', float: 'left' }} />
                    )}
                    {value}
                </span>
            );
        }
        return '';
    };

    const periods = ['Hoje', 'Ontem', 'Mês', 'Ano'];

    const columns = [
        {
            title: '',
            dataIndex: 'nome',
            key: 'nome',
        },
        {
            title: 'Qtde.',
            dataIndex: 'valor',
            key: 'valor',
        },
        ...(selectedPeriod !== 'Ano'
            ? [
                  {
                      align: 'center',
                      title: 'Mês',
                      dataIndex: 'comparacaoMes',
                      key: 'comparacaoMes',
                      render: calculate,
                      width: '105px',
                  },
              ]
            : []),
        {
            align: 'center',
            title: 'Ano',
            dataIndex: 'comparacaoAno',
            key: 'comparacaoAno',
            render: calculate,
            width: '105px',
        },
    ];

    useEffect(() => {
        fetchData('Hoje'); // Carrega os dados iniciais para a aba 'Hoje'
    }, []);

    return (
        <Row
            justify='center'
            align='middle'
            style={{
                margin: '0 auto',
                width: 'calc(100dvw - 20px)',
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
                                float: 'left',
                                margin: '10px 0',
                            }}
                        />
                    </Col>
                </Row>

                {/* Abas sempre visíveis */}
                <Tabs defaultActiveKey={selectedPeriod} onChange={handleTabChange} centered>
                    {periods.map((period) => (
                        <Tabs.TabPane tab={period} key={period} />
                    ))}
                </Tabs>

                {/* Conteúdo abaixo das abas */}
                {loading ? (
                    <div className='loading' />
                ) : error ? (
                    <Button onClick={() => window.location.reload()}>Recarregar</Button>
                ) : (
                    <Table
                        columns={columns as any}
                        dataSource={data?.[selectedPeriod] || []}
                        pagination={false}
                        scroll={{ x: true }}
                    />
                )}
            </Col>
        </Row>
    );
};

export default Dashboard;
