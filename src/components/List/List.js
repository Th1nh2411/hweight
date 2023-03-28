import styles from './List.module.scss';
import classNames from 'classnames/bind';
import { RiEditFill } from 'react-icons/ri';

const cx = classNames.bind(styles);
function List({ title, className, subtitle, edit = false, onClickEdit, children }) {
    return (
        <div className={cx('wrapper', className)}>
            <div className={cx('header')}>
                <h5 className={cx('title')}>
                    {title} {edit && <RiEditFill onClick={onClickEdit} className={cx('title-icon')} />}
                </h5>
                <span className={cx('subtitle')}>{subtitle}</span>
            </div>
            <div className={cx('body')}>{children}</div>
        </div>
    );
}

export default List;
