import { useEffect, useMemo, useState } from 'react';
import Card from '../../components/Card/Card';
import { HomeActiveIcon, UserGroupActiveIcon } from '../../components/Icons';
import styles from './HWNet.module.scss';
import classNames from 'classnames/bind';
import * as profileService from '../../services/profileService';

const cx = classNames.bind(styles);

function HWNet() {
    return (
        <Card className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('title')}>
                    HWNet
                    <UserGroupActiveIcon height="3.8rem" width="3.8rem" className={cx('title-icon')} />
                </div>
            </div>
        </Card>
    );
}

export default HWNet;
