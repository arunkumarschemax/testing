import { Card, Button, Drawer } from 'antd';
import { useEffect, useState } from 'react';
import { RolesForm, RolesModel } from './roles-form';
import { RolesGrid } from './roles-grid';

export const RolesPage = () => {
    const [showForm, setShowForm] = useState(false);
    const [rolesData, setRolesData] = useState<RolesModel[]>([]);

    useEffect(() => {
        getAllRoles();
    }, []);

    const getAllRoles = () => {
        setRolesData([new RolesModel(1, 'abx', 'bbs',1)]);
    }



    const submitHandler = (req: RolesModel) => {
        closeButtonHandler();
        getAllRoles();
    }

    const createButtonHandler = () => {
        setShowForm(true);
    }

    const closeButtonHandler = () => {
        setShowForm(false);
    }
    return (
        <>
            <Card title='Roles' extra={<Button onClick={createButtonHandler}>Create</Button>}>
                <RolesGrid data={rolesData} />
            </Card>
            <Drawer
                title={'Roles'}
                open={showForm}
                onClose={closeButtonHandler}
                width='50%'
            >
                <RolesForm submitHandler={submitHandler} />
            </Drawer>
        </>
    )
}

export default RolesPage