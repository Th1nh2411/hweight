import PropTypes from 'prop-types';
import styles from './SuggestedAccount.module.scss';
import classNames from 'classnames/bind';
import AccountItem from '../AccountItem/AccountItem';
import * as services from '../../services/searchService';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);
function SuggestedAccount({ title }) {
    const [accountResult, setAccountResult] = useState([]);
    const [showMore, setShowMore] = useState(false);

    useEffect(() => {
        const fetchApi = async () => {
            const results = await services.suggest();

            if (!showMore) {
                setAccountResult(results.slice(0, 5));
            } else {
                setAccountResult(results);
            }
        };
        fetchApi();
    }, [showMore]);
    console.log(showMore);

    const handleShowMore = () => {
        setShowMore(true);
    };
    const handleShowLess = () => {
        setShowMore(false);
    };
    return (
        <div className={cx('wrapper')}>
            <h5 className={cx('title')}>{title}</h5>
            {accountResult.map((data) => (
                <AccountItem key={data.id} data={data} className={cx('custom-account-item')} />
            ))}
            {showMore ? (
                <button onClick={() => setShowMore(true)} className={cx('show-more')}>
                    Show less
                </button>
            ) : (
                <button onClick={() => setShowMore(false)} className={cx('show-more')}>
                    Show more
                </button>
            )}
        </div>
    );
}

export default SuggestedAccount;
