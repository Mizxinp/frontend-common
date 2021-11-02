import React, { lazy, Suspense } from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import RoutePath from './RoutePath';
import PageContainer from '../components/PageContainer';

const HomePage = lazy(() => import('../pages/home'));

const AppRouter = () => {
  return (
    <BrowserRouter basename="/">
      <PageContainer>
        <Suspense fallback={null}>
          <Switch>
            <Route key={RoutePath.home} path={RoutePath.home} component={HomePage} />
            <Redirect from="/" to={RoutePath.home} />
          </Switch>
        </Suspense>
      </PageContainer>
    </BrowserRouter>
  );
};

export default AppRouter;