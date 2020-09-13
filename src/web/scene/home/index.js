import React, { PureComponent } from 'react';
import {
  Button, Table,
} from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { PlusOutlined } from '@ant-design/icons';
import TableHOC from '../../../components/TableHOC';
import { reqSceneData } from '../../../utils/req';
import './index.less';

class Scenes extends PureComponent {
  // eslint-disable-next-line class-methods-use-this
  render() {
    const { disabledBtn } = this.state;
    const { scenes = [], match } = this.props;
    const testScenesColumns = [
      {
        title: '场景名称',
        dataIndex: 'sceneName',
        key: 'sceneName',
      },
      {
        title: '备注',
        dataIndex: 'remarks',
        key: 'remarks',
      },
      {
        title: '对应接口',
        dataIndex: 'urlList',
        key: 'urlList',
      },
      {
        title: '所属页面',
        dataIndex: 'page',
        key: 'page',
        width: '200px',
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
              创建新的测试场景
            </Button>
          </Link>
          <Button
            type="primary"
            onClick={() => {
              reqSceneData();
            }}
          >
            刷新
          </Button>
        </header>
        <Table
          columns={testScenesColumns}
          dataSource={scenes}
          rowSelection={{
            ...this.rowSelection,
          }}
        />
      </div>
    );
  }
}

export default connect(({ scenes }) => ({ scenes }))(TableHOC(Scenes));
