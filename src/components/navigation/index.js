import { Menu } from 'antd';
import React, { useState, useEffect } from 'react';
import {
  NavLink, withRouter,
} from 'react-router-dom';
import { navs } from '@/utils/constant';
import { getPathKey } from '@/utils';


function Navigation(props) {
  const { location } = props;
  const [current, setCount] = useState(getPathKey(location.pathname) || 'home');
  // 相当于 componentDidMount 和 componentDidUpdate:
  // 传递一个空数组相当于componentDidMount
  useEffect(() => {
    const { history } = props;
    history.listen((local) => { // 在这里监听location对象
      const path = getPathKey(local.pathname);
      if (path) setCount(path);
      else setCount('home');
    });
  }, []);

  return (
    <Menu
      selectedKeys={[current]}
      mode="horizontal"
    >
      {
          navs.map(nav => (
            <Menu.Item
              key={nav.path}
              onClick={() => {
                setCount(nav.path);
              }}
            >
              <NavLink
                to={`/${nav.path}`}
              >
                {nav.text}
              </NavLink>
            </Menu.Item>
          ))
        }
    </Menu>
  );
}

export default withRouter(Navigation);
