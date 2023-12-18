import { Card, Button, Drawer } from 'antd';
import { useEffect, useState } from 'react';
import { UnitForm, UnitFormModel } from './user-form';
import { UnitGrid } from './user-grid';


export const OrganisationPage = () => {
    const [showForm, setShowForm] = useState(false);
    const [orgData, setOrgData] = useState<UnitFormModel[]>([]);

    useEffect(() => {
        getAllOrganisations();
    }, []);

    const getAllOrganisations = () => {
        setOrgData([new UnitFormModel(1, 'abx', 'bbs','dsdad',3423432434)]);
    }



    const submitHandler = (req: UnitFormModel) => {
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
                <UnitGrid unitData={orgData} />
            </Card>
            <Drawer
                title={'Client'}
                open={showForm}
                onClose={closeButtonHandler}
                width='50%'
            >
                <UnitForm submitHandler={submitHandler} />
            </Drawer>
        </>
    )
}

export default OrganisationPage