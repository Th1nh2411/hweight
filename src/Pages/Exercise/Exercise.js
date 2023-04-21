import classNames from 'classnames/bind';
import styles from './Exercise.module.scss';
import Card from '../../components/Card';
import { FireIcon, JumpRopeIcon } from '../../components/Icons/Icons';
import ExerciseList from '../../components/ExerciseList';
import * as exerciseService from '../../services/exerciseService';
import * as profileService from '../../services/profileService';
import { useEffect, useState } from 'react';
import { FaDumbbell } from 'react-icons/fa';

const cx = classNames.bind(styles);
function Exercise() {
    const [exercises, setExercises] = useState([]);
    const [history, setHistory] = useState([]);
    const [tab, setTab] = useState(0);
    const [leftLine, setLeftLine] = useState('');
    const [widthLine, setWidthLine] = useState('');
    const getExerciseData = async () => {
        const token = localStorage.getItem('token');
        const results = await exerciseService.getExercise(token);
        setExercises(results);
    };
    const getHistoryData = async () => {
        const token = localStorage.getItem('token');
        const results = await profileService.getProfile(token);
        setHistory(results);
    };
    const updateHistoryData = async (data) => {
        const token = localStorage.getItem('token');
        const results = await profileService.updateProfile(data, token);
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
                {/* {exercises.map((exercise, index) => (
                    <ExerciseList updateCaloOut={handleUpdateCaloOut} key={index} data={exercise} />
                ))} */}
                <div className={cx('tabs-wrapper')}>
                    <div
                        onClick={(event) => {
                            setTab(0);
                            setLeftLine(event.target.offsetLeft + 'px');
                            setWidthLine(event.target.offsetWidth + 'px');
                        }}
                        className={cx('tab-item', { active: tab === 0 })}
                    >
                        <FaDumbbell className={cx('tab-icon')} />
                        Light Exercise
                    </div>

                    <div
                        onClick={(event) => {
                            setTab(1);
                            setLeftLine(event.target.offsetLeft + 'px');
                            setWidthLine(event.target.offsetWidth + 'px');
                        }}
                        className={cx('tab-item', { active: tab === 1 })}
                    >
                        <FaDumbbell className={cx('tab-icon')} />
                        Moderate Exercises
                    </div>
                    <div
                        onClick={(event) => {
                            setTab(2);
                            setLeftLine(event.target.offsetLeft + 'px');
                            setWidthLine(event.target.offsetWidth + 'px');
                        }}
                        className={cx('tab-item', { active: tab === 2 })}
                    >
                        <FaDumbbell className={cx('tab-icon')} />
                        Heavy Exercises
                    </div>
                    <div className={cx('line')} style={{ left: leftLine, width: widthLine }}></div>
                </div>
                <div className={cx('tabs-content')}>
                    <div className={cx('tab-pane', { active: tab === 0 })}>
                        {exercises.map((exercise, index) => (
                            <ExerciseList updateCaloOut={handleUpdateCaloOut} key={index} data={exercise} />
                        ))}
                    </div>
                    <div className={cx('tab-pane', { active: tab === 1 })}>
                        {exercises.map((exercise, index) => (
                            <ExerciseList updateCaloOut={handleUpdateCaloOut} key={index} data={exercise} />
                        ))}
                    </div>
                    <div className={cx('tab-pane', { active: tab === 2 })}>
                        {exercises.map((exercise, index) => (
                            <ExerciseList updateCaloOut={handleUpdateCaloOut} key={index} data={exercise} />
                        ))}
                    </div>
                </div>
            </div>
        </Card>
    );
}

export default Exercise;
