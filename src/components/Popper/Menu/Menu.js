import styles from './Menu.module.scss';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import TippyHeadless from '@tippyjs/react/headless';
import Popper from '../index';
import MenuItem from './MenuItem';
import MenuHeader from './Header';
import { useState } from 'react';
const cx = classNames.bind(styles);
const defaultFc = () => {};
function Menu({ children, items = [], hideOnClick = false, onChange = defaultFc }) {
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
    const handleResetLv1 = () => setHistory((prev) => prev.slice(0, 1));
    const handleBack = () => {
        setHistory((prev) => prev.slice(0, prev.length - 1));
    };
    const renderResults = (attrs) => (
        <div className={cx('menu-list')} tabIndex="-1">
            <Popper>
                {history.length > 1 && <MenuHeader onBack={handleBack} title={current.title} />}
                <div className={cx('menu-body')}>{renderItems()}</div>
            </Popper>
        </div>
    );

    return (
        <TippyHeadless
            offset={[10, 6]}
            delay={[0, 400]}
            hideOnClick={hideOnClick}
            interactive
            placement="top-end"
            render={renderResults}
            onHide={handleResetLv1}
        >
            {children}
        </TippyHeadless>
    );
}
Menu.propTypes = {
    children: PropTypes.node.isRequired,
    items: PropTypes.array,
    hideOnClick: PropTypes.bool,
    onChange: PropTypes.func,
};
export default Menu;
