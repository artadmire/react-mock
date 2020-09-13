import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Home from './home/index';
import Editor from './editor/index';
import { reqApiData } from '../../utils/req';

export class Manager extends React.PureComponent {
  // eslint-disable-next-line class-methods-use-this
  componentDidMount() {
    reqApiData();
  }

  render() {
    const { match, apis } = this.props;
    return (
      <Switch>
        <Route exact path={`${match.url}`} component={() => <Home match={match} />} />
        <Route
          exact
          path={`${match.url}/creator`}
          component={() => <Editor formData={{ type: 'HTTP', method: 'GET' }} />}
        />
        <Route
          path={`${match.url}/:id`}
          component={({ match: _match }) => {
            const { params } = _match;
            const { id } = params;
            const [tc, ...rest] = apis.filter(t => t.id === id);
            if (tc && rest.length === 0) {
              return <Editor formData={tc} />;
            }
            return null;
          }}
        />

      </Switch>
    );
  }
}

export default withRouter(connect((state) => {
  const { apis } = state;
  return { apis };
})(Manager));
