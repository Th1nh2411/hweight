import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { privateRoutes, publicRoutes } from './Routes';
import DefaultLayout from './layout/DefaultLayout';
import { Fragment, useEffect } from 'react';
import config from './config';
import dayjs from 'dayjs';

function App() {
    const titles = {
        [config.routes.login]: 'HWeight - Login',
        [config.routes.register]: 'HWeight - Register',
        [config.routes.forgot]: 'HWeight - Forgot Password',
        [config.routes.profile]: 'HWeight - Profile',
        [config.routes.HWNet]: 'HWeight - HWNet',
    };
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        const expireDate = dayjs(localStorage.getItem('expireDate'));
        if (dayjs().isAfter(expireDate)) {
            localStorage.clear();
            alert('The login session has expired. Please log in again.');
            navigate(config.routes.login);
        }
        localStorage.getItem('token');
        document.title = titles[location.pathname] ?? 'HWeight';
    }, [location]);

    return (
        <div className="App">
            <Routes>
                {privateRoutes.map((route, index) => {
                    let Layout = DefaultLayout;
                    if (route.layout) {
                        Layout = route.layout;
                    } else if (route.layout === null) {
                        Layout = Fragment;
                    }
                    const Element = route.component;
                    return (
                        <Route
                            exact
                            key={index}
                            path={route.path}
                            element={
                                localStorage.getItem('token') ? (
                                    <Layout>
                                        <Element />
                                    </Layout>
                                ) : (
                                    <Navigate to={config.routes.login} replace />
                                )
                            }
                        />
                    );
                })}
                {publicRoutes.map((route, index) => {
                    let Layout = DefaultLayout;
                    if (route.layout) {
                        Layout = route.layout;
                    } else if (route.layout === null) {
                        Layout = Fragment;
                    }
                    const Element = route.component;
                    return (
                        <Route
                            exact
                            key={index}
                            path={route.path}
                            element={
                                <Layout>
                                    <Element />
                                </Layout>
                            }
                        />
                    );
                })}
            </Routes>
        </div>
    );
}

export default App;
