import { Col, Row, Table, Tabs } from 'antd';
import type React from 'react';
import { useState } from 'react';
import { MdLogout } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
    const [selectedPeriod, setSelectedPeriod] = useState('Ontem');
    const navigate = useNavigate();

    const handleTabChange = (key: string) => {
        setSelectedPeriod(key);
    };

    const logout = () => {
        window.localStorage.clear();
        navigate('/');
    };

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

    const data = [
        {
            key: '1',
            name: 'Shopping Center A',
            visitors: 1000,
            sales: 50000,
            growth: '5%',
        },
        {
            key: '2',
            name: 'Shopping Center B',
            visitors: 1200,
            sales: 55000,
            growth: '4%',
        },
        {
            key: '3',
            name: 'Shopping Center C',
            visitors: 1100,
            sales: 52000,
            growth: '3%',
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
                <Tabs defaultActiveKey={selectedPeriod} onChange={handleTabChange} centered>
                    {periods.map((period) => (
                        <Tabs.TabPane tab={period} key={period}>
                            <Table
                                columns={columns}
                                dataSource={data}
                                pagination={false}
                                scroll={{ x: true }}
                                size='small'
                            />
                        </Tabs.TabPane>
                    ))}
                </Tabs>
            </Col>
        </Row>
    );
};

export default Dashboard;
