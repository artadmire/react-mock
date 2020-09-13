const ActionMap = {
  /**
   * api接口
   */
  apis: [],
  /**
   * 所有的测试场景
   */
  scenes: [],

  /**
   * 数据切换规则
   */
  rules: [],

  /**
   * 当前的session信息
   */
  sessions: [],
  /**
   * page页信息
   */
  pages: [],

  selectedApi: [],
};

const createAction = type => data => ({
  type,
  payload: data,
});

const initialState = { ...ActionMap };

Object.keys(initialState).forEach((k) => {
  ActionMap[k] = createAction(k);
});

export {
  ActionMap,
  initialState,
  createAction,
};
