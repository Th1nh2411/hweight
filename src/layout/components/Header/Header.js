import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import images from '../../../assets/images';
import { AiOutlineUser } from 'react-icons/ai';
import { IoLogOutOutline } from 'react-icons/io5';
import Button from '../../../components/Button';
import Menu from '../../../components/Popper/Menu';
import Image from '../../../components/Image';
import Search from '../Search';
import { Link, useNavigate } from 'react-router-dom';
import config from '../../../config';
import { useState } from 'react';
const cx = classNames.bind(styles);

function Header() {
    const navigate = useNavigate();
    const [changeBg, setChangeBg] = useState(false);
    const currentUser = true;
    const USER_MENU = [
        {
            icon: <AiOutlineUser />,
            title: 'View profile',
            to: config.routes.profile,
        },

        {
            icon: <IoLogOutOutline />,
            title: 'Log out',
            separate: true,
            type: 'logout',
        },
    ];

    const handleOnchangeMenu = (menuItem) => {
        switch (menuItem.type) {
            case 'language':
                //change language
                console.log(menuItem);
                break;
            case 'logout':
                navigate(config.routes.login);
                localStorage.removeItem('token');
                break;
            default:
                console.log('default');
        }
    };
    const scrollTrigger = 60;
    window.onscroll = () => {
        if (window.scrollY >= scrollTrigger || window.pageYOffset >= scrollTrigger) {
            setChangeBg(true);
        } else {
            setChangeBg(false);
        }
    };
    return (
        <header className={cx('wrapper', { changeBg })}>
            <div className={cx('inner')}>
                <Link to={config.routes.dairy}>
                    <div className={cx('logo-wrapper')}>
                        <img src={images.logo} className={cx('logo')} alt="logo" />
                    </div>
                </Link>
                {/* Search */}
                <Search />

                {currentUser ? (
                    <div className={cx('actions')}>
                        <div className={cx('welcome-title')}>
                            Hello <span>Thịnh</span>
                        </div>
                        <Menu items={USER_MENU} onChange={handleOnchangeMenu}>
                            <Image className={cx('user-avatar')} alt="Nguyen Van A" />
                        </Menu>
                    </div>
                ) : (
                    <div className={cx('actions')}>
                        <Button className={cx('custom-btn')} target="_blank">
                            Sign In
                        </Button>
                        <Button primary target="_blank">
                            Sign Up
                        </Button>
                    </div>
                )}
            </div>
        </header>
    );
}

export default Header;
