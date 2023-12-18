import { Card, Button, Drawer } from 'antd';
import { OrganizationGrid } from './organization-grid'
import { useEffect, useState } from 'react';
import { ClientModel, OrganizationForm } from './organiation-form';

export const OrganisationPage = () => {
    const [showForm, setShowForm] = useState(false);
    const [orgData, setOrgData] = useState<ClientModel[]>([]);

    useEffect(() => {
        getAllOrganisations();
    }, []);

    const getAllOrganisations = () => {
        setOrgData([new ClientModel(1, 'abx', 'bbs')]);
    }



    const submitHandler = (req: ClientModel) => {
        closeButtonHandler();
        getAllOrganisations();
    }

    const createButtonHandler = () => {
        setShowForm(true);
    }

    const closeButtonHandler = () => {
        setShowForm(false);
    }
    return (
        <>
            <Card title='Clients' extra={<Button onClick={createButtonHandler}>Create</Button>}>
                <OrganizationGrid data={orgData} />
            </Card>
            <Drawer
                title={'Client'}
                open={showForm}
                onClose={closeButtonHandler}
                width='50%'
            >
                <OrganizationForm submitHandler={submitHandler} />
            </Drawer>
        </>
    )
}

export default OrganisationPage