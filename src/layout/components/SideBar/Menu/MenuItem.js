import styles from './Menu.module.scss';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const cx = classNames.bind(styles);
function MenuItem({ title, to, icon, activeIcon, separate, onClick }) {
    return (
        <NavLink onClick={onClick} className={(nav) => cx('menu-item', { active: nav.isActive }, { separate })} to={to}>
            <div className={cx('icon')}>{icon}</div>
            <div className={cx('active-icon')}>{activeIcon}</div>
            <span className={cx('item-title')}>{title}</span>
        </NavLink>
    );
}

MenuItem.propTypes = {
    title: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
    activeIcon: PropTypes.node.isRequired,
};
export default MenuItem;
