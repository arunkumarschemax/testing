import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// no lazy loading for auth pages to avoid flickering
const AuthLayout = React.lazy(() => import('../common/component-lib/layouts/AuthLayout/AuthLayout'));
import LoginPage from '../common/pages/LoginPage';
import SignUpPage from '../common/pages/SignUpPage';
// import AttributeForm from './attribute/attributeform';
import ForgotPasswordPage from '../common/pages/ForgotPasswordPage';
import SecurityCodePage from '../common/pages/SecurityCodePage';
import NewPasswordPage from '../common/pages/NewPasswordPage';
import LockPage from '../common/pages/LockPage';

import MainLayout from '../common/component-lib/layouts/main/MainLayout/MainLayout';
import ProfileLayout from '../common/component-lib/layouts/profile/ProfileLayout';
import RequireAuth from '../router/RequireAuth';
import { withLoading } from '../common/hocs/withLoading.hoc';

const NewsFeedPage = React.lazy(() => import('../common/pages/NewsFeedPage'));
const ServerErrorPage = React.lazy(() => import('../common/pages/ServerErrorPage'));
const Error404Page = React.lazy(() => import('../common/pages/Error404Page'));
const PersonalInfoPage = React.lazy(() => import('../common/pages/PersonalInfoPage'));
const SecuritySettingsPage = React.lazy(() => import('../common/pages/SecuritySettingsPage'));
const NotificationsPage = React.lazy(() => import('../common/pages/NotificationsPage'));
const Logout = React.lazy(() => import('./Logout'));

export const NFT_DASHBOARD_PATH = '/';
export const MEDICAL_DASHBOARD_PATH = '/medical-dashboard';

const NewsFeed = withLoading(NewsFeedPage);
const ServerError = withLoading(ServerErrorPage);
const Error404 = withLoading(Error404Page);

// Profile
const PersonalInfo = withLoading(PersonalInfoPage);
const SecuritySettings = withLoading(SecuritySettingsPage);
const Notifications = withLoading(NotificationsPage);

const AuthLayoutFallback = withLoading(AuthLayout);
const LogoutFallback = withLoading(Logout);

export const AppRouter: React.FC = () => {
  const protectedLayout = (
    <RequireAuth>
      <MainLayout />
    </RequireAuth>
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route path={NFT_DASHBOARD_PATH} element={protectedLayout}>
          <Route path="apps">
            <Route path="feed" element={<NewsFeed />} />
          </Route>       
          <Route path="server-error" element={<ServerError />} />
          <Route path="404" element={<Error404 />} />
          <Route path="profile" element={<ProfileLayout />}>
            <Route path="personal-info" element={<PersonalInfo />} />
            <Route path="security-settings" element={<SecuritySettings />} />
            <Route path="notifications" element={<Notifications />} />

          </Route>
         
        </Route>
        <Route path="/auth" element={<AuthLayoutFallback />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="sign-up" element={<SignUpPage />} />
          <Route
            path="lock"
            element={
              <RequireAuth>
                <LockPage />
              </RequireAuth>
            }
          />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="security-code" element={<SecurityCodePage />} />
          <Route path="new-password" element={<NewPasswordPage />} />
        </Route>
        <Route path="/logout" element={<LogoutFallback />} />
      
      </Routes>
     
    </BrowserRouter>
  );
};
