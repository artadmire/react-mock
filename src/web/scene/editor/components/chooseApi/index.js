import React, { PureComponent } from 'react';
import './index.less';
import {
  Button, Tag, Table,
} from 'antd';
import { connect } from 'react-redux';

const apiColumns = [
  {
    title: 'id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'URL',
    dataIndex: 'url',
    key: 'url',
    render: text => <a>{text}</a>,
  },
  {
    title: '备注',
    dataIndex: 'remarks',
    key: 'remarks',
  },
  {
    title: '请求类型',
    dataIndex: 'type',
    key: 'type',
    render: (type = '') => {
      switch (type) {
        case 'HTTP':
          return (
            <Tag color="orange">HTTP</Tag>
          );
        case 'RPC':
          return (
            <Tag color="purple">RPC</Tag>
          );
        default:
          return (
            <Tag color="orange">HTTP</Tag>
          );
      }
    },
  },
  {
    title: '请求方法',
    key: 'method',
    dataIndex: 'method',
    render: (method = '') => {
      switch (method) {
        case 'GET':
          return (
            <Tag color="orange">GET</Tag>
          );
        case 'POST':
          return (
            <Tag color="purple">POST</Tag>
          );
        default:
          return (
            ''
          );
      }
    },
  },
];

class ChooseApi extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedRows: [],
      selectedRowKeys: [],
    };
  }

  componentDidMount() {
    const { formData: { apiList = [] } } = this.props;
    const selectedRowKeys = (apiList && apiList.map(({ id }) => (id))) || [];
    this.setState({ selectedRowKeys, selectedRows: [...apiList] });
  }

  rowSelection = () => {
    const { selectedRowKeys: rowKeys } = this.state;
    return {
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({ selectedRows, selectedRowKeys });
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      selectedRowKeys: rowKeys,
    };
  }

  renderChooseApi = () => {
    const { apis } = this.props;
    return (
      <Table
        columns={apiColumns}
        dataSource={apis}
        rowSelection={{
          ...this.rowSelection(),
        }}
        rowKey="id"
      />

    );
  }


  render() {
    const { onUpStep } = this.props;
    const { selectedRows = [] } = this.state;
    return (
      <div className="web-content">
        {this.renderChooseApi()}
        <Button
          type="primary"
          onClick={() => {
            if (onUpStep) onUpStep();
          }}
        >
          上一步

        </Button>
        <Button
          className="nextStep"
          type="primary"
          onClick={() => {
            const { updateScenesData, id } = this.props;
            updateScenesData({ id, apiList: selectedRows });
          }}
        >
          下一步
        </Button>
      </div>
    );
  }
}

export default connect(({ apis }) => ({ apis }))(ChooseApi);
