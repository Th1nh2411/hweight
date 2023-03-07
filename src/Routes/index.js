import Home from '../Pages/Home';
import Following from '../Pages/Following';
import Profile from '../Pages/Profile';
import config from '../config';
import Login from '../Pages/Login';
import HeaderOnlyLayout from '../layout/HeaderOnlyLayout';

export const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.following, component: Following },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.login, component: Login, layout: null },
];
export const privateRoutes = [];
