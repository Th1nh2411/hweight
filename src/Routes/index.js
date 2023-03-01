import Home from '../Pages/Home';
import Following from '../Pages/Following';
import Profile from '../Pages/Profile';
import Upload from '../Pages/Upload';
import UploadLayout from '../layout/UploadLayout';
import config from '../config';

export const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.following, component: Following },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.upload, component: Upload, layout: UploadLayout },
];
export const privateRoutes = [];
