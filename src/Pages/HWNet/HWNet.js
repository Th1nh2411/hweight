import styles from './HWNet.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useMemo, useState } from 'react';
import Card from '../../components/Card/Card';
import { BsFillBarChartLineFill } from 'react-icons/bs';
import * as rankingService from '../../services/rankingService';
import * as recipeService from '../../services/recipeService';
import * as exerciseService from '../../services/exerciseService';
import ListRank from '../../components/ListRank/ListRank';
import { ConnectIcon } from '../../components/Icons';
import { HiUserGroup } from 'react-icons/hi2';
import DetailRecipe from '../../components/DetailRecipe';
import DetailExercise from '../../components/DetailExercise';
import DetailUser from '../../components/DetailUser';
import { Col, Row } from 'react-bootstrap';
import Image from '../../components/Image/Image';
import images from '../../assets/images';
import UserFilter from '../../components/UserFilter/UserFilter';

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
    const [pageReview, setPageReview] = useState(1);
    const [maxPageReview, setMaxPageReview] = useState(1);

    const [minBMIValue, setMinBMIValue] = useState(0);
    const [maxBMIValue, setMaxBMIValue] = useState(40);
    const getTopRecipeData = async () => {
        const token = localStorage.getItem('token');
        const results = await rankingService.getRankRecipe(token);
        setTopRecipe(results.recipeRank);
    };
    const getTopExerciseData = async () => {
        const token = localStorage.getItem('token');
        const results = await rankingService.getRankExercise(token);
        setTopExercise(results.exerciseRank);
    };
    const getMoreUsersData = async () => {
        const token = localStorage.getItem('token');
        const results = await rankingService.getUsers(token, minBMIValue, maxBMIValue, pageReview);
        if (results.isSuccess) {
            setUsers([...users, ...results.users]);
            setMaxPageReview(results.maxPage);
        }
    };
    const getFilterUsersData = async (minBMI = 0, maxBMI = 40) => {
        const token = localStorage.getItem('token');
        const results = await rankingService.getUsers(token, minBMI, maxBMI, 1);
        setPageReview(1);
        setMinBMIValue(minBMI);
        setMaxBMIValue(maxBMI);
        if (results.isSuccess) {
            setUsers(results.users);
            setMaxPageReview(results.maxPage);
        }
    };
    useEffect(() => {
        if (pageReview !== 1) {
            getMoreUsersData();
        }
    }, [pageReview]);
    useEffect(() => {
        getTopRecipeData();
        getTopExerciseData();
        getFilterUsersData();
    }, []);

    const getDetailRecipeData = async (id) => {
        const token = localStorage.getItem('token');
        const results = await recipeService.getDetailRecipe(id, token);
        setDetailRecipe(results.recipe);
        setShowDetailRecipe(true);
    };
    const getDetailExerciseData = async (id) => {
        const token = localStorage.getItem('token');
        const results = await exerciseService.getDetailExercise(id, token);
        setDetailExercise(results.details);
        setShowDetailEx(true);
    };
    const getDetailUserData = async (id) => {
        const token = localStorage.getItem('token');
        const results = await rankingService.getDetailUser(id, token);
        setDetailUser(results);
        setShowDetailUser(true);
    };

    return (
        <Card className={cx('wrapper')}>
            {showDetailRecipe && detailRecipe && (
                <DetailRecipe data={detailRecipe} onCloseModal={() => setShowDetailRecipe(false)} />
            )}
            {showDetailEx && detailExercise && (
                <DetailExercise data={detailExercise} onCloseModal={() => setShowDetailEx(false)} />
            )}
            {showDetailUser && detailUser && (
                <DetailUser data={detailUser} onCloseModal={() => setShowDetailUser(false)} />
            )}
            <div className={cx('header')}>
                <div className={cx('title')}>
                    HWNet
                    <ConnectIcon height="2.6rem" width="2.6rem" className={cx('title-icon')} />
                </div>
            </div>
            <div className={cx('body')}>
                <Row>
                    <Col md={'6'}>
                        <div className={cx('content-wrapper')}>
                            <div className={cx('content-title')}>
                                Top 30 Recipe{' '}
                                <div className={cx('icon')}>
                                    <BsFillBarChartLineFill />
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
                    </Col>
                    <Col md={'6'}>
                        <div className={cx('content-wrapper')}>
                            <div className={cx('content-title')}>
                                Top 10 Exercise{' '}
                                <div className={cx('icon')}>
                                    <BsFillBarChartLineFill />
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
                    </Col>

                    <Col xl={'12'}>
                        <div className={cx('content-wrapper')}>
                            <div className={cx('content-title')}>
                                The others{' '}
                                <div className={cx('icon')}>
                                    <HiUserGroup />
                                </div>
                            </div>
                            <UserFilter onChangeFilter={(minBMI, maxBMI) => getFilterUsersData(minBMI, maxBMI)} />
                            <Row className={cx('content-body')}>
                                {users &&
                                    users.map((user, index) => (
                                        <Col
                                            md="4"
                                            key={index}
                                            className={cx('user-wrapper')}
                                            onClick={() => getDetailUserData(user.idUser)}
                                        >
                                            <Image
                                                src={user.gender === 1 ? images.manAvatar : images.womanAvatar}
                                                className={cx('user-img')}
                                            />
                                            <div className={cx('user-info')}>
                                                <div className={cx('user-name')}>{user.name}</div>
                                                <div
                                                    className={cx('user-bmi', {
                                                        under: parseFloat(user.bmi).toFixed(1) < 18.5,
                                                        over: parseFloat(user.bmi).toFixed(1) > 25,
                                                    })}
                                                >
                                                    {parseFloat(user.bmi).toFixed(1)} BMI
                                                </div>
                                            </div>
                                        </Col>
                                    ))}
                                {pageReview < maxPageReview && (
                                    <div
                                        onClick={() => {
                                            setPageReview((prev) => prev + 1);
                                        }}
                                        className={cx('user-showMore')}
                                    >
                                        Show more...
                                    </div>
                                )}
                            </Row>
                        </div>
                    </Col>
                </Row>
            </div>
        </Card>
    );
}

export default HWNet;
