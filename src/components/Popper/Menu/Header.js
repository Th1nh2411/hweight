import styles from './Menu.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
function MenuHeader({ title, onBack }) {
    return (
        <div className={cx('menu-header')}>
            <button onClick={onBack} className={cx('menu-header__back')}>
                <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <h4 className={cx('menu-header__title')}>{title}</h4>
        </div>
    );
}

export default MenuHeader;
