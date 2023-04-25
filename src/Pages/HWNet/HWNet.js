import styles from './HWNet.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useMemo, useState } from 'react';
import Card from '../../components/Card/Card';
import { MdLeaderboard } from 'react-icons/md';
import * as recipeService from '../../services/recipeService';
import * as exerciseService from '../../services/exerciseService';
import * as usersService from '../../services/usersService';
import ListRank from '../../components/ListRank/ListRank';
import { ConnectIcon } from '../../components/Icons';
import { HiUserGroup } from 'react-icons/hi2';
import DetailRecipe from '../../components/DetailRecipe';
import DetailExercise from '../../components/DetailExercise';
import DetailUser from '../../components/DetailUser';
import { Col, Row } from 'react-bootstrap';
import Image from '../../components/Image/Image';

const cx = classNames.bind(styles);

function HWNet() {
    const [topRecipe, setTopRecipe] = useState([]);
    const [topExercise, setTopExercise] = useState([]);
    const [users, setUsers] = useState([]);
    const [detailRecipe, setDetailRecipe] = useState({});
    const [showDetailRecipe, setShowDetailRecipe] = useState(false);
    const [detailExercise, setDetailExercise] = useState({});
    const [showDetailEx, setShowDetailEx] = useState(false);
    const [detailUser, setDetailUser] = useState({});
    const [showDetailUser, setShowDetailUser] = useState(false);
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
    const getUsersData = async () => {
        const token = localStorage.getItem('token');
        const results = await usersService.getUsers(token);
        setUsers(results);
    };
    useEffect(() => {
        getTopRecipeData();
        getTopExerciseData();
        getUsersData();
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
    const getDetailUserData = async (id) => {
        const token = localStorage.getItem('token');
        const results = await usersService.getDetailUser(id, token);
        setDetailUser(results);
        setShowDetailUser(true);
    };
    return (
        <Card className={cx('wrapper')}>
            {showDetailRecipe && <DetailRecipe data={detailRecipe} onCloseModal={() => setShowDetailRecipe(false)} />}
            {showDetailEx && <DetailExercise data={detailExercise} onCloseModal={() => setShowDetailEx(false)} />}
            {showDetailUser && <DetailUser data={detailUser} onCloseModal={() => setShowDetailUser(false)} />}
            <div className={cx('header')}>
                <div className={cx('title')}>
                    HWNet
                    <ConnectIcon height="2.6rem" width="2.6rem" className={cx('title-icon')} />
                </div>
            </div>
            <div className={cx('body')}>
                <Row>
                    <Col className={cx('content-wrapper')}>
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
                    </Col>
                    <Col className={cx('content-wrapper')}>
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
                    </Col>
                </Row>
                <div className={cx('content-wrapper')}>
                    <div className={cx('content-title')}>
                        The others{' '}
                        <div className={cx('icon')}>
                            <HiUserGroup />
                        </div>
                    </div>
                    <Row className={cx('content-body')}>
                        {users.map((user, index) => (
                            <Col
                                xl="4"
                                key={index}
                                className={cx('user-wrapper')}
                                onClick={() => getDetailUserData(user.id)}
                            >
                                <Image className={cx('user-img')} />
                                <div className={cx('user-info')}>
                                    <div className={cx('user-name')}>{user.name}</div>
                                    <div className={cx('user-bmi', { under: user.BMI < 18.5, over: user.BMI > 25 })}>
                                        {user.BMI} BMI
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>
        </Card>
    );
}

export default HWNet;
