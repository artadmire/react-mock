import React, { useState, useEffect } from 'react';
import './index.less';
import { connect } from 'react-redux';
import {
  Button, Form, Input, Select, message,
} from 'antd';
import EditorJSON from '@/components/jsoneditor/index';
import Axios from '@/utils/request';
import AceEditor from '../../../components/AceEditor';

const { Option } = Select;

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

function Editor(props) {
  const [ruleType, setRuleType] = useState('');
  const [form] = Form.useForm();
  const { apis, formData, id = '' } = props;
  useEffect(() => {
    setRuleType(formData.ruleType);
  }, []);

  const onFinish = (values) => {
    console.log(values);
    try {
      if (ruleType === 'mock数据') {
        const { data } = values;
        values.data = JSON.parse(data);
      }
      Axios.post('rules', { id, ...values });
    } catch (e) {
      message.error(`JSON数据有误，请核对！\n${e.message}`);
    }
  };
  const handleChange = (value) => {
    setRuleType(value);
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
          label="目标接口"
          name="url"
          rules={[
            {
              required: true,
              message: '请输入目标接口!',
            },
          ]}
        >
          <Select
            allowClear
            // onSelect={(op, { index }) => {
            //   form.setFields({ api: apis[index] });
            // }}
          >
            {
              apis.map((api, i) => (<Option key={`${api.url}${api.method}`} index={i} value={api.url}>{api.url}</Option>))
            }
          </Select>
        </Form.Item>
        <Form.Item
          label="规则备注"
          name="remarks"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="规则类型"
          name="ruleType"
        >
          <Select
            allowClear
            onChange={handleChange}
          >
            <Option value="mock数据" key="mock">mock数据</Option>
            <Option value="执行函数" key="fun">执行函数</Option>
          </Select>
        </Form.Item>
        {ruleType === 'mock数据' ? (
          <Form.Item
            label="mock数据"
            name="data"
            rules={[
              {
                required: true,
                message: '请输入json形式的数据',

              },
            ]}
          >
            <EditorJSON height={400} />
          </Form.Item>
        ) : (

          <Form.Item
            label="执行函数"
            name="fun"
            rules={[
              {
                required: true,
                message: '请输入可执行的函数',
              },
            ]}
          >
            <AceEditor />
          </Form.Item>
        )}

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default connect(({ apis, testcase }) => ({ apis, testcase }))(Editor);
