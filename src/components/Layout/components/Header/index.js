import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import images from '../../../../assets/images';
import {
    AiOutlineCloudUpload,
    AiOutlineDollarCircle,
    AiOutlineMessage,
    AiOutlinePlus,
    AiOutlineQuestionCircle,
    AiOutlineUser,
} from 'react-icons/ai';
import {
    IoEarthOutline,
    IoEllipsisVerticalSharp,
    IoLogOutOutline,
    IoPaperPlaneOutline,
    IoSettingsOutline,
} from 'react-icons/io5';
import { CgKeyboard } from 'react-icons/cg';
import Tippy from '@tippyjs/react';
import Button from '../../../Button';
import Menu from '../../../Popper/Menu';
import Image from '../../../Image';
import Search from '../Search';
import { Link } from 'react-router-dom';
import configRoutes from '../../../../config/routes';
const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: <IoEarthOutline />,
        title: 'English',
        children: {
            title: 'Languages',
            data: [
                { type: 'language', code: 'vi', title: 'English' },
                { type: 'language', code: 'en', title: 'Tiếng Việt' },
                { type: 'language', code: 'ja', title: 'Japanese' },
            ],
        },
    },
    {
        icon: <AiOutlineQuestionCircle />,
        title: 'Feedback and help',
        to: '/feedback',
    },
    { type: 'shortcuts', icon: <CgKeyboard />, title: 'Keyboard shortcuts' },
];
function Header() {
    const currentUser = true;
    const USER_MENU = [
        {
            icon: <AiOutlineUser />,
            title: 'View profile',
            to: configRoutes.profile,
        },
        {
            icon: <AiOutlineDollarCircle />,
            title: 'Get coins',
            to: '/coin',
        },
        {
            icon: <IoSettingsOutline />,
            title: 'Settings',
            to: '/settings',
        },
        ,
        ...MENU_ITEMS,
        {
            icon: <IoLogOutOutline />,
            title: 'Log out',
            to: '/logout',
            separate: true,
        },
    ];

    const handleOnchangeMenu = (menuItem) => {
        switch (menuItem.type) {
            case 'language':
                //change language
                console.log(menuItem);
        }
    };
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to={configRoutes.home}>
                    <div className={cx('logo-wrapper')}>
                        <img src={images.logo} alt="tiktok" />
                    </div>
                </Link>
                {/* Search */}
                <Search />
                <div className={cx('actions')}>
                    {currentUser ? (
                        <>
                            <Tippy duration={[100, 100]} interactive content="Upload" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <AiOutlineCloudUpload />
                                </button>
                            </Tippy>
                            <Tippy duration={[100, 100]} interactive content="Tin nhắn" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <IoPaperPlaneOutline />
                                </button>
                            </Tippy>

                            <Tippy
                                duration={[100, 100]}
                                delay={[0, 200]}
                                interactive
                                content="Hộp thư"
                                placement="bottom"
                            >
                                <button className={cx('action-btn')}>
                                    <AiOutlineMessage />
                                </button>
                            </Tippy>
                        </>
                    ) : (
                        <>
                            <Button leftIcon={<AiOutlinePlus />} className={cx('custom-btn')} target="_blank">
                                Upload
                            </Button>
                            <Button primary target="_blank">
                                Log in
                            </Button>
                        </>
                    )}
                    <Menu items={currentUser ? USER_MENU : MENU_ITEMS} onChange={handleOnchangeMenu}>
                        {currentUser ? (
                            <Image
                                src="https://i.mydramalist.om/66L5p_5_c.jpg"
                                className={cx('user-avatar')}
                                alt="Nguyen Van A"
                            />
                        ) : (
                            <button className={cx('more-btn')}>
                                <IoEllipsisVerticalSharp />
                            </button>
                        )}
                    </Menu>
                </div>
            </div>
        </header>
    );
}

export default Header;
