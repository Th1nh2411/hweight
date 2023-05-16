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
import { AiOutlineLeft } from 'react-icons/ai';
import Image from '../Image/Image';
import images from '../../assets/images';
import { Col, Row } from 'react-bootstrap';
import dayjs from 'dayjs';
const cx = classNames.bind(styles);

function DetailUser({ data = {}, onCloseModal }) {
    const [detailRecipe, setDetailRecipe] = useState({});
    const [showDetailRecipe, setShowDetailRecipe] = useState(false);
    const [detailExercise, setDetailExercise] = useState({});
    const [showDetailEx, setShowDetailEx] = useState(false);
    const userData = data.user;
    const userFavExs = data.user_ex;
    const userFavRecipes = data.user_recipe;
    const getDetailRecipeData = async (id) => {
        const token = localStorage.getItem('token');
        const results = await recipeService.getDetailRecipe(id, token);
        setDetailRecipe(results.recipe);
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
                <AiOutlineLeft className={cx('back-btn')} onClick={() => onCloseModal()} />
                <Image className={cx('user-img')} src={userData.gender === 1 ? images.manAvatar : images.womanAvatar} />
                <div className={cx('detail-name')}>{userData.name}</div>
                <div className={cx('detail-dateJoin')}>Date Join: {dayjs(userData.date).format('DD - MM - YYYY')}</div>
                <Row className={cx('detail-info')}>
                    <Col sm="4" className={cx('info-index')}>
                        <div className={cx('info-title')}>Weight (kg)</div>
                        <div
                            className={cx('num', {
                                under: userData.bmi < 18.5,
                                over: userData.bmi > 25,
                            })}
                        >
                            {userData.weight}
                        </div>
                    </Col>
                    <Col sm="4" className={cx('info-index')}>
                        <div className={cx('info-title')}>Height (cm)</div>
                        <div
                            className={cx('num', {
                                under: userData.bmi < 18.5,
                                over: userData.bmi > 25,
                            })}
                        >
                            {userData.height}
                        </div>
                    </Col>
                    <Col sm="4" className={cx('info-index')}>
                        <div className={cx('info-title')}>
                            BMI - {userData.bmi > 25 ? 'Overweight' : userData.bmi < 18.5 ? 'Underweight' : 'Normal'}
                        </div>
                        <div
                            className={cx('num', {
                                under: userData.bmi < 18.5,
                                over: userData.bmi > 25,
                            })}
                        >
                            {Math.floor(userData.bmi)}
                        </div>
                    </Col>
                </Row>
                <Row className={cx('content-wrapper')}>
                    <Col md={'6'}>
                        <div className={cx('content-list')}>
                            <div className={cx('content-title')}>
                                Favorite recipes{' '}
                                <div className={cx('icon')}>
                                    <BsFillBarChartLineFill />
                                </div>
                            </div>
                            <div className={cx('content-body')}>
                                <ListRank
                                    listData={userFavRecipes}
                                    onClickItem={(id) => {
                                        getDetailRecipeData(id);
                                    }}
                                />
                            </div>
                        </div>
                    </Col>
                    <Col md={'6'}>
                        <div className={cx('content-list')}>
                            <div className={cx('content-title')}>
                                Favorite exercises{' '}
                                <div className={cx('icon')}>
                                    <BsFillBarChartLineFill />
                                </div>
                            </div>
                            <div className={cx('content-body')}>
                                <ListRank
                                    listData={userFavExs}
                                    onClickItem={(id) => {
                                        getDetailExerciseData(id);
                                    }}
                                />
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </Modal>
    );
}

export default memo(DetailUser);
