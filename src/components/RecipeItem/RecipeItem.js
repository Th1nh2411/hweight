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

    const handleChange = (event) => {
        onChangeEditing(event, data);
    };
    useEffect(() => {
        if (clear) {
            setChecked(false);
        }
    }, [clear]);

    const handleClickRecipe = () => {
        onClickRecipe(data.idRecipe);
    };

    return (
        <div>
            <div onClick={handleClickRecipe} className={cx('wrapper', className, { selected: checked, disableInput })}>
                <div className={cx('info')}>
                    <Image src={data.image} alt={data.name} className={cx('img')} />
                    <div className={cx('desc')}>
                        <h4 id="name" className={cx('name')}>
                            {data.name}
                        </h4>
                        <h5 id="more-info" className={cx('more-info')}>
                            {data.calories} calories
                            <div className={cx('likes-num', 'sep')}>
                                <HeartIcon className={cx('likes-icon')} height="1.6rem" width="1.6rem" />
                                {data.points} likes
                            </div>
                        </h5>
                    </div>
                </div>
                <div className={cx('more-btn')}>
                    {editing && (
                        <Tippy
                            delay={[0, 0]}
                            duration={0}
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
