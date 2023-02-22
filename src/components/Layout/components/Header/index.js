import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import images from '../../../../assets/images';
import {
    AiFillCloseCircle,
    AiOutlineCloudUpload,
    AiOutlineDollarCircle,
    AiOutlineLoading3Quarters,
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
    IoSearch,
    IoSettingsOutline,
} from 'react-icons/io5';
import { CgKeyboard } from 'react-icons/cg';
import HeadlessTippy from '@tippyjs/react/headless';
import Tippy from '@tippyjs/react';
import { useEffect, useState } from 'react';
import { Wrapper as PopperWrapper } from '../../../Popper';
import AccountItem from '../../../AccountItem';
import Button from '../../../Button';
import Menu from '../../../Popper/Menu';
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
    const [searchResult, setSearchResult] = useState([]);
    const currentUser = true;
    const USER_MENU = [
        {
            icon: <AiOutlineUser />,
            title: 'View profile',
            to: '/@hoaa',
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
    useEffect(() => {
        setTimeout(() => {
            setSearchResult([1, 2, 3]);
        }, 1000);
    });

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
                <div className={cx('logo-wrapper')}>
                    <img src={images.logo} alt="tiktok" />
                </div>
                <HeadlessTippy
                    interactive
                    visible={searchResult.length > 0}
                    render={(attrs) => (
                        <div className={cx('search-result')} tabIndex="-1">
                            <PopperWrapper>
                                <h4 className={cx('search-title')}>Accounts</h4>
                                <AccountItem />
                                <AccountItem />
                                <AccountItem />
                            </PopperWrapper>
                        </div>
                    )}
                >
                    <div className={cx('search')}>
                        <input placeholder="Search accounts and videos" />
                        <button className={cx('clear')}>
                            <AiFillCloseCircle />
                        </button>
                        <AiOutlineLoading3Quarters className={cx('loading')} />

                        <button className={cx('search-btn')}>
                            <IoSearch />
                        </button>
                    </div>
                </HeadlessTippy>
                <div className={cx('actions')}>
                    {currentUser ? (
                        <>
                            <Tippy interactive content="Upload" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <AiOutlineCloudUpload />
                                </button>
                            </Tippy>
                            <Tippy interactive content="Tin nhắn" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <IoPaperPlaneOutline />
                                </button>
                            </Tippy>

                            <Tippy delay={[0, 200]} interactive content="Hộp thư" placement="bottom">
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
                            <img
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
