import PropTypes from 'prop-types';
import styles from './Item.module.scss';
import classNames from 'classnames/bind';
import Image from '../Image';
import { Link } from 'react-router-dom';
import { CheckIcon } from '../Icons/Icons';
import { AiOutlineRightCircle } from 'react-icons/ai';
const cx = classNames.bind(styles);

function Item({ data, className, showTippy = false }) {
    return (
        <div>
            <Link to={`/@/${data.id}`} className={cx(className, 'wrapper')}>
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
                    <AiOutlineRightCircle />
                </div>
            </Link>
        </div>
    );
}
Item.propTypes = {
    data: PropTypes.object.isRequired,
};
export default Item;
