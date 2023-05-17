import classNames from 'classnames/bind';
import styles from './Exercise.module.scss';
import Card from '../../components/Card';
import { FireIcon, JumpRopeIcon } from '../../components/Icons/Icons';
import ExerciseList from '../../components/ExerciseList';
import * as exerciseService from '../../services/exerciseService';
import * as profileService from '../../services/profileService';
import { useEffect, useState } from 'react';
import { FaDumbbell } from 'react-icons/fa';
import DetailExercise from '../../components/DetailExercise/DetailExercise';

const cx = classNames.bind(styles);
function Exercise() {
    const [exercises, setExercises] = useState([]);
    const [history, setHistory] = useState([]);
    const [tab, setTab] = useState(0);
    const [leftLine, setLeftLine] = useState('');
    const [widthLine, setWidthLine] = useState('');
    const [detailExercise, setDetailExercise] = useState({});
    const [showDetailEx, setShowDetailEx] = useState(false);
    const getExerciseData = async (level) => {
        const token = localStorage.getItem('token');
        const results = await exerciseService.getExercise(level, token);
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
    const getDetailExerciseData = async (id) => {
        const token = localStorage.getItem('token');
        const results = await exerciseService.getDetailExercise(id, token);
        setDetailExercise(results);
        setShowDetailEx(true);
    };
    useEffect(() => {
        getExerciseData(1);
        getHistoryData();
    }, []);
    const handleUpdateCalOut = (cal) => {
        updateHistoryData({ calOut: Number(history.calOut) + Number(cal) });
        getHistoryData();
        if (showDetailEx) {
            setShowDetailEx(false);
        }
    };
    return (
        <Card className={cx('wrapper')}>
            {showDetailEx && (
                <DetailExercise
                    updateCalOut={handleUpdateCalOut}
                    data={detailExercise}
                    onCloseModal={() => setShowDetailEx(false)}
                />
            )}
            <div className={cx('header')}>
                <div className={cx('title')}>
                    exercise
                    <JumpRopeIcon height="28px" width="28px" className={cx('title-icon')} />
                </div>
                <div className={cx('subtitle')}>
                    <FireIcon className={cx('subtitle-icon')} /> Calories out today: {history.calOut}
                </div>
            </div>
            <div className={cx('body')}>
                <div className={cx('tabs-wrapper')}>
                    <div
                        onClick={(event) => {
                            setTab(0);
                            getExerciseData(1);
                            console.log(event.target.offsetLeft, event.target.offsetWidth);
                            setLeftLine(event.target.offsetLeft + 'px');
                            setWidthLine(event.target.offsetWidth + 'px');
                        }}
                        className={cx('tab-item', { active: tab === 0 })}
                    >
                        <FaDumbbell className={cx('tab-icon')} />
                        Light <span className={cx('sub-text')}> Exercises</span>
                    </div>

                    <div
                        onClick={(event) => {
                            setTab(1);
                            getExerciseData(2);
                            console.log(event.target.offsetLeft, event.target.offsetWidth);
                            setLeftLine(event.target.offsetLeft + 'px');
                            setWidthLine(event.target.offsetWidth + 'px');
                        }}
                        className={cx('tab-item', { active: tab === 1 })}
                    >
                        <FaDumbbell className={cx('tab-icon')} />
                        Moderate <span className={cx('sub-text')}> Exercises</span>
                    </div>
                    <div
                        onClick={(event) => {
                            setTab(2);
                            getExerciseData(3);
                            console.log(event.target.offsetLeft, event.target.offsetWidth);
                            setLeftLine(event.target.offsetLeft + 'px');
                            setWidthLine(event.target.offsetWidth + 'px');
                        }}
                        className={cx('tab-item', { active: tab === 2 })}
                    >
                        <FaDumbbell className={cx('tab-icon')} />
                        Heavy <span className={cx('sub-text')}> Exercises</span>
                    </div>
                    <div className={cx('line')} style={{ left: leftLine, width: widthLine }}></div>
                </div>
                <div className={cx('tabs-content')}>
                    <div className={cx('tab-pane', { active: tab === 0 })}>
                        {exercises.map((exercise, index) => (
                            <ExerciseList
                                updateCalOut={handleUpdateCalOut}
                                key={index}
                                data={exercise}
                                onClickExercise={(id) => getDetailExerciseData(id)}
                            />
                        ))}
                    </div>
                    <div className={cx('tab-pane', { active: tab === 1 })}>
                        {exercises.map((exercise, index) => (
                            <ExerciseList
                                updateCalOut={handleUpdateCalOut}
                                key={index}
                                data={exercise}
                                onClickExercise={(id) => getDetailExerciseData(id)}
                            />
                        ))}
                    </div>
                    <div className={cx('tab-pane', { active: tab === 2 })}>
                        {exercises.map((exercise, index) => (
                            <ExerciseList
                                updateCalOut={handleUpdateCalOut}
                                key={index}
                                data={exercise}
                                onClickExercise={(id) => getDetailExerciseData(id)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </Card>
    );
}

export default Exercise;
