import { App, Col, Row, Table, Tabs } from 'antd';
import axios from 'axios';
import type React from 'react';
import { useEffect, useState } from 'react';
import { FaArrowDownLong, FaArrowUpLong } from 'react-icons/fa6';
import { MdLogout } from 'react-icons/md';

const Dashboard: React.FC = () => {
    const [selectedPeriod, setSelectedPeriod] = useState('Ontem');
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any>();
    const { message } = App.useApp();

    const handleTabChange = (key: string) => {
        setSelectedPeriod(key);
    };

    const logout = () => {
        window.localStorage.clear();
        window.location.href = '/';
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const endpoints = [
                'empresa/todas/ontem',
                'empresa/todas/hoje',
                'empresa/todas/mes',
                'empresa/todas/ano',
            ];

            try {
                const [ontem, hoje, mes, ano] = await axios.all(
                    endpoints.map((url) => axios.get(url)),
                );

                const data = {} as any;

                data.Ontem = ontem.data.lista;
                data.Hoje = hoje.data.lista;
                data.Mês = mes.data.lista;
                data.Ano = ano.data.lista;
                setData(data);
            } catch (error) {
                message.error({ content: 'Ocorreu um erro inesperado' });
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

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
                        <FaArrowDownLong
                            size={15}
                            style={{ margin: '5px 5px 0 0', float: 'left' }}
                        />
                    ) : (
                        <FaArrowUpLong size={15} style={{ margin: '5px 5px 0 0', float: 'left' }} />
                    )}
                    {value}
                </span>
            );
        }
        return '';
    };

    const periods = ['Ontem', 'Hoje', 'Mês', 'Ano'];

    const columns = [
        {
            title: 'Nome',
            dataIndex: 'nome',
            key: 'nome',
        },
        {
            title: 'Valor',
            dataIndex: 'valor',
            key: 'valor',
        },
        ...(selectedPeriod !== 'Ano'
            ? [
                  {
                      title: 'Mês',
                      dataIndex: 'comparacaoMes',
                      key: 'comparacaoMes',
                      render: calculate,
                  },
              ]
            : []),
        {
            title: 'Ano',
            dataIndex: 'comparacaoAno',
            key: 'comparacaoAno',
            render: calculate,
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
