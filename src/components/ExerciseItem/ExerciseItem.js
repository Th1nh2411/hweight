import styles from './ExerciseItem.module.scss';
import classNames from 'classnames/bind';
import Image from '../Image';
import { Link } from 'react-router-dom';
import { AiOutlineRightCircle } from 'react-icons/ai';
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import Modal from '../Modal/Modal';
import { FatIcon, FireIcon, HeartIcon, MeatIcon, RiceBowIcon } from '../Icons/Icons';
import Tippy from '@tippyjs/react';
import * as RecipeService from '../../services/recipeService';
const cx = classNames.bind(styles);

function Item({
    data,
    day,
    clear = false,
    selected = false,
    editing = false,
    onChangeEditing,
    disableInput = false,
    onLiked,
    className,
}) {
    const [checked, setChecked] = useState(selected);
    const [showModalDetail, setShowModalDetail] = useState();
    const [isLiked, setIsLiked] = useState(data.isLiked);
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
        setShowModalDetail(true);
    };
    const handleLike = () => {
        setIsLiked(!isLiked);
        const results = RecipeService.updateMenuItem(data.id, { isLiked: !isLiked });
        // if (day) {
        //     const results = RecipeService.updateRecipesItem(day.format('DDMMYYYY'), data.id, { isLiked: !isLiked });
        // }
        onLiked(data.id, !isLiked);
        console.log(results);
    };
    return (
        <div>
            {showModalDetail && (
                <Modal className={cx('detail-wrapper')} handleCloseModal={() => setShowModalDetail(false)}>
                    <div className={cx('detail-body')}>
                        <div className={cx('detail-body__name')}>
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
                        <div className={cx('detail-title')}>Nutrition</div>
                        <div className={cx('detail-nutrition')}>
                            <div className={cx('detail-nutrition__item')}>
                                <MeatIcon className={cx('detail-nutrition__icon')} />
                                {data.proteins}g proteins
                            </div>
                            <div className={cx('detail-nutrition__item')}>
                                <FireIcon className={cx('detail-nutrition__icon')} />
                                {data.calories}kcal
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
                        <div className={cx('detail-title')}>Ingredients you need</div>
                        <div className={cx('detail-ingredients__list')}>
                            {data.ingredients.map((ingredient, index) => (
                                <div key={index} className={cx('detail-ingredients__item')}>
                                    <Image className={cx('ingredient-img')} src={ingredient.img} />
                                    <div className={cx('ingredients-name')}>{ingredient.name}</div>
                                    <div className={cx('ingredients-quantity')}>
                                        {ingredient.quantity} {ingredient.unit}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <Image src={data.img} alt={data.name} className={cx('detail-img')} />
                </Modal>
            )}
            <div onClick={handleClickRecipe} className={cx('wrapper', className, { selected: checked, disableInput })}>
                <div className={cx('info')}>
                    <Image src={data.img} alt={data.name} className={cx('img')} />
                    <div className={cx('desc')}>
                        <h4 id="name" className={cx('name')}>
                            {data.name}
                        </h4>
                        <h5 id="time-eat" className={cx('time')}>
                            {data.calories} kcal
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

export default Item;
