import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import images from '../../../assets/images';
import {
    AiOutlineCloudUpload,
    AiOutlineDollarCircle,
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
import Button from '../../../components/Button';
import Menu from '../../../components/Popper/Menu';
import Image from '../../../components/Image';
import Search from '../Search';
import { Link } from 'react-router-dom';
import config from '../../../config';
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
                { type: 'language', code: 'ja', title: 'Korean' },
                { type: 'language', code: 'ja', title: 'Brazil' },
                { type: 'language', code: 'ja', title: 'Spain' },
                { type: 'language', code: 'ja', title: 'Russia' },
                { type: 'language', code: 'ja', title: 'hehe' },
                { type: 'language', code: 'ja', title: 'Japanese1' },
                { type: 'language', code: 'ja', title: 'Korean1' },
                { type: 'language', code: 'ja', title: 'Brazil1' },
                { type: 'language', code: 'ja', title: 'Spain1' },
                { type: 'language', code: 'ja', title: 'Russia1' },
                { type: 'language', code: 'ja', title: 'hehe1' },
                { type: 'language', code: 'ja', title: 'Japanese2' },
                { type: 'language', code: 'ja', title: 'Korean2' },
                { type: 'language', code: 'ja', title: 'Brazil2' },
                { type: 'language', code: 'ja', title: 'Spain2' },
                { type: 'language', code: 'ja', title: 'Russia2' },
                { type: 'language', code: 'ja', title: 'hehe2' },
                { type: 'language', code: 'ja', title: 'Japanese3' },
                { type: 'language', code: 'ja', title: 'Korean3' },
                { type: 'language', code: 'ja', title: 'Brazil3' },
                { type: 'language', code: 'ja', title: 'Spain3' },
                { type: 'language', code: 'ja', title: 'Russia3' },
                { type: 'language', code: 'ja', title: 'hehe3' },
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
            to: config.routes.profile,
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
                break;
            default:
                console.log('default');
        }
    };
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to={config.routes.home}>
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
                                    <img src={images.mailBox} alt="mailbox" />
                                    <div className={cx('notification')}>12</div>
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
                                src="https://i.mydramalist.com/66L5p_5_c.jpg"
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
