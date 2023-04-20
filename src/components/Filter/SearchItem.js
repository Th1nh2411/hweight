import { useState } from 'react';
import styles from './Filter.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function SearchItem({ data }) {
    const [checked, setChecked] = useState(false);
    return (
        <label className={cx('SearchItem-wrapper', { checked })}>
            <input type="checkbox" value={checked} onChange={() => setChecked(!checked)} />
            <span className={cx('checkmark')}></span>
            <p className={cx('title')}>{data}</p>
        </label>
    );
}

export default SearchItem;
