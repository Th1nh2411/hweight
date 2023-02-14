import { Link, Route, Routes } from 'react-router-dom';
import { publicRoutes } from './Routes';
import DefaultLayout from './components/Layout/DefautLayout';
import { Fragment } from 'react';
function App() {
    return (
        <div className="App mt-16">
            <Link to="/">Home</Link>
            <Link to="/following">Following</Link>
            <Link to="/profile">Profile</Link>
            <Routes>
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
