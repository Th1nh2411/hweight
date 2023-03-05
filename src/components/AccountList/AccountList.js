import PropTypes from 'prop-types';
import styles from './AccountList.module.scss';
import classNames from 'classnames/bind';
import AccountItem from '../AccountItem/AccountItem';
import { useState } from 'react';

const cx = classNames.bind(styles);
function AccountList({ title, accountResult, numShow }) {
    const [showMore, setShowMore] = useState(false);

    const renderItem = () => {
        return accountResult.map((data, index) =>
            showMore ? (
                <AccountItem showTippy={true} key={data.id} data={data} className={cx('custom-account-item')} />
            ) : (
                index < numShow && <AccountItem key={data.id} data={data} className={cx('custom-account-item')} />
            ),
        );
    };

    return (
        <div className={cx('wrapper')}>
            <h5 className={cx('title')}>{title}</h5>
            {renderItem()}
            {showMore ? (
                <button onClick={() => setShowMore(false)} className={cx('more-btn')}>
                    See less
                </button>
            ) : (
                <button onClick={() => setShowMore(true)} className={cx('more-btn')}>
                    See all
                </button>
            )}
        </div>
    );
}

export default AccountList;
