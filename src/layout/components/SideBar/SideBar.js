import styles from './SideBar.module.scss';
import classNames from 'classnames/bind';
import Menu from './Menu';
import MenuItem from './Menu/MenuItem';
import config from '../../../config';

import { JumpRopeIcon, RecipeIcon, HomeActiveIcon, UserGroupActiveIcon } from '../../../components/Icons/Icons';
import { IoLogOut } from 'react-icons/io5';
import { FaRegUserCircle } from 'react-icons/fa';
const cx = classNames.bind(styles);
function SideBar() {
    return (
        <aside className={cx('wrapper')}>
            <Menu>
                <MenuItem
                    title="Home"
                    to={config.routes.dairy}
                    icon={<HomeActiveIcon height="2.4rem" width="2.4rem" />}
                    activeIcon={<HomeActiveIcon height="2.4rem" width="2.4rem" />}
                />
                <MenuItem
                    title="Exercise"
                    to={config.routes.exercise}
                    icon={<JumpRopeIcon />}
                    activeIcon={<JumpRopeIcon />}
                />
                <MenuItem title="Recipe" to={config.routes.recipe} icon={<RecipeIcon />} activeIcon={<RecipeIcon />} />
                <MenuItem
                    title="Account"
                    to={config.routes.profile}
                    icon={<FaRegUserCircle />}
                    activeIcon={<FaRegUserCircle />}
                />
                <MenuItem
                    title="HWNet"
                    to={config.routes.HWNet}
                    icon={<UserGroupActiveIcon />}
                    activeIcon={<UserGroupActiveIcon />}
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
