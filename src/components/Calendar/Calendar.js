import classNames from 'classnames/bind';
import styles from './Calendar.module.scss';
import { range } from 'lodash-es';
import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import TippyHeadless from '@tippyjs/react/headless';
import Popper from '../Popper';
const cx = classNames.bind(styles);
const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const todayObj = dayjs();
function Calendar({ onDayChange, children, className }) {
    const [dayObj, setDayObj] = useState(dayjs());
    const [showFullCalendar, setShowFullCalendar] = useState(false);
    const thisYear = dayObj.year();
    const thisMonth = dayObj.month(); // (January as 0, December as 11)
    const calendarRef = useRef();
    const headerRef = useRef();
    const handleDocumentClick = (event) => {
        if (
            calendarRef.current &&
            !calendarRef.current.contains(event.target) &&
            !headerRef.current.contains(event.target)
        ) {
            setShowFullCalendar(false);
        }
    };
    useEffect(() => {
        document.addEventListener('click', handleDocumentClick);
        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, []);
    useEffect(() => {
        onDayChange(dayObj);
    }, [dayObj]);
    const renderCalendarHeader = () => {
        const handlePrev = () => {
            setDayObj(dayObj.subtract(1, 'day'));
        };

        const handleNext = () => {
            setDayObj(dayObj.add(1, 'day'));
        };
        return (
            <TippyHeadless
                visible={showFullCalendar}
                offset={[0, 6]}
                delay={[0, 400]}
                interactive
                placement="bottom-end"
                render={renderDayItems}
            >
                <div ref={headerRef} className={cx('wrapper', className)} tabIndex="-1">
                    <button onClick={handlePrev} type="button" className={cx('nav-day-btn')}>
                        <AiOutlineLeft />
                    </button>
                    <div onClick={() => setShowFullCalendar((prev) => !prev)} className={cx('dateTime')}>
                        {dayObj.format('DD MMMM YYYY')}
                    </div>
                    <button onClick={handleNext} type="button" className={cx('nav-day-btn')}>
                        <AiOutlineRight />
                    </button>
                </div>
            </TippyHeadless>
        );
    };
    const renderDayItems = (attrs) => {
        const daysInMonth = dayObj.daysInMonth();

        const dayObjOf1 = dayjs(`${thisYear}-${thisMonth + 1}-1`);
        const weekDayOf1 = dayObjOf1.day(); // (Sunday as 0, Saturday as 6)
        const dayObjOfLast = dayjs(`${thisYear}-${thisMonth + 1}-${daysInMonth}`);
        const weekDayOfLast = dayObjOfLast.day();
        return (
            <div ref={calendarRef} className={cx('day-container')}>
                {weekDays.map((d) => (
                    <div className={cx('week-cell')} key={d}>
                        {d}
                    </div>
                ))}
                {range(weekDayOf1).map((i) => (
                    <div
                        onClick={() => {
                            setDayObj(dayObjOf1.subtract(weekDayOf1 - i, 'day'));
                        }}
                        className={cx('day-cell', 'day-cell--faded')}
                        key={i}
                    >
                        {dayObjOf1.subtract(weekDayOf1 - i, 'day').date()}
                    </div>
                ))}

                {range(daysInMonth).map((i) => (
                    <div
                        onClick={() => {
                            setDayObj(dayjs(`${thisYear}-${thisMonth + 1}-${i + 1}`));
                        }}
                        className={cx('day-cell', 'day-cell--in-month', {
                            'day-cell--today':
                                i + 1 === todayObj.date() &&
                                thisMonth === todayObj.month() &&
                                thisYear === todayObj.year(),
                            'day-cell--selected':
                                i + 1 === dayObj.date() && thisMonth === dayObj.month() && thisYear === dayObj.year(),
                        })}
                        key={i}
                    >
                        {i + 1}
                    </div>
                ))}

                {range(6 - weekDayOfLast).map((i) => (
                    <div
                        onClick={() => {
                            setDayObj(dayObjOfLast.add(i + 1, 'day'));
                        }}
                        className={cx('day-cell', 'day-cell--faded')}
                        key={i}
                    >
                        {dayObjOfLast.add(i + 1, 'day').date()}
                    </div>
                ))}
            </div>
        );
    };

    return <>{renderCalendarHeader()}</>;
}

export default Calendar;
