import React, { PureComponent } from 'react';
import {
  Button, Table, Tag,
} from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import TableHOC from '../../../components/TableHOC';
import { reqApiData } from '../../../utils/req';

class Api extends PureComponent {
  render() {
    const { disabledBtn } = this.state;
    const { apis, match } = this.props;
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
        ...this.getColumnSearchProps('type'),
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
        ...this.getColumnSearchProps('method'),
      },
      {
        title: 'Action',
        key: 'action',
        width: '200px',
        render: (text, record) => (
          <span>
            <Link to={`${match.url}/${record.id}`}>editor</Link>
            <a
              onClick={() => {
                // eslint-disable-next-line react/no-unused-state
                this.setState({ deleteArr: [...record] });
                this.showConfirm();
              }}
              style={{ marginLeft: 16 }}
            >
              {' '}
              Delete

            </a>
          </span>
        ),
      },
    ];
    return (
      <div className="web-content">
        <header>
          <Button type="primary" disabled={disabledBtn} onClick={this.showConfirm}>删除选中项</Button>
          <Link to={`${match.url}/creator`}>
            <Button type="primary" onClick={this.showDrawer}>
              <PlusOutlined />
              {' '}
              创建新的数据规则
            </Button>
          </Link>
          <Button
            type="primary"
            onClick={() => {
              reqApiData();
            }}
          >
            刷新
          </Button>
        </header>
        <Table
          columns={apiColumns}
          dataSource={apis}
          rowSelection={{
            ...this.rowSelection,
          }}
          rowKey="id"
        />
      </div>
    );
  }
}

export default connect(({ apis }) => ({ apis }))(TableHOC(Api));
