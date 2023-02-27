import styles from './Menu.module.scss';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '../index';
import MenuItem from './MenuItem';
import MenuHeader from './Header';
import { useState } from 'react';
const cx = classNames.bind(styles);
const defaultFc = () => {};
function Menu({ children, items = [], hideonClick = false, onChange = defaultFc }) {
    const [history, setHistory] = useState([{ data: items }]);

    const current = history[history.length - 1];

    const renderItems = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children;

            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={() => {
                        if (isParent) {
                            setHistory((prev) => [...prev, item.children]);
                        } else {
                            onChange(item);
                        }
                    }}
                />
            );
        });
    };
    return (
        <Tippy
            offset={[10, 6]}
            delay={[0, 400]}
            hideOnClick={hideonClick}
            interactive
            placement="top-end"
            render={(attrs) => (
                <div className={cx('menu-list')} tabIndex="-1">
                    <PopperWrapper>
                        {history.length > 1 && (
                            <MenuHeader
                                onBack={() => {
                                    setHistory((prev) => prev.slice(0, prev.length - 1));
                                }}
                                title={current.title}
                            />
                        )}
                        {renderItems()}
                    </PopperWrapper>
                </div>
            )}
            onHide={() => setHistory((prev) => prev.slice(0, 1))}
        >
            {children}
        </Tippy>
    );
}

export default Menu;
