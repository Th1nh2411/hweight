import { Navigate, Route, Routes } from 'react-router-dom';
import { privateRoutes, publicRoutes } from './Routes';
import DefaultLayout from './layout/DefaultLayout';
import { Fragment, useEffect, useState } from 'react';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import config from './config';
function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem('token') || false);
    // const isAuthenticated = localStorage.getItem('token') || false;
    console.log(isAuthenticated);
    const setAuth = (value) => {
        setIsAuthenticated(value);
        //alert(value);
    };

    useEffect(() => {
        localStorage.setItem('token', JSON.stringify(isAuthenticated));
    }, [isAuthenticated]);
    return (
        <div className="App">
            <Routes>
                <Route path={config.routes.login} element={<Login setAuth={setAuth} />} />
                <Route path={config.routes.register} element={<Register setAuth={setAuth} />} />
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
                                isAuthenticated ? (
                                    <Layout>
                                        <Element />
                                    </Layout>
                                ) : (
                                    <Navigate to="/login" replace />
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
