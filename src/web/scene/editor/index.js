import React, { useState } from 'react';
import './index.less';
import {
  Steps,
} from 'antd';
import SceneName from './components/sceneName';
import ChooseApi from './components/chooseApi';
import ChooseDataRule from './components/chooseDataRule';
import Axios from '../../../utils/request';

const { Step } = Steps;


function Editor(props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sceneInfo, setSceneInfo] = useState({});
  const { id, formData, match } = props;
  const onNextStep = () => {
    setCurrentIndex(currentIndex + 1);
  };

  const onUpStep = () => {
    setCurrentIndex(currentIndex - 1);
  };

  const updateScenesData = async (data) => {
    const res = await Axios.post('scenes', data);
    if (!res || res.succuss || !res.data) return;
    if (!id) setSceneInfo({ ...sceneInfo, ...data, id: res.data.id });
    else setSceneInfo({ ...sceneInfo, ...data });
    onNextStep();
    // 创建场景
  };


  const renderContent = () => {
    switch (currentIndex) {
      case 0:
        return (
          <SceneName
            id={id}
            formData={{ ...formData, ...sceneInfo }}
            onUpStep={onUpStep}
            updateScenesData={updateScenesData}
            match={match}

          />
        );
      case 1:
        return (
          <ChooseApi
            formData={{ ...formData, ...sceneInfo }}
            id={id}
            onUpStep={onUpStep}
            updateScenesData={updateScenesData}

          />
        );
      case 2:
        return (
          <ChooseDataRule
            id={id}
            onUpStep={onUpStep}
            formData={{ ...formData, ...sceneInfo }}
            updateScenesData={updateScenesData}
          />
        );
      default:
        throw new Error(`illegal step index ${currentIndex}`);
    }
  };

  const renderStep = () => (
    <Steps current={currentIndex}>
      <Step title="场景信息" />
      <Step title="选择场景涉及包含的api" />
      <Step title="配置数据规则" />
    </Steps>
  );
  return (
    <div className="web-content">
      {renderStep()}
      {renderContent()}
    </div>
  );
}

export default Editor;
