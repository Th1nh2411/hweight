import Home from '../Pages/Home';
import Following from '../Pages/Following';
import Profile from '../Pages/Profile';
import Upload from '../Pages/Upload';
import UploadLayout from '../components/Layout/UploadLayout';
import configRoutes from '../config/routes';

export const publicRoutes = [
    { path: configRoutes.home, component: Home },
    { path: configRoutes.following, component: Following },
    { path: configRoutes.profile, component: Profile },
    { path: configRoutes.upload, component: Upload, layout: UploadLayout },
];
export const privateRoutes = [];
