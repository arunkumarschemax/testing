import { Card, Button, Drawer } from 'antd';
import { useEffect, useState } from 'react';
import { AttributeGrid } from './attribute-grid';
import AttributeForm, { Attributes } from './attribute-form';

export const OrganisationPage = () => {
    const [showForm, setShowForm] = useState(false);
    const [orgData, setOrgData] = useState<Attributes[]>([]);

    useEffect(() => {
        getAllOrganisations();
    }, []);

    const getAllOrganisations = () => {
        setOrgData([new Attributes(1, 'banu')]);
    }



    const handleSubmit = (req: Attributes) => {
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
                <AttributeGrid attributeData={orgData} />
            </Card>
            <Drawer
                title={'Client'}
                open={showForm}
                onClose={closeButtonHandler}
                width='50%'
            >
                <AttributeForm handleSubmit={handleSubmit} />
            </Drawer>
        </>
    )
}

export default OrganisationPage