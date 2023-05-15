import styles from './DetailRecipe.module.scss';
import classNames from 'classnames/bind';
import Image from '../Image';
import { AiFillCloseCircle, AiOutlineLeft } from 'react-icons/ai';
import { BiSend } from 'react-icons/bi';
import { memo, useContext, useEffect, useState } from 'react';
import Modal from '../Modal/Modal';
import { DairyIcon, EvaluateIcon, FatIcon, FireIcon, HeartIcon, MeatIcon, RiceBowIcon } from '../Icons/Icons';
import Tippy from '@tippyjs/react';
import * as recipeService from '../../services/recipeService';
import * as rankingService from '../../services/rankingService';
import dayjs from 'dayjs';
import UserContext from '../../store/Context';
const cx = classNames.bind(styles);

function DetailRecipe({ data = {}, onCloseModal }) {
    const [isLiked, setIsLiked] = useState(data.isLike);
    const [tab, setTab] = useState(0);
    const [reviews, setReviews] = useState([]);
    const [reviewValue, setReviewValue] = useState('');
    const [leftLine, setLeftLine] = useState('');
    const [widthLine, setWidthLine] = useState('');
    const [pageReview, setPageReview] = useState(1);
    const [maxPageReview, setMaxPageReview] = useState();
    const [state, dispatch] = useContext(UserContext);
    const getCommentData = async () => {
        const token = localStorage.getItem('token');
        const results = await recipeService.getComment(data.idRecipe, token, pageReview);
        setReviews((prev) => [...prev, ...results.listCMT]);
        setMaxPageReview(results.maxPage);
    };
    useEffect(() => {
        getCommentData();
    }, [pageReview]);
    const postComment = async () => {
        const token = localStorage.getItem('token');
        const results = await recipeService.postComment(data.idRecipe, reviewValue, token);
        setReviewValue('');
        setReviews((prev) => [{ name: state.userinfo.name, cmt: reviewValue, date: dayjs().add(7, 'hours') }, ...prev]);
    };
    const handleLike = async () => {
        setIsLiked(!isLiked);
        !isLiked ? (data.points = data.points + 1) : (data.points = data.points - 1);
        const token = localStorage.getItem('token');
        await recipeService.updateLikedRecipe(data.idRecipe, !isLiked, token);
        await rankingService.updateRankRecipe(token);
    };
    const handleChangeInput = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setReviewValue(searchValue);
        }
    };
    const handleClearReviewValue = () => {
        setReviewValue('');
    };
    const timeGap = (date) => {
        const today = dayjs();
        const pastDate = dayjs(date).subtract(7, 'hours');
        const timeDiff = today.diff(pastDate, 'minutes');
        if (timeDiff < 1) {
            return 'recently';
        } else if (timeDiff < 60) {
            return `${timeDiff} ${timeDiff === 1 ? 'minute' : 'minutes'} ago`;
        } else if (timeDiff / 60 < 24) {
            return `${Math.floor(timeDiff / 60)} ${timeDiff / 60 === 1 ? 'hour' : 'hours'} ago`;
        } else {
            return `${Math.floor(timeDiff / 60 / 24)} ${timeDiff / 60 / 24 === 1 ? 'day' : 'days'} ago`;
        }
    };
    return (
        <Modal
            className={cx('detail-wrapper')}
            handleClickOutside={() => {
                onCloseModal();
            }}
        >
            <div className={cx('detail-body')}>
                <div className={cx('detail-name')}>
                    <AiOutlineLeft className={cx('back-btn')} onClick={() => onCloseModal()} />
                    {data.name}
                    <Tippy placement="bottom" content={isLiked ? 'Remove from favorites' : 'Add to favorites'}>
                        <div className={cx('like-icon-wrapper')}>
                            <HeartIcon
                                onClick={handleLike}
                                height="2.8rem"
                                width="2.8rem"
                                className={cx('like-icon', { isLiked })}
                            />
                        </div>
                    </Tippy>
                </div>
                <p className={cx('detail-info')}>{data.info}</p>
                <div className={cx('likes-num')}>
                    <HeartIcon className={cx('likes-icon')} height="1.6rem" width="1.6rem" /> {data.points} people love
                    this
                </div>

                <div className={cx('tabs-wrapper')}>
                    <div
                        onClick={(event) => {
                            setTab(0);
                            setLeftLine(event.target.offsetLeft + 'px');
                            setWidthLine(event.target.offsetWidth + 'px');
                        }}
                        className={cx('tab-item', { active: tab === 0 })}
                    >
                        <DairyIcon className={cx('tab-icon')} />
                        Ingredients you need
                    </div>
                    <div
                        onClick={(event) => {
                            setTab(1);
                            setLeftLine(event.target.offsetLeft + 'px');
                            setWidthLine(event.target.offsetWidth + 'px');
                        }}
                        className={cx('tab-item', { active: tab === 1 })}
                    >
                        <EvaluateIcon className={cx('tab-icon')} />
                        Recipe reviews
                    </div>
                    <div className={cx('line')} style={{ left: leftLine, width: widthLine }}></div>
                </div>
                <div className={cx('tabs-content')}>
                    <div className={cx('tab-pane', { active: tab === 0 })}>
                        <div className={cx('detail-ingredients__list')}>
                            {data.Recipe_ingredients &&
                                data.Recipe_ingredients.map((ingredient, index) => (
                                    <div key={index} className={cx('detail-ingredients__item')}>
                                        <Image className={cx('detail-ingredient-img')} src={ingredient.image} />
                                        <div className={cx('detail-ingredients-name')}>{ingredient.name}</div>
                                        <div className={cx('detail-ingredients-quantity')}>
                                            {ingredient.quantity} {ingredient.unitName}
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                    <div className={cx('tab-pane', { active: tab === 1 })}>
                        <div className={cx('reviews-wrapper')}>
                            {reviews &&
                                reviews.map((comment, index) => (
                                    <div key={index} className={cx('review-item')}>
                                        <div className={cx('review-name')}>
                                            {comment.name}
                                            <span className={cx('review-date')}>{timeGap(comment.date)}</span>
                                        </div>
                                        <div className={cx('review-content')}>{comment.cmt}</div>
                                    </div>
                                ))}
                            {pageReview < maxPageReview && (
                                <div
                                    onClick={() => setPageReview((prev) => prev + 1)}
                                    className={cx('review-showMore')}
                                >
                                    Show more...
                                </div>
                            )}
                        </div>
                        <div className={cx('review')}>
                            <input onChange={handleChangeInput} value={reviewValue} placeholder="Add a comment..." />
                            {reviewValue && (
                                <button onClick={handleClearReviewValue} className={cx('clear')}>
                                    <AiFillCloseCircle />
                                </button>
                            )}

                            <button
                                onClick={() => postComment()}
                                className={cx('review-btn')}
                                onMouseDown={(e) => e.preventDefault()}
                            >
                                <BiSend />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('detail-img-wrapper')}>
                <div className={cx('detail-title')}>Nutrition</div>
                <div className={cx('detail-nutrition')}>
                    <div className={cx('detail-nutrition__item')}>
                        <FireIcon className={cx('detail-nutrition__icon')} />
                        {data.calories}kcal
                    </div>
                    <div className={cx('detail-nutrition__item')}>
                        <MeatIcon className={cx('detail-nutrition__icon')} />
                        {data.proteins}g proteins
                    </div>
                </div>
                <div className={cx('detail-nutrition')}>
                    <div className={cx('detail-nutrition__item')}>
                        <FatIcon className={cx('detail-nutrition__icon')} />
                        {data.fats}g fats
                    </div>
                    <div className={cx('detail-nutrition__item')}>
                        <RiceBowIcon className={cx('detail-nutrition__icon')} />
                        {data.carbo}g carbo
                    </div>
                </div>
                <Image src={data.image} alt={data.name} className={cx('detail-img')} />
            </div>
        </Modal>
    );
}

export default memo(DetailRecipe);
