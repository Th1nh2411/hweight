import styles from './SideBar.module.scss';
import classNames from 'classnames/bind';
import Menu from './Menu';
import MenuItem from './Menu/MenuItem';
import config from '../../../config';

import { JumpRopeIcon, DairyIcon, RecipeIcon } from '../../../components/Icons/Icons';
import AccountList from '../../../components/AccountList';
import { useEffect, useState } from 'react';
import { RiUserFill } from 'react-icons/ri';
import { IoLogOut } from 'react-icons/io5';

const cx = classNames.bind(styles);
function SideBar() {
    useEffect(() => {
        const fetchApi = async () => {};
        fetchApi();
    }, []);
    return (
        <aside className={cx('wrapper')}>
            <Menu>
                <MenuItem title="Dairy" to={config.routes.dairy} icon={<DairyIcon />} activeIcon={<DairyIcon />} />
                <MenuItem
                    title="Activity"
                    to={config.routes.activity}
                    icon={<JumpRopeIcon />}
                    activeIcon={<JumpRopeIcon />}
                />
                <MenuItem title="Recipe" to={config.routes.recipe} icon={<RecipeIcon />} activeIcon={<RecipeIcon />} />
                <MenuItem
                    title="Account"
                    to={config.routes.profile}
                    icon={<RiUserFill />}
                    activeIcon={<RiUserFill />}
                />
                <MenuItem
                    separate
                    title="Log Out"
                    to={config.routes.login}
                    icon={<IoLogOut />}
                    activeIcon={<IoLogOut />}
                />
            </Menu>
        </aside>
    );
}

export default SideBar;
