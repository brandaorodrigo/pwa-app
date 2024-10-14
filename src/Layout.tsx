import { App, ConfigProvider, Layout } from 'antd';
import { Outlet as OutletOriginal } from 'react-router-dom';

const Outlet: React.FC = () => {
    const text = '#222222';
    const primary = '#132638';
    const secondary = '#1e8675';
    const red = '#da8694';
    const white = '#ffffff';

    return (
        <ConfigProvider
            form={{
                requiredMark: 'optional',
                scrollToFirstError: true,
                validateMessages: { required: '${label} é obrigatório' },
            }}
            theme={{
                cssVar: true,
                components: {
                    Input: {
                        activeBorderColor: secondary,
                        colorPrimaryBorderHover: secondary,
                        colorPrimaryHover: secondary,
                    },
                    Table: {
                        cellPaddingBlock: 12,
                        cellPaddingInline: 0,
                        headerBg: white,
                    },
                },
                token: {
                    borderRadius: 10,
                    controlHeight: 42,
                    colorPrimary: primary,
                    colorBgLayout: white,
                    colorText: text,
                    colorLink: secondary,
                    controlHeightLG: 42,
                    boxShadow: 'none',
                    controlHeightSM: 24,
                    colorError: red,
                    fontFamily: 'Nunito',
                    fontSize: 15,
                    red: red,
                    fontSizeLG: 17,
                    fontSizeSM: 21,
                    lineWidth: 2,
                    controlOutline: 'transparent',
                    paddingLG: 38,
                    paddingMD: 26,
                    paddingSM: 14,
                },
            }}
        >
            <App>
                <Layout style={{ minHeight: 'calc(100dvh - 30px)', padding: '15px' }}>
                    <OutletOriginal />
                </Layout>
            </App>
        </ConfigProvider>
    );
};

export default Outlet;
