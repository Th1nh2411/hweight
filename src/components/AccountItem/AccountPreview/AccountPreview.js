import PropTypes from 'prop-types';
import styles from './AccountPreview.module.scss';
import classNames from 'classnames/bind';
import Image from '../../Image';
import PopperWrapper from '../../Popper';
import Button from '../../Button';
import { CheckIcon } from '../../Icons/Icons';

const cx = classNames.bind(styles);
function AccountPreview({ data }) {
    return (
        <PopperWrapper>
            <div className={cx('preview-wrapper')} tabIndex="-1">
                <div className={cx('header')}>
                    <Image src={data.avatar} alt={data.nickname} className={cx('avatar')} />
                    <Button small primary>
                        Follow
                    </Button>
                </div>
                <h4 id="username" className={cx('username')}>
                    <span>{data.nickname}</span>
                    {data.tick && (
                        <span>
                            <CheckIcon className={cx('check')} />
                        </span>
                    )}
                </h4>
                <h5 id="name" className={cx('name')}>
                    {data.full_name}
                </h5>
                <div className={cx('interact-wrapper')}>
                    <h5 id="followers" className={cx('interact')}>
                        {data.followers_count}
                        <span>Followers</span>
                    </h5>
                    <h5 id="likes" className={cx('interact')}>
                        {data.likes_count}
                        <span>Likes</span>
                    </h5>
                </div>
            </div>
        </PopperWrapper>
    );
}

export default AccountPreview;
