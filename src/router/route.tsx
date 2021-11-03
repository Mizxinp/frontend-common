import React, { lazy, Suspense } from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import RoutePath from './RoutePath';
import PageContainer from '../components/PageContainer';


const HomePage = lazy(() => import('../pages/home'));
const OtherPage = lazy(() => import('../pages/other'));

const AppRouter = () => {
  return (
    <BrowserRouter basename="/">
      <PageContainer>
        <Suspense fallback={null}>
          <Switch>
            <Route exact key={RoutePath.home} path={RoutePath.home} component={HomePage} />
            <Route exact key={RoutePath.other} path={RoutePath.other} component={OtherPage} />
            <Redirect from="/" to={RoutePath.home} />
          </Switch>
        </Suspense>
      </PageContainer>
    </BrowserRouter>
  );
};

export default AppRouter;