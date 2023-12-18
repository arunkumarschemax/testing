import { Button, Card, Col, Drawer, Row, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { UnitForm } from './unit-form'
import { GetAllUnitDto, OrganizationReqDto } from '@finestchoicex-iam/shared-models'
import { UnitGrid } from './unit-grid'
import { OrganizationService, UnitsService } from '@finestchoicex-iam/shared-services'
import { useAuthState } from '../../common/auth-context'

export const UnitPage = () => {
  const [initialValues, setInitialValues] = useState<GetAllUnitDto>();
  const [showForm, setShowForm] = useState(false);
  const [unitsData, setUnitsData] = useState<GetAllUnitDto[]>([]);
  const [dummyRefresh, setDummyRefresh] = useState<number>(0)
  const [selectedUnits, setSelectedUnits] = useState<number>();

  const [clients, setClients] = useState<any[]>([]);

  const { Option } = Select;
  const { authContext } = useAuthState();
  const orgService = new OrganizationService();
  const unitsService = new UnitsService();

  useEffect(() => {
    getAllClients();
  }, []);

  const getUnitsByClientId = (orgIdReq: OrganizationReqDto) => {
    unitsService.getUnitsByOrgId(orgIdReq).then((res) => {
      if (res.status) {
        setUnitsData(res.data)
      } else {
        setUnitsData([]);
      }
    }).catch(err => {
      console.log(err.message, 'error message')
    })
  }
  const createButtonHandler = () => {
    setShowForm(true);
    setDummyRefresh(prev => prev + 1);
  }

  const closeButtonHandler = () => {
    setShowForm(false);
    setDummyRefresh(prev => prev + 1);
  }
  const getAllClients = () => {
    orgService.getAllOrganizationsDropdown().then((res) => {
      if (res.status) {
        setClients(res.data)
      } else {
        setClients([])
      }
    }).catch(err => {
      console.log(err.message, 'error message')
    })
  }
  const onClientsChange = (orgId: number) => {
    setSelectedUnits(orgId);
    const orgIdReq: OrganizationReqDto = new OrganizationReqDto(authContext.user.userName, authContext.user.id, orgId)
    getUnitsByClientId(orgIdReq)
  }
  const getTitle = () => {
    return <>
      <Row>
        <Col><h3>Units</h3></Col>
        <Col offset={2} span={5}>
          <label>Clients:&nbsp;</label>
          <Select onChange={onClientsChange} style={{ width: '100%' }} placeholder='Please Select client'>
            {clients.map(rec => {
              return <Option value={rec.organizationId}>{rec.name}</Option>
            })}
          </Select>
        </Col>
      </Row>
    </>
  }
  return (
    <>
      <Card title={getTitle()} extra={selectedUnits && <Button onClick={createButtonHandler} type='primary'>Create</Button>}>
        {selectedUnits && <>
          <UnitGrid unitData={unitsData} getUnitsByClientId={getUnitsByClientId} selectedUnits={selectedUnits} setInitialValues={setInitialValues} createButtonHandler={createButtonHandler} />
          <Drawer
            title={'Scope'}
            open={showForm}
            onClose={closeButtonHandler}
            width='50%'
            key={dummyRefresh}
          >
            <UnitForm key={dummyRefresh} closeButtonHandler={closeButtonHandler} initialValues={initialValues} getUnitsByClientId={getUnitsByClientId} selectedUnits={selectedUnits} />
          </Drawer>
        </>}
      </Card>
    </>
  )
}

export default UnitPage;