import React from 'react';
import './index.less';
import {
  Button, Form, Input,
} from 'antd';
import { Link } from 'react-router-dom';
import { reqSceneData } from '../../../../../utils/req';

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


function SceneName(props) {
  const [form] = Form.useForm();
  const { formData, match } = props;

  const onFinish = async (values) => {
    const { updateScenesData, id } = props;
    updateScenesData({ id, ...values });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const renderSceneName = () => (
    <Form
      form={form}
      {...layout}
      name="basic"
      initialValues={formData}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="场景名称"
        name="sceneName"
        rules={[
          {
            required: true,
            message: 'Please input sceneName!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="所属页面"
        name="page"
        rules={[
          {
            required: true,
            message: '请输入所属页面!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="场景备注"
        name="remarks"
        rules={[
          {
            required: false,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <div>
          <Link to={match.url}>
            <Button
              type="primary"
              onClick={() => { reqSceneData(); }}
            >
              返回
            </Button>

          </Link>

          <Button className="nextStep" type="primary" htmlType="submit">下一步</Button>
        </div>
      </Form.Item>
    </Form>
  );

  return (
    <div className="web-content">
      {renderSceneName()}
    </div>
  );
}

export default SceneName;
