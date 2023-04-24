import styles from './RecipeItem.module.scss';
import classNames from 'classnames/bind';
import Image from '../Image';
import { Link } from 'react-router-dom';
import { AiFillCloseCircle, AiOutlineRightCircle, AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai';
import { BiSend } from 'react-icons/bi';
import { memo, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Modal from '../Modal/Modal';
import { DairyIcon, EvaluateIcon, FatIcon, FireIcon, HeartIcon, MeatIcon, RiceBowIcon } from '../Icons/Icons';
import Tippy from '@tippyjs/react';
import * as RecipeService from '../../services/recipeService';
const cx = classNames.bind(styles);

function Item({
    data,
    clear = false,
    selected = false,
    editing = false,
    onChangeEditing,
    disableInput = false,
    onLiked,
    onClickRecipe,
    className,
}) {
    const [checked, setChecked] = useState(selected);
    // const [showModalDetail, setShowModalDetail] = useState();
    const [isLiked, setIsLiked] = useState(data.isLiked);
    const [tab, setTab] = useState(0);
    const [review, setReviewValue] = useState('');
    const [leftLine, setLeftLine] = useState('');
    const [widthLine, setWidthLine] = useState('');
    const [showMoreReview, setShowMoreReview] = useState(false);

    const handleChange = (event) => {
        setChecked(event.target.checked);
        onChangeEditing(event, data);
    };
    useEffect(() => {
        if (clear) {
            setChecked(false);
        }
    }, [clear]);

    const handleClickRecipe = () => {
        onClickRecipe(data.id);
    };
    const handleLike = () => {
        setIsLiked(!isLiked);
        const results = RecipeService.updateMenuItem(data.id, { isLiked: !isLiked });
        onLiked(data.id, !isLiked);
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
    return (
        <div>
            {/* {showModalDetail && (
                <Modal className={cx('detail-wrapper')} handleClickOutside={() => setShowModalDetail(false)}>
                    <div className={cx('detail-body')}>
                        <div className={cx('detail-name')}>
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
                            <HeartIcon className={cx('likes-icon')} height="1.6rem" width="1.6rem" /> {data.likes}{' '}
                            people love this
                        </div>
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
                            <div className={cx('detail-nutrition__item')}>
                                <FatIcon className={cx('detail-nutrition__icon')} />
                                {data.fat}g fats
                            </div>
                            <div className={cx('detail-nutrition__item')}>
                                <RiceBowIcon className={cx('detail-nutrition__icon')} />
                                {data.carbo}g carbo
                            </div>
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
                                    {data.ingredients.map((ingredient, index) => (
                                        <div key={index} className={cx('detail-ingredients__item')}>
                                            <Image className={cx('detail-ingredient-img')} src={ingredient.img} />
                                            <div className={cx('detail-ingredients-name')}>{ingredient.name}</div>
                                            <div className={cx('detail-ingredients-quantity')}>
                                                {ingredient.quantity} {ingredient.unit}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className={cx('tab-pane', { active: tab === 1 })}>
                                <div className={cx('reviews-wrapper')}>
                                    {data.comments.map((comment, index) => (
                                        <div key={index} className={cx('review-item')}>
                                            <div className={cx('review-name')}>{comment.username}</div>
                                            <div className={cx('review-content')}>{comment.content}</div>
                                        </div>
                                    ))}
                                    <div className={cx('review-showMore')}>Show more...</div>
                                </div>
                                <div className={cx('review')}>
                                    <input onChange={handleChangeInput} value={review} placeholder="Add a comment..." />
                                    {review && (
                                        <button onClick={handleClearReviewValue} className={cx('clear')}>
                                            <AiFillCloseCircle />
                                        </button>
                                    )}

                                    <button className={cx('review-btn')} onMouseDown={(e) => e.preventDefault()}>
                                        <BiSend />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Image src={data.img} alt={data.name} className={cx('detail-img')} />
                </Modal>
            )} */}
            <div onClick={handleClickRecipe} className={cx('wrapper', className, { selected: checked, disableInput })}>
                <div className={cx('info')}>
                    <Image src={data.img} alt={data.name} className={cx('img')} />
                    <div className={cx('desc')}>
                        <h4 id="name" className={cx('name')}>
                            {data.name}
                        </h4>
                        <h5 id="more-info" className={cx('more-info')}>
                            {data.calories} calories
                            <div className={cx('likes-num', 'sep')}>
                                <HeartIcon className={cx('likes-icon')} height="1.6rem" width="1.6rem" />
                                {data.likes} likes
                            </div>
                        </h5>
                    </div>
                </div>
                <div className={cx('more-btn')}>
                    {editing && (
                        <Tippy
                            delay={[0, 0]}
                            offset={[0, -4]}
                            placement="bottom"
                            content={checked ? 'Remove from meal' : 'Add to meal'}
                        >
                            <label
                                onClick={(event) => {
                                    event.stopPropagation();
                                }}
                                className={cx('item-checkbox')}
                            >
                                <input
                                    type="checkbox"
                                    disabled={disableInput && !checked}
                                    name={data.id}
                                    checked={checked}
                                    onChange={handleChange}
                                />
                                {checked ? <AiOutlineMinusCircle /> : <AiOutlinePlusCircle />}
                            </label>
                        </Tippy>
                    )}
                    <AiOutlineRightCircle />
                </div>
            </div>
        </div>
    );
}

export default memo(Item);
