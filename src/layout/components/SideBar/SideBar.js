import styles from './SideBar.module.scss';
import classNames from 'classnames/bind';
import Menu from './Menu';
import MenuItem from './Menu/MenuItem';
import config from '../../../config';
import * as suggestServices from '../../../services/suggestService';
import * as followingServices from '../../../services/followingService';

import {
    UserGroupIcon,
    HomeIcon,
    LiveIcon,
    HomeActiveIcon,
    UserGroupActiveIcon,
    LiveActiveIcon,
} from '../../../components/Icons/Icons';
import AccountList from '../../../components/AccountList';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);
function SideBar() {
    const [suggestResult, setSuggestResult] = useState([]);
    const [followingResult, setFollowingResult] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const suggestResults = await suggestServices.suggest();
            const followingResults = await followingServices.following();

            setSuggestResult(suggestResults);
            setFollowingResult(followingResults);
        };
        fetchApi();
    }, []);
    return (
        <aside className={cx('wrapper')}>
            <Menu>
                <MenuItem title="For You" to={config.routes.home} icon={<HomeIcon />} activeIcon={<HomeActiveIcon />} />
                <MenuItem
                    title="Following"
                    to={config.routes.following}
                    icon={<UserGroupIcon />}
                    activeIcon={<UserGroupActiveIcon />}
                />
                <MenuItem title="LIVE" to={config.routes.live} icon={<LiveIcon />} activeIcon={<LiveActiveIcon />} />
            </Menu>
            <AccountList title="Suggested accounts" numShow="5" accountResult={suggestResult} />
            <AccountList title="Following accounts" numShow="7" accountResult={followingResult} />
        </aside>
    );
}

export default SideBar;
