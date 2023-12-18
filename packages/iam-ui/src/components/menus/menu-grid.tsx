import { CheckOutlined, CloseCircleOutlined, EditOutlined } from '@ant-design/icons';
import { Divider, Popconfirm, Switch, Table, Tooltip } from 'antd';
import { MenusDto } from '@finestchoicex-iam/shared-models';
import { useTranslation } from 'react-i18next';
import { useAuthState } from '../../common/auth-context';

interface IMenuGridProps {
    data: MenusDto[];
    editHandler: (rec: MenusDto) => void
    activateOrDeactivate: (rec: MenusDto) => void
}
export const MenuGrid = (props: IMenuGridProps) => {
    const { t } = useTranslation();
    const { authContext } = useAuthState();
    const { data, editHandler, activateOrDeactivate } = props;
    const column = [
        {
            title: t("menu.common.menuName", { defaultValue: 'Menu Name' }),
            dataIndex: 'menuName',
        },
        {
            title: t("menu.common.order", { defaultValue: 'Order' }),
            dataIndex: 'order',
        },
        {
            title: t("menu.common.iconType", { defaultValue: "Icon Type" }),
            dataIndex: 'iconType',
        },
        {
            title: t("menu.common.iconName", { defaultValue: "Icon Name" }),
            dataIndex: 'iconName',
        },
        {
            title: t("menu.grid.module", { defaultValue: "Module" }),
            dataIndex: 'moduleName',
        },
        {
            title: t("menu.grid.applications", { defaultValue: "Applications" }),
            dataIndex: 'application',
        },
        {
            title: t("menu.grid.actions", { defaultValue: "Actions" }),
            key: 'actions',
            render: (text: string, rowData: MenusDto) => (
                <span>
                    <EditOutlined className={'editSamplTypeIcon'} type="edit"
                        onClick={() => {
                            editHandler(rowData);
                        }}
                        style={{ color: '#1890ff', fontSize: '20px' }}
                    />
                    <Divider type="vertical" />
                    <Popconfirm
                        onConfirm={e => {
                            activateOrDeactivate(rowData);
                        }}
                        title={rowData.isActive ? t("common.deActivateConfirmMsg", { defaultValue: 'Are you sure to Deactivate Record ?' }) : t("common.activateConfirmMsg", { defaultValue: 'Are you sure to activate Record ?' })}>
                        <Tooltip placement="top" title={rowData.isActive ? t("common.deActivate", { defaultValue: 'Deactivate' }) : t("common.activate", { defaultValue: 'Activate' })}>
                            <Switch size='default'
                                className={rowData.isActive ? 'toggle-activated' : 'toggle-deactivated'}
                                checkedChildren={<CheckOutlined />}
                                unCheckedChildren={<CloseCircleOutlined />}
                                checked={rowData.isActive} />
                        </Tooltip>
                    </Popconfirm>
                </span>
            )
        }
    ]
    return (
        <div>

            <Table columns={column} dataSource={data} />

        </div>
    )
}

