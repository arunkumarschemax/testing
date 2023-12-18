import { Card, Button, Drawer } from 'antd';
import { useEffect, useState } from 'react';
import { ApplicationGrid } from './application-grid';
import { ApplicationForm, ApplicationModel } from './application-form';

export const ApplicationPage = () => {
    const [showForm, setShowForm] = useState(false);
    const [orgData, setOrgData] = useState<ApplicationModel[]>([]);

    useEffect(() => {
        getAllOrganisations();
    }, []);

    const getAllOrganisations = () => {
        setOrgData([new ApplicationModel(1, 'abx', 'bbs')]);
    }



    const submitHandler = (req: ApplicationModel) => {
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
                <ApplicationGrid data={orgData} />
            </Card>
            <Drawer
                title={'Client'}
                open={showForm}
                onClose={closeButtonHandler}
                width='50%'
            >
                <ApplicationForm submitHandler={submitHandler} />
            </Drawer>
        </>
    )
}

export default ApplicationPage


