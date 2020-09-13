import React from 'react';
import ReactDOM from 'react-dom';
import { Alert } from 'antd';
import { Provider } from 'react-redux';
import App from './app';
import store from './store';
import { setHost } from './utils/host';
import { parseQueryString } from './utils';
import './index.less';

location.href = 'index.html?magicServer=http://0.0.0.0:1213#/';
const query = parseQueryString();
const { magicServer } = query;
if (magicServer) {
  setHost(query.magicServer);

  ReactDOM.render(
    <Provider store={store}><App /></Provider>,
    document.getElementById('root'),
  );
} else {
  ReactDOM.render(
    <section>
      <Alert
        type="error"
        message="缺少MagicServer信息"
        description="请输入MagicServer地址yes"
      />
    </section>,
    document.getElementById('root'),
  );
}
