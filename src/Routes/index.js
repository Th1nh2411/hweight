import Home from '../Pages/Home';
import Following from '../Pages/Following';
import Profile from '../Pages/Profile';
import Upload from '../Pages/Upload';
import UploadLayout from '../components/Layout/UploadLayout';

export const publicRoutes = [
    { path: '/', component: Home },
    { path: '/following', component: Following },
    { path: '/profile', component: Profile, layout: null },
    { path: '/upload', component: Upload, layout: UploadLayout },
];
export const privateRoutes = [];
