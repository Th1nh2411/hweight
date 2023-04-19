import styles from './RecipeList.module.scss';
import classNames from 'classnames/bind';
import { RiEditFill, RiQuestionLine } from 'react-icons/ri';
import RecipeItem from '../RecipeItem/RecipeItem';
import { useEffect, useRef, useState } from 'react';
import Button from '../Button/Button';
import { FaUndo } from 'react-icons/fa';
import Tippy from '@tippyjs/react';

const cx = classNames.bind(styles);
function List({ title, edit = false, listData, menuData, onEditDone, dayObj, children, className }) {
    const minCalories = 10;
    const maxCalories = 400;
    const [checkedItems, setCheckedItems] = useState([]);
    const [showEdit, setShowEdit] = useState(false);
    const [clear, setClear] = useState(false);
    const [menu, setMenu] = useState([]);
    const [minCaloriesValue, setMinCaloriesValue] = useState(minCalories);
    const [maxCaloriesValue, setMaxCaloriesValue] = useState(maxCalories);
    const [subtitle, setSubtitle] = useState(0);

    const isSelected = (compareItem) => {
        return listData.some((item) => item.id === compareItem.id);
    };
    useEffect(() => {
        setShowEdit(false);
        setCheckedItems([]);
    }, [dayObj]);
    const onClickEdit = () => {
        if (!showEdit) {
            setShowEdit(true);
            const newMenuData = menuData.slice();
            setMenu(newMenuData);
            menuData.forEach((item, index) => {
                if (isSelected(item)) {
                    newMenuData.splice(0, 0, newMenuData.splice(index, 1)[0]);
                    setMenu(newMenuData);
                    setCheckedItems((prev) => [...prev, item]);
                }
            });
        } else {
            setShowEdit(false);
            setCheckedItems([]);
            setClear(false);
        }
    };
    useEffect(() => {
        if (showEdit) {
            let numCalo = 0;
            checkedItems.forEach((item) => {
                numCalo += item.calories;
            });
            setSubtitle(numCalo);
        } else {
            let numCalo = 0;
            listData.forEach((item) => {
                numCalo += item.calories;
            });
            setSubtitle(numCalo);
        }
    }, [showEdit, checkedItems, listData]);
    const handleCheckboxChange = (e, data) => {
        if (e.target.checked) {
            setCheckedItems((prev) => [...prev, data]);
            setClear(false);
        } else if (!e.target.checked) {
            const newItems = checkedItems.filter((item) => item.id !== data.id);
            setCheckedItems(newItems);
        }
    };
    const handleSubmitUpdate = () => {
        onEditDone(checkedItems);
        setShowEdit(false);
        setCheckedItems([]);
    };
    const handleLiked = (id, isLiked) => {
        menu.forEach((item, index) => {
            if (id === item.id) {
                item.isLiked = isLiked;
                console.log(menu, [...menu, item]);
                setMenu([...menu, item]);
            }
        });
    };
    const calcLeftPosition = (value) => (100 / (maxCalories - minCalories)) * (value - minCalories);
    console.log(minCalories, maxCalories);
    return (
        <div className={cx('wrapper', className)}>
            <div className={cx('header')}>
                <h5 className={cx('title')}>
                    {title}
                    {edit && (
                        <Tippy placement="bottom" content={showEdit ? 'Cancel Edit' : 'Edit meals'}>
                            <div className={cx('title-icon')}>
                                <RiEditFill onClick={onClickEdit} />
                            </div>
                        </Tippy>
                    )}
                </h5>
                <div className={cx('subtitle')}>
                    {showEdit && (
                        <Tippy placement="bottom" content="Clear all meals">
                            <div className={cx('clear-icon')}>
                                <FaUndo
                                    onClick={() => {
                                        setCheckedItems([]);
                                        setClear(true);
                                    }}
                                />
                            </div>
                        </Tippy>
                    )}

                    <div className={cx('invisible', 'subtitle-text', { warning: subtitle > 800 })}>
                        {subtitle} calories
                    </div>
                    {subtitle > 800 && (
                        <Tippy
                            placement="bottom"
                            content="Eating more than 1000 calories in a meal will likely cause a surplus of energy."
                        >
                            <div className={cx('warning-detail-icon')}>
                                <RiQuestionLine />
                            </div>
                        </Tippy>
                    )}
                </div>
            </div>
            <div className={cx('filter-wrapper')}>
                <p className={cx('filter-title')}>Filter </p>
                <div className={cx('calories-filter')}>
                    <p className={cx('filter-subtitle')}>Calories : </p>
                    <div className={cx('calories-filter-progressBar')}>
                        <div className={cx('range-slide')}>
                            <div className={cx('slide')}>
                                <div
                                    className={cx('line')}
                                    id="line"
                                    style={{
                                        left: calcLeftPosition(minCaloriesValue) + '%',
                                        right: 100 - calcLeftPosition(maxCaloriesValue) + '%',
                                    }}
                                ></div>
                                <span
                                    className={cx('thumb')}
                                    id="thumbMin"
                                    style={{ left: calcLeftPosition(minCaloriesValue) + '%' }}
                                ></span>
                                <span
                                    className={cx('thumb')}
                                    id="thumbMax"
                                    style={{ left: calcLeftPosition(maxCaloriesValue) + '%' }}
                                ></span>
                            </div>
                            <input
                                type="range"
                                min={minCalories}
                                max={maxCalories}
                                value={minCaloriesValue}
                                onChange={(event) => {
                                    setMinCaloriesValue(event.target.value);
                                }}
                            />
                            <input
                                type="range"
                                min={minCalories}
                                max={maxCalories}
                                value={maxCaloriesValue}
                                onChange={(event) => setMaxCaloriesValue(event.target.value)}
                            />
                        </div>
                    </div>
                    <div className={cx('calories-display')}>
                        <span id="min">{minCaloriesValue}</span>
                        <span id="max">{maxCaloriesValue}</span>
                    </div>
                </div>
                <div className={cx('ingredients-filter')}></div>
            </div>
            <div className={cx('body')}>
                {showEdit ? (
                    <div>
                        <div className={cx('menu-list')}>
                            {menu.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <RecipeItem
                                            onLiked={handleLiked}
                                            data={item}
                                            editing
                                            onChangeEditing={handleCheckboxChange}
                                            selected={isSelected(item)}
                                            clear={clear}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                        <div className={cx('menu-btn')}>
                            <Button
                                onClick={() => {
                                    setShowEdit(false);
                                    setCheckedItems([]);
                                }}
                                className={cx('confirm-btn')}
                            >
                                Cancel
                            </Button>
                            <Button onClick={handleSubmitUpdate} primary className={cx('confirm-btn')}>
                                Confirm
                            </Button>
                        </div>
                    </div>
                ) : (
                    listData.map((recipe, index) => <RecipeItem key={index} data={recipe} />)
                )}
            </div>
        </div>
    );
}

export default List;
