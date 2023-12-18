

import React, { useState } from 'react';
import { Form, Button, Input, Row, Col, message, Card } from 'antd';
// import axios from "axios";
// import { useNavigate } from 'react-router-dom';



export const UnitForm = () => {
  const [form6] = Form.useForm();
  // const navigate = useNavigate();
  // const [data, setData] = useState<any>([]);

  const onFinish = (values: any) => { 
    console.log({ values }, "values");
  //   axios.post("http://localhost:5000/unitdata/postdata", {
  //     name: values.name, 
  //     description: values.description,

  //   })   
  //     .then((res) => {
  //       console.log(res, "response")
  //       if (res.data !== false) {
  //         navigate('/navpage/form6')
  //         setTimeout(() => {
  //           message.success("submitted successfully");
  //         }, 1000);


         
  //       }
  //       else {
  //         message.error("Name already existed")
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error.response);
  //       alert(error.response);
  //     });
   }
  // const clickHandler = () => {
  //   axios.get("http://localhost:5000/unitdata/getdata")
  //     .then((res) => {
  //       if (res) {
  //         console.log(res);
  //         setData(res);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error.response);
  //       alert(error.response);
  //     })
  //   console.log(data)
  // }

 
  const handleReset = () => {
    form6.resetFields()
  };



  return (
    <div>
      <Card type="inner" title="Unit Form"
        extra={<Button href="/navpage/grid4" >Grid</Button>}
        headStyle={{ backgroundColor: '#1890ff', color: 'white' }}>
        <Form style={{ background: 'transparent', backgroundColor: 'Lightyellow', borderRadius: '30px' }}
          id="form6"
          layout='vertical'
          onFinish={onFinish}
          onFinishFailed={(error) => {
            console.log({ error });
          }}
          form={form6}
        >
          <Row justify="space-around">
            <Col span={6}>
              <Form.Item 
                name="name"
                label="Name"
                rules={[
                  { required: true, message: "Please enter your name" },
                  { whitespace: true },
                  { min: 3 },
                  {
                    pattern: new RegExp(/^[a-zA-Z ]+$/),
                    message: "Name should contain only letters"
                  },
                ]}
                hasFeedback
              >
                <Input placeholder="Type your name" />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  { required: true, message: "Please enter your email" },
                  
                ]}
                hasFeedback
              >
                <Input placeholder="Type your description" />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item
                name="organisation_id"
                label="Organisation Id"
                rules={[
                  { required: true, message: "Please enter your Organisation Id" },
                  
                ]}
                hasFeedback
              >
                <Input placeholder="Type your Organisation Id" />
              </Form.Item>
            </Col>
</Row>
              
           

          <Row justify={'space-around'} >
            <Form.Item style={{ textAlign: 'center' }} >
              <Button htmlType="reset" onClick={() => {
                handleReset();
              }}>
                Reset
              </Button>
            </Form.Item>





            <Col span={24}>
              <Form.Item style={{ textAlign: "center" }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Col>
          </Row>


        </Form>
      </Card>

    </div>
  )
}

export default UnitForm;