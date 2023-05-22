import styles from './WeightTracker.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useMemo, useState } from 'react';
import * as profileService from '../../services/profileService';
import { Line } from 'react-chartjs-2';
import dayjs from 'dayjs';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const cx = classNames.bind(styles);

const WeightTracker = ({ className }) => {
    const [allHistory, setAllHistory] = useState([]);
    const getAllHistory = async () => {
        const token = localStorage.getItem('token');
        const results = await profileService.getAllHistory(token);
        setAllHistory(results.list_user_history);
    };
    useEffect(() => {
        getAllHistory();
    }, []);
    const labels = useMemo(() => {
        const listMonths = allHistory && allHistory.map((item) => dayjs(item.date).format('MMM'));
        listMonths.splice(0, 1, 'Join');
        listMonths.splice(listMonths.length - 1, 1, 'Now');
        return listMonths;
    }, [allHistory]); //['January', 'February', 'March', 'April', 'May', 'June', 'July']
    console.log(allHistory, labels);
    const data = {
        labels,
        datasets: [
            {
                fill: true,
                label: 'Weight',
                data: allHistory && allHistory.map((item) => item.weight),
                borderColor: '#f8a647',
                backgroundColor: '#f8a64780',
                color: 'white',
            },
        ],
    };
    const options = {
        // responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: 'white',
                },
            },
        },
        scales: {
            y: {
                ticks: { color: 'white', padding: 10, font: { size: 16 }, stepSize: 10 },
                min: 40,
                grid: {
                    display: false,
                },
            },
            x: {
                ticks: { color: 'white', padding: 10, font: { size: 16 } },
                grid: {
                    display: false,
                },
            },
        },
    };
    return (
        <div className={cx('wrapper', className)}>
            <div className={cx('title')}>Weight Tracker</div>
            {allHistory && <Line className={cx('chart')} data={data} options={options} />}
        </div>
    );
};

export default WeightTracker;
