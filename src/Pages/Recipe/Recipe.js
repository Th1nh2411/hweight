import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './Recipe.module.scss';
import Card from '../../components/Card';
import Calendar from '../../components/Calendar';

const cx = classNames.bind(styles);

function Recipe() {
    return <Calendar />;
}

export default Recipe;
