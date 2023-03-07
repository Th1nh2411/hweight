import PropTypes from 'prop-types';
import styles from './AccountItem.module.scss';
import classNames from 'classnames/bind';
import Image from '../Image';
import { Link } from 'react-router-dom';
import { CheckIcon } from '../Icons/Icons';
const cx = classNames.bind(styles);

function AccountItem({ data, className, showTippy = false }) {
    console.log(showTippy);
    return (
        <div>
            <Link to={`/@/${data.nickname}`} className={cx(className, 'wrapper')}>
                <Image src={data.avatar} alt={data.nickname} className={cx('avatar')} />
                <div className={cx('info')}>
                    <h4 id="username" className={cx('username')}>
                        <span>{data.nickname}</span>
                        {data.tick && <CheckIcon className={cx('check')} />}
                    </h4>
                    <h5 id="name" className={cx('name')}>
                        {data.full_name}
                    </h5>
                </div>
            </Link>
        </div>
    );
}
AccountItem.propTypes = {
    data: PropTypes.object.isRequired,
};
export default AccountItem;
