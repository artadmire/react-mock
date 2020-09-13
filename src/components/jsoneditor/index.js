import React from 'react';
import JSONEditor from 'jsoneditor';
import 'jsoneditor/dist/jsoneditor.css';
import './index.less';

export default class JSONEditorDemo extends React.PureComponent {
  state = {};

  componentDidMount() {
    const options = {
      mode: 'code',
      modes: ['code', 'tree'],
      onChange: () => {
        const { state = {} } = this;
        const { onChange } = this.props;
        const { value } = state;
        const nvalue = this.jsoneditor.getText();
        if (onChange) {
          onChange(nvalue, value);
        }
      },
    };
    const { value = {} } = this.state;
    this.jsoneditor = new JSONEditor(this.container, options);
    this.jsoneditor.set(value);
  }

  static getDerivedStateFromProps({ value }) {
    return {
      value,
    };
  }

  componentWillUnmount() {
    if (this.jsoneditor) {
      this.jsoneditor.destroy();
    }
  }

  render() {
    const { height = 200 } = this.props;
    return (
      <div className="jsoneditor-react-container" style={{ height }} ref={(elem) => { this.container = elem; }} />
    );
  }
}
