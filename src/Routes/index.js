import Home from '../Pages/Home';
import Activity from '../Pages/Activity';
import Profile from '../Pages/Profile';
import Login from '../Pages/Login';
import ForgotPw from '../Pages/ForgotPw';
import Register from '../Pages/Register';
import Recipe from '../Pages/Recipe';
import config from '../config';
import HeaderOnlyLayout from '../layout/HeaderOnlyLayout';

export const publicRoutes = [
    { path: config.routes.dairy, component: Home },
    { path: config.routes.activity, component: Activity },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.recipe, component: Recipe },
    { path: config.routes.login, component: Login, layout: null },
    { path: config.routes.forgot, component: ForgotPw, layout: null },
    { path: config.routes.register, component: Register, layout: null },
];
export const privateRoutes = [];
