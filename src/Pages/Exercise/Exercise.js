import classNames from 'classnames/bind';
import styles from './Exercise.module.scss';
import Card from '../../components/Card';
import { JumpRopeIcon } from '../../components/Icons/Icons';
import ExerciseList from '../../components/ExerciseList';
import * as exerciseService from '../../services/exerciseService';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);
function Exercise() {
    const [exercises, setExercises] = useState([]);

    const getExerciseData = async () => {
        const token = localStorage.getItem('token');
        const results = await exerciseService.getExercise(token);
        setExercises(results);
    };
    useEffect(() => {
        getExerciseData();
    }, []);
    console.log(exercises);
    return (
        <Card className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('title')}>
                    exercise
                    <JumpRopeIcon height="28px" width="28px" className={cx('title-icon')} />
                </div>
            </div>
            <div className={cx('body')}>
                {exercises.map((exercise, index) => (
                    <ExerciseList key={index} data={exercise} />
                ))}
            </div>
        </Card>
    );
}

export default Exercise;
