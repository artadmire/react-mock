import React from 'react';
import { connect } from 'react-redux';
import './index.less';
import {
  Button, Form, Input, Select,
} from 'antd';
import { postApiData } from '../../../utils/req';

const { Option } = Select;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};


function Editor(props) {
  const [form] = Form.useForm();
  const { formData } = props;
  const onFinish = (values) => {
    postApiData(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className="web-content">
      <Form
        form={form}
        {...layout}
        name="basic"
        initialValues={formData}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="接口url"
          name="url"
          rules={[
            {
              required: true,
              message: 'Please input url!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="接口备注"
          name="remarks"
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="接口类型"
          name="type"
          rules={[
            {
              required: true,
              message: 'Please input type!',
            },
          ]}
        >
          <Select
            allowClear
          >
            <Option value="HTTP">HTTP</Option>
            <Option value="RPC">RPC</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="请求方法"
          name="method"
          rules={[
            {
              required: true,
              message: 'Please input your method!',

            },
          ]}
        >
          <Select
            allowClear
          >
            <Option value="GET">GET</Option>
            <Option value="POST">POST</Option>
          </Select>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default connect(({ apis }) => ({ apis }))(Editor);
