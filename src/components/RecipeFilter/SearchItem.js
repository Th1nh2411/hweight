import { useState } from 'react';
import styles from './Filter.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function SearchItem({ data, onCheckBoxChange }) {
    const [checked, setChecked] = useState(false);
    return (
        <label className={cx('SearchItem-wrapper', { checked })}>
            <input
                type="checkbox"
                value={checked}
                onChange={(e) => {
                    setChecked(!checked);
                    onCheckBoxChange(e, data);
                }}
            />
            <span className={cx('checkmark')}></span>
            <div className={cx('title')}>{data.name}</div>
        </label>
    );
}

export default SearchItem;
