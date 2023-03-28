import styles from './Item.module.scss';
import classNames from 'classnames/bind';
import Image from '../Image';
import { Link } from 'react-router-dom';
import { AiOutlineRightCircle } from 'react-icons/ai';
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai';
import { useState } from 'react';
const cx = classNames.bind(styles);

function Item({ data, selected = false, editing = false, onChangeEditing, disableInput = false, className }) {
    const [checked, setChecked] = useState(selected);
    const handleChange = (event) => {
        setChecked(event.target.checked);
        onChangeEditing(event, data);
    };
    return (
        <div>
            <Link to={`/@/${data.id}`} className={cx('wrapper', className, { selected: checked })}>
                <div className={cx('info')}>
                    <Image src={data.img} alt={data.name} className={cx('avatar')} />
                    <div className={cx('desc')}>
                        <h4 id="name" className={cx('name')}>
                            {data.name}
                        </h4>
                        <h5 id="time-eat" className={cx('time')}>
                            {data.time}
                        </h5>
                    </div>
                </div>
                <div className={cx('more-btn')}>
                    {editing && (
                        <label
                            onClick={(event) => {
                                event.stopPropagation();
                            }}
                            className={cx('item-checkbox')}
                        >
                            <input
                                type="checkbox"
                                disabled={disableInput && !checked}
                                name={data.id}
                                checked={checked}
                                onChange={handleChange}
                            />
                            {checked ? <AiOutlineMinusCircle /> : <AiOutlinePlusCircle />}
                        </label>
                    )}
                    <AiOutlineRightCircle />
                </div>
            </Link>
        </div>
    );
}

export default Item;
