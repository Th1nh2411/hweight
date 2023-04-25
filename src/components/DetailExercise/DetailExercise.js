import styles from './DetailExercise.module.scss';
import classNames from 'classnames/bind';
import Image from '../Image';
import { AiFillCloseCircle } from 'react-icons/ai';
import { BiSend } from 'react-icons/bi';
import { memo, useEffect, useState } from 'react';
import Modal from '../Modal/Modal';
import { DairyIcon, EvaluateIcon, FatIcon, FireIcon, HeartIcon, MeatIcon, RiceBowIcon } from '../Icons/Icons';
import Tippy from '@tippyjs/react';
import * as RecipeService from '../../services/recipeService';
import { IoFitnessSharp } from 'react-icons/io5';
import ExerciseItem from '../ExerciseItem';
import Button from '../Button/Button';
import images from '../../assets/images';
import { HiClipboardDocumentCheck } from 'react-icons/hi2';
const cx = classNames.bind(styles);

function DetailExercise({ data = {}, onCloseModal, updateCalOut }) {
    const [showConfirm, setShowConfirm] = useState(false);
    const [isLiked, setIsLiked] = useState(data.isLiked);
    const [tab, setTab] = useState(0);
    const [review, setReviewValue] = useState('');
    const [leftLine, setLeftLine] = useState('');
    const [widthLine, setWidthLine] = useState('');
    const [showMoreReview, setShowMoreReview] = useState(false);
    // useEffect(()=>{},[show])
    const handleLike = () => {
        setIsLiked(!isLiked);
        const results = RecipeService.updateMenuItem(data.id, { isLiked: !isLiked });
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
        <Modal
            className={cx('detail-wrapper')}
            handleClickOutside={() => {
                onCloseModal();
            }}
        >
            {showConfirm && (
                <Modal className={cx('confirm-wrapper')} handleCloseModal={() => setShowConfirm(false)}>
                    <div className={cx('confirm-img-wrapper')}>
                        <Image className={cx('confirm-img')} src={images.running} />
                    </div>
                    <div className={cx('confirm-title')}>
                        Confirm that you have done this exercise? The amount of calories out when doing this exercise is{' '}
                        {data.calories} calories
                    </div>
                    <div className={cx('confirm-btn-wrapper')}>
                        <Button onClick={() => setShowConfirm(false)}>Cancel</Button>
                        <Button
                            onClick={() => {
                                setShowConfirm(false);
                                updateCalOut(data.calories);
                            }}
                            primary
                        >
                            Confirm
                        </Button>
                    </div>
                </Modal>
            )}
            <div
                className={cx('done-btn')}
                onClick={(event) => {
                    setShowConfirm(true);
                    event.stopPropagation();
                }}
            >
                Done
                <HiClipboardDocumentCheck className={cx('done-icon')} />
            </div>
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
                    <HeartIcon className={cx('likes-icon')} height="1.6rem" width="1.6rem" /> {data.likes} people love
                    this
                </div>
                {/* <h5 className={cx('detail-title')}>Essential equipments</h5>
                <div className={cx('equipment-list')}>
                    {data.equipments.map((equipment, index) => (
                        <div key={index} className={cx('equipment-item')}>
                            <Image className={cx('equipment-img')} src={equipment.img} />
                            <div className={cx('equipment-name')}>{equipment.name}</div>
                        </div>
                    ))}
                </div> */}
                <div className={cx('tabs-wrapper')}>
                    {data.sets.map((set, index) => (
                        <div
                            key={index}
                            onClick={(event) => {
                                setTab(index);
                                setLeftLine(event.target.offsetLeft + 'px');
                                setWidthLine(event.target.offsetWidth + 'px');
                            }}
                            className={cx('tab-item', { active: tab === index })}
                        >
                            <IoFitnessSharp className={cx('tab-icon')} />
                            Set {index + 1}
                        </div>
                    ))}
                    <div
                        onClick={(event) => {
                            setTab(data.sets.length + 1);
                            setLeftLine(event.target.offsetLeft + 'px');
                            setWidthLine(event.target.offsetWidth + 'px');
                        }}
                        className={cx('tab-item', { active: tab === data.sets.length + 1 })}
                    >
                        <EvaluateIcon className={cx('tab-icon')} />
                        Evaluate recipe
                    </div>
                    <div className={cx('line')} style={{ left: leftLine, width: widthLine }}></div>
                </div>
                <div className={cx('tabs-content')}>
                    {data.sets.map((set, index) => (
                        <div className={cx('tab-pane', { active: tab === index })} key={index}>
                            <div className={cx('exercises-list')}>
                                {set.map((movement, index) => (
                                    <ExerciseItem key={index} data={movement} />
                                ))}
                            </div>
                        </div>
                    ))}
                    <div className={cx('tab-pane', { active: tab === data.sets.length + 1 })}>
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
            <div className={cx('detail-img-wrapper')}>
                <h5 className={cx('detail-title')}>Essential equipments</h5>
                <div className={cx('equipment-list')}>
                    {data.equipments.map((equipment, index) => (
                        <div key={index} className={cx('equipment-item')}>
                            <Image className={cx('equipment-img')} src={equipment.img} />
                            <div className={cx('equipment-name')}>{equipment.name}</div>
                        </div>
                    ))}
                </div>
                <Image src={data.img} alt={data.name} className={cx('detail-img')} />
            </div>
        </Modal>
    );
}

export default memo(DetailExercise);
