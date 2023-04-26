import styles from './DetailUser.module.scss';
import classNames from 'classnames/bind';
import { memo, useEffect, useState } from 'react';
import Modal from '../Modal/Modal';
import * as recipeService from '../../services/recipeService';
import * as exerciseService from '../../services/exerciseService';
import { FaFemale, FaMale } from 'react-icons/fa';
import ListRank from '../ListRank/ListRank';
import { BsFillBarChartLineFill } from 'react-icons/bs';
import DetailRecipe from '../DetailRecipe/DetailRecipe';
import DetailExercise from '../DetailExercise/DetailExercise';
const cx = classNames.bind(styles);

function DetailUser({ data = {}, onCloseModal }) {
    const [detailRecipe, setDetailRecipe] = useState({});
    const [showDetailRecipe, setShowDetailRecipe] = useState(false);
    const [detailExercise, setDetailExercise] = useState({});
    const [showDetailEx, setShowDetailEx] = useState(false);
    const getDetailRecipeData = async (id) => {
        const token = localStorage.getItem('token');
        const results = await recipeService.getDetailRecipe(id, token);
        setDetailRecipe(results);
        setShowDetailRecipe(true);
    };
    const getDetailExerciseData = async (id) => {
        const token = localStorage.getItem('token');
        const results = await exerciseService.getDetailExercise(id, token);
        setDetailExercise(results);
        setShowDetailEx(true);
    };
    return (
        <Modal
            className={cx('detail-wrapper')}
            handleClickOutside={() => {
                onCloseModal();
            }}
        >
            {showDetailRecipe && <DetailRecipe data={detailRecipe} onCloseModal={() => setShowDetailRecipe(false)} />}
            {showDetailEx && <DetailExercise data={detailExercise} onCloseModal={() => setShowDetailEx(false)} />}
            <div className={cx('detail-body')}>
                <div className={cx('detail-name')}>{data.name}</div>
                <div className={cx('detail-info')}>
                    <div className={cx('detail-gender')}>
                        {data.gender === 1 ? (
                            <>
                                <FaMale className={cx('icon')} /> Male
                            </>
                        ) : (
                            <>
                                <FaFemale className={cx('icon')} /> Female
                            </>
                        )}
                    </div>
                    <div className={cx('detail-bmi')}>
                        <div
                            className={cx('num', {
                                under: data.BMI < 18.5,
                                over: data.BMI > 25,
                            })}
                        >
                            {data.BMI}
                        </div>
                        <div className={cx('subtitle')}>
                            <div className={cx('BMI')}>BMI</div>
                            <div
                                className={cx('status', {
                                    under: data.BMI < 18.5,
                                    over: data.BMI > 25,
                                })}
                            >
                                {data.BMI < 18.5 ? 'UnderWeight' : data.BMI > 25 ? 'Overweight' : 'Normal'}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('content-wrapper', 'row')}>
                    <div className={cx('content-list', 'col')}>
                        <div className={cx('content-title')}>
                            Favorite recipes{' '}
                            <div className={cx('icon')}>
                                <BsFillBarChartLineFill />
                            </div>
                        </div>
                        <div className={cx('content-body')}>
                            <ListRank
                                listData={data.recipes}
                                onClickItem={(id) => {
                                    getDetailRecipeData(id);
                                }}
                            />
                        </div>
                    </div>
                    <div className={cx('content-list', 'col')}>
                        <div className={cx('content-title')}>
                            Favorite exercises{' '}
                            <div className={cx('icon')}>
                                <BsFillBarChartLineFill />
                            </div>
                        </div>
                        <div className={cx('content-body')}>
                            <ListRank
                                listData={data.exercises}
                                onClickItem={(id) => {
                                    getDetailExerciseData(id);
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default memo(DetailUser);
