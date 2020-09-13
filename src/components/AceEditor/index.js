import React from 'react';
import AceEditor from 'react-ace';
import 'brace/mode/javascript';


class AceEditorWrapper extends React.PureComponent {
  render() {
    const options = {
      onChange: (newValue) => {
        const { onChange } = this.props;
        if (onChange) {
          onChange(newValue);
        }
      },
    };

    const { value, width } = this.props;
    return (
      <AceEditor
        mode="javascript"
        value={value}
        {...options}
        name="UNIQUE_ID_OF_DIV"
        editorProps={{ $blockScrolling: false }}
        style={{ width: `${width}`, height: '300px', border: '1px solid' }}
      />
    );
  }
}
export default AceEditorWrapper;
