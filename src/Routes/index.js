import Home from '../Pages/Home';
import Exercise from '../Pages/Exercise';
import Profile from '../Pages/Profile';
import Login from '../Pages/Login';
import ForgotPw from '../Pages/ForgotPw';
import Register from '../Pages/Register';
import Recipe from '../Pages/Recipe';
import config from '../config';
import HeaderOnlyLayout from '../layout/HeaderOnlyLayout';
import HWNet from '../Pages/HWNet/HWNet';

export const publicRoutes = [
    // { path: config.routes.login, component: Login, layout: null },
    // { path: config.routes.register, component: Register, layout: null },
    { path: config.routes.forgot, component: ForgotPw, layout: null },
];
export const privateRoutes = [
    { path: config.routes.dairy, component: Home },
    { path: config.routes.exercise, component: Exercise },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.recipe, component: Recipe },
    { path: config.routes.HWNet, component: HWNet },
    // { path: config.routes.login, component: Login, layout: null },
];
