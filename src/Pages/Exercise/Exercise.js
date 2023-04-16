import classNames from 'classnames/bind';
import styles from './Exercise.module.scss';
import Card from '../../components/Card';
import { FireIcon, JumpRopeIcon } from '../../components/Icons/Icons';
import ExerciseList from '../../components/ExerciseList';
import * as exerciseService from '../../services/exerciseService';
import * as historyService from '../../services/historyService';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);
function Exercise() {
    const [exercises, setExercises] = useState([]);
    const [history, setHistory] = useState([]);

    const getExerciseData = async () => {
        const token = localStorage.getItem('token');
        const results = await exerciseService.getExercise(token);
        setExercises(results);
    };
    const getHistoryData = async () => {
        const token = localStorage.getItem('token');
        const results = await historyService.getHistory(token);
        setHistory(results);
    };
    const updateHistoryData = async (data) => {
        const token = localStorage.getItem('token');
        const results = await historyService.updateHistory(data, token);
        setHistory(results);
    };
    useEffect(() => {
        getExerciseData();
        getHistoryData();
    }, []);
    const handleUpdateCaloOut = (calo) => {
        updateHistoryData({ caloOut: history.caloOut + calo });
        getHistoryData();
    };
    return (
        <Card className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('title')}>
                    exercise
                    <JumpRopeIcon height="28px" width="28px" className={cx('title-icon')} />
                </div>
                <div className={cx('subtitle')}>
                    <FireIcon className={cx('subtitle-icon')} /> Calories out today: {history.caloOut}
                </div>
            </div>
            <div className={cx('body')}>
                {exercises.map((exercise, index) => (
                    <ExerciseList updateCaloOut={handleUpdateCaloOut} key={index} data={exercise} />
                ))}
            </div>
        </Card>
    );
}

export default Exercise;
