
const requireComponent = require.context('../web', true, /^\.\/([^/]*)\/index\.js$/);
const reg = /([^/]*)\/[^/]*\.js$/;
const routes = requireComponent.keys().map((path = '') => {
  const routerPath = path.match(reg);
  const config = requireComponent(path);
  if (config) {
    return {
      path: routerPath ? `/${routerPath[1]}` : '/',
      component: config.default || config,
    };
  }
  return {};
});

console.log(routes);
export default routes;
