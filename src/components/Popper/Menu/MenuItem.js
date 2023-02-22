import Button from '../../Button';
import styles from './Menu.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
function MenuItem({ data, onClick }) {
    const classes = cx('custom-menu-item', {
        separate: data.separate,
    });
    return (
        <Button className={classes} leftIcon={data.icon} to={data.to} onClick={onClick}>
            {data.title}
        </Button>
    );
}

export default MenuItem;
