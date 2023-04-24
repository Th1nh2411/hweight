import styles from './HWNet.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useMemo, useState } from 'react';
import Card from '../../components/Card/Card';
import { MdLeaderboard } from 'react-icons/md';
import * as recipeService from '../../services/recipeService';
import * as exerciseService from '../../services/exerciseService';
import ListRank from '../../components/ListRank/ListRank';
import { ConnectIcon } from '../../components/Icons';
import { HiUserGroup } from 'react-icons/hi2';
import DetailRecipe from '../../components/DetailRecipe';
import DetailExercise from '../../components/DetailExercise';

const cx = classNames.bind(styles);

function HWNet() {
    const [topRecipe, setTopRecipe] = useState();
    const [topExercise, setTopExercise] = useState();
    const [detailRecipe, setDetailRecipe] = useState({});
    const [showDetailRecipe, setShowDetailRecipe] = useState(false);
    const [detailExercise, setDetailExercise] = useState({});
    const [showDetailEx, setShowDetailEx] = useState(false);
    const getTopRecipeData = async () => {
        const token = localStorage.getItem('token');
        const results = await recipeService.getMenu(token);
        setTopRecipe(results);
    };
    const getTopExerciseData = async () => {
        const token = localStorage.getItem('token');
        const results = await exerciseService.getExercise(token);
        setTopExercise(results);
    };

    useEffect(() => {
        getTopRecipeData();
    }, []);
    useEffect(() => {
        getTopExerciseData();
    }, []);
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
        <Card className={cx('wrapper')}>
            {showDetailRecipe && <DetailRecipe data={detailRecipe} onCloseModal={() => setShowDetailRecipe(false)} />}
            {showDetailEx && <DetailExercise data={detailExercise} onCloseModal={() => setShowDetailEx(false)} />}
            <div className={cx('header')}>
                <div className={cx('title')}>
                    HWNet
                    <ConnectIcon height="2.6rem" width="2.6rem" className={cx('title-icon')} />
                </div>
            </div>
            <div className={cx('body')}>
                <div className={cx('dFlex-2c')}>
                    <div className={cx('content-wrapper')}>
                        <div className={cx('content-title')}>
                            Top 30 Recipe{' '}
                            <div className={cx('icon')}>
                                <MdLeaderboard />
                            </div>
                        </div>
                        <div className={cx('content-body')}>
                            <ListRank
                                listData={topRecipe}
                                onClickItem={(id) => {
                                    getDetailRecipeData(id);
                                }}
                            />
                        </div>
                    </div>
                    <div className={cx('content-wrapper')}>
                        <div className={cx('content-title')}>
                            Top 10 Exercise{' '}
                            <div className={cx('icon')}>
                                <MdLeaderboard />
                            </div>
                        </div>
                        <div className={cx('content-body')}>
                            <ListRank
                                listData={topExercise}
                                onClickItem={(id) => {
                                    getDetailExerciseData(id);
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className={cx('content-wrapper')}>
                    <div className={cx('content-title')}>
                        The others{' '}
                        <div className={cx('icon')}>
                            <HiUserGroup />
                        </div>
                    </div>
                    <div className={cx('content-body')}>
                        <ListRank
                            listData={topExercise}
                            onClickItem={(id) => {
                                getDetailExerciseData(id);
                            }}
                        />
                    </div>
                </div>
            </div>
        </Card>
    );
}

export default HWNet;
