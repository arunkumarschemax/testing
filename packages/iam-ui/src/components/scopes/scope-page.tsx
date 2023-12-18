import { Card, Button, Drawer } from 'antd';
import { useEffect, useState } from 'react';
import {  ScopeForm } from './scope-form';
import { ScopeGrid } from './scope-grid';
import { GetAllScopesDto } from 'packages/libs/shared-models/src/scopes/scope.dto';
import { ScopesService } from '@finestchoicex-iam/shared-services';


export const ScopePage = () => {
    const [showForm, setShowForm] = useState(false);
    const [scopeData, setScopeData] = useState<GetAllScopesDto[]>([]);
    const scopesService = new ScopesService();
    const [initialValues, setInitialValues] = useState<GetAllScopesDto>();
    const [dummyRefresh, setDummyRefresh] = useState<number>(0)


    useEffect(() => {
        getAllScopes();
    }, []);

    const getAllScopes = () => {

        scopesService.getAllScopes().then(res => {
            if (res.status && res.data) {
                setScopeData(res.data);
            }
        }).catch(err => console.log(err.message, 'err message'))
        
    }



    // const submitHandler = (req: GetAllScopesDto) => {
    //     closeButtonHandler();
    //     getAllScopes();
    // }

    const createButtonHandler = () => {
        setShowForm(true);
        setDummyRefresh(prev => prev + 1);
    }

    const closeButtonHandler = () => {
        setShowForm(false);
        setDummyRefresh(prev => prev + 1);
    }
    return (
        <>
            <Card title='Scopes' extra={<Button onClick={createButtonHandler} type='primary'>Create</Button>}>
                <ScopeGrid scopeData={scopeData} getAllScopes={getAllScopes}  setInitialValues={setInitialValues} createButtonHandler={createButtonHandler} />
            </Card>
            <Drawer
                title={'Scope'}
                open={showForm}
                onClose={closeButtonHandler}
                width='50%'
                key={dummyRefresh}
            >
                <ScopeForm  key={dummyRefresh} closeButtonHandler={closeButtonHandler} getAllScopes={getAllScopes} initialValues={initialValues} />
            </Drawer>
        </>
    )
}

export default ScopePage