import React from 'react';
import {
  Button, message, Input, Modal,
} from 'antd';
import { ExclamationCircleOutlined, SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import Axios from '@/utils/request';
import { Rpath } from '@/utils/host';
import store, { ActionMap } from '../../store';

const { confirm: ModalConfirm } = Modal;

function TableHOC(WrapComponent) {
  class TableHOCComponent extends WrapComponent {
    constructor(props) {
      super(props);
      this.state = {
        // 删除后的列表
        dataSource: [],
        disabledBtn: true,
        // 选中的列表
        deleteArr: [],
        searchText: '',
      };
    }

    rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        if (selectedRowKeys.length) {
          this.setState({ disabledBtn: false, deleteArr: [...selectedRows] });
          store.dispatch(ActionMap.selectedApi(selectedRows));
        } else {
          this.setState({ disabledBtn: true });
        }
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
    };


    handleSearch = (selectedKeys, confirm) => {
      confirm();
      this.setState({ searchText: selectedKeys[0] });
    };

   handleReset = (clearFilters) => {
     clearFilters();
     this.setState({ searchText: '' });
   };

    onDelete = () => {
      const { deleteArr, dataSource } = this.state;
      Axios.delete(Rpath('api'), deleteArr).then((res) => {
        const { data } = res;
        data.forEach((item) => {
          if (item.success) {
            message.success('删除成功');
            this.setState({ dataSource: [...dataSource.filter(i => `${i.url}-${i.method}` !== `${item.url}-${item.method}`)] });
          } else { message.success(`${item.errMsg}`); }
        });
      }, res => message.error(`删除失败!${JSON.stringify(res)}`).then(() => Promise.reject(res)));
    };

    getColumnSearchProps = dataIndex => ({
      filterDropdown: ({
        setSelectedKeys, selectedKeys, confirm, clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            ref={(node) => {
              this.searchInput = node;
            }}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >
            Search
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </div>
      ),
      filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
      onFilter: (value, record) => record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => this.searchInput.select());
        }
      },
      render: text => (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          // eslint-disable-next-line react/destructuring-assignment
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text && text.toString()}
        />
      ),
    });


    showConfirm = () => {
      ModalConfirm({
        title: '确定要删除吗?',
        icon: <ExclamationCircleOutlined />,
        onOk: () => {
          this.onDelete();
        },
      });
    };
  }

  return TableHOCComponent;
}


export default TableHOC;
