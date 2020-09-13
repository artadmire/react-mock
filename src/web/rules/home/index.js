import React, { PureComponent } from 'react';
import {
  Button, Table,
} from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import JSONTree from 'react-json-tree';
import { PlusOutlined } from '@ant-design/icons';
import TableHOC from '../../../components/TableHOC';
import './index.less';
import { reqRuleData } from '../../../utils/req';

class Rules extends PureComponent {
  render() {
    const { disabledBtn } = this.state;
    const { rules = [], match } = this.props;
    const apiDataRulesColumns = [
      {
        title: '规则Id',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '备注',
        dataIndex: 'remarks',
        key: 'remarks',
      },
      {
        title: '对应接口',
        dataIndex: 'url',
        key: 'url',
      },
      {
        title: '对应数据',
        dataIndex: 'data',
        key: 'data',
        render: (text, record) => {
          const { fun } = record;
          if (!fun) {
            return (
              <JSONTree
                data={record.data}
                shouldExpandNode={() => false}
              />
            );
          }
          return (
            <pre className="fun-show">{record.fun}</pre>
          );
        },
      },
      {
        title: '规则类型',
        dataIndex: 'ruleType',
        key: 'ruleType',
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
              reqRuleData();
            }}
          >
            刷新
          </Button>
        </header>
        <Table
          columns={apiDataRulesColumns}
          dataSource={rules}
          rowSelection={{
            ...this.rowSelection,
          }}
        />
      </div>
    );
  }
}

export default connect(({ rules }) => ({ rules }))(TableHOC(Rules));
