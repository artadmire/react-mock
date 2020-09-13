import React, { useState } from 'react';
import './index.less';
import {
  Button, Form, Input, Select, Menu, Tag,
} from 'antd';
import Axios from '@/utils/request';
import { Rpath } from '@/utils/host';

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 4,
    span: 16,
  },
};

function ChooseDataRule(props) {
  const [form] = Form.useForm();
  const [index, setIndex] = useState(0);
  const onFinish = (values) => {
    console.log(values);
    const { onNextStep, id } = props;
    if (onNextStep) onNextStep();
    Axios.post(Rpath('scene'), { id, ...values });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const renderMenu = () => {
    const { formData: { apiList = [] } } = props;
    return (
      <Menu
        onClick={({ item }) => { setIndex(item.props.index); }}
        style={{ width: 256 }}
        defaultSelectedKeys={apiList.length ? [apiList[0].id] : []}
        mode="inline"
      >
        {apiList.map(item => (
          <Menu.Item key={item.id}>
            <span>{item.url}</span>
            {item.method === 'GET' ? <Tag color="orange">GET</Tag> : <Tag color="purple">POST</Tag>}
          </Menu.Item>
        ))}
      </Menu>
    );
  };
  const renderChooseDataRule = () => {
    const { formData } = props;
    return (
      <Form
        form={form}
        {...layout}
        name="choseDataRule"
        initialValues={formData}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="场景名称"
          name="sceneName"
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          label="场景备注"
          name="remarks"
        >
          <Input disabled />
        </Form.Item>
        {

        }
        <Form.Item
          label="url"
          name={['apiList', index, 'url']}
        >
          <Input disabled />
        </Form.Item>

        <Form.Item
          label="数据规则"
          name="rule"
        >
          <Select>
            <Select.Option key="1">测试用例</Select.Option>
            <Select.Option key="2">执行函数</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="结果预览"
          name="rule"
        >
          <pre>{}</pre>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <div>
            <Button
              type="primary"
              onClick={() => {
                const { onUpStep } = props;
                if (onUpStep) onUpStep();
              }}
            >
              上一步

            </Button>
            <Button className="nextStep" type="primary" htmlType="submit">完成</Button>
          </div>
        </Form.Item>
      </Form>

    );
  };

  return (
    <div className="choose-data-rule">
      {renderMenu()}
      {renderChooseDataRule()}
    </div>
  );
}

export default ChooseDataRule;
