import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Home from './home/index';
import Editor from './editor/index';
import { reqSceneData, reqApiData, reqRuleData } from '../../utils/req';

export class Manager extends React.PureComponent {
  // eslint-disable-next-line class-methods-use-this
  componentDidMount() {
    reqSceneData();
    reqApiData();
    reqRuleData();
  }

  render() {
    const { match, scenes } = this.props;
    return (
      <Switch>
        <Route exact path={`${match.url}`} component={() => <Home match={match} />} />
        <Route
          exact
          path={`${match.url}/creator`}
          component={() => (
            <Editor
              formData={{
                sceneName: '', remarks: '', page: '', apiList: [],
              }}
              match={match}
            />
          )}
        />
        <Route
          path={`${match.url}/:id`}
          component={({ match: _match }) => {
            const { params } = _match;
            const { id } = params;
            const [tc, ...rest] = scenes.filter(t => t.id === id);
            if (tc && rest.length === 0) {
              return <Editor formData={tc} id={id} match={match} />;
            }
            return null;
          }}
        />

      </Switch>
    );
  }
}

export default withRouter(connect(({ scenes }) => ({ scenes }))(Manager));
