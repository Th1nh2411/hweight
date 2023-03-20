import classNames from 'classnames/bind';
import styles from './Card.module.scss';

const cx = classNames.bind(styles);

function Card({ children, className }) {
    return <div className={cx('wrapper', className)}>{children}</div>;
}

export default Card;
