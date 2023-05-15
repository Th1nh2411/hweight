import PropTypes from 'prop-types';
import styles from './ListRank.module.scss';
import classNames from 'classnames/bind';
import Image from '../Image';
import { HeartIcon, Top1Icon, Top2Icon, Top3Icon } from '../Icons';
const cx = classNames.bind(styles);

const ListRank = ({ listData = [], onClickItem }) => {
    return (
        <div className={cx('wrapper')}>
            {listData.map((item, index) => (
                <div
                    onClick={() => onClickItem(item.idRecipe)}
                    className={cx('item', { even: index % 2 === 1 })}
                    key={index}
                >
                    <div className={cx('item-name')}>
                        {index === 0 ? (
                            <Top1Icon className={cx('item-order')} />
                        ) : index === 1 ? (
                            <Top2Icon className={cx('item-order')} />
                        ) : index === 2 ? (
                            <Top3Icon className={cx('item-order')} />
                        ) : (
                            <div className={cx('item-order')}>{index + 1}</div>
                        )}
                        <Image src={item.image} className={cx('item-img')} />
                        {item.name}
                    </div>
                    <div className={cx('likes-num')}>
                        {item.points}
                        <HeartIcon className={cx('likes-icon')} height="1.6rem" width="1.6rem" />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ListRank;
