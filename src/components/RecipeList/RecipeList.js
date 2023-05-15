import styles from './RecipeList.module.scss';
import classNames from 'classnames/bind';
import { RiEditFill, RiQuestionLine } from 'react-icons/ri';
import RecipeItem from '../RecipeItem/RecipeItem';
import { useEffect, useState } from 'react';
import Button from '../Button/Button';
import { FaUndo } from 'react-icons/fa';
import Tippy from '@tippyjs/react';
import * as recipeService from '../../services/recipeService';

import Filter from '../Filter/Filter';

const cx = classNames.bind(styles);
function List({ title, edit = false, listData = [], onEditDone, dayObj, onClickRecipe, children, className }) {
    const [checkedItems, setCheckedItems] = useState([]);
    const [showEdit, setShowEdit] = useState(false);
    const [clear, setClear] = useState(false);
    const [menu, setMenu] = useState([]);
    const [subtitle, setSubtitle] = useState(0);
    const [pageReview, setPageReview] = useState(1);
    const [maxPageReview, setMaxPageReview] = useState();
    const [ingredientsFilter, setIngredientsFilter] = useState('0');
    const [calFilter, setCalFilter] = useState('0,0');

    // const isSelected = (compareItem) => {
    //     console.log(compareItem);
    //     return listData.some((item) => item.idRecipe === compareItem.idRecipe);
    // };
    const getMoreMenuData = async () => {
        const token = localStorage.getItem('token');
        const results = await recipeService.getMenu(token, ingredientsFilter, calFilter, pageReview);
        const filteredMenu = results.recipeJson;
        // .filter(
        //     (menuItem) => !listData.some((recipe) => recipe.idRecipe === menuItem.idRecipe),
        // );
        setMenu((prev) => [...prev, ...filteredMenu]);
    };
    const getFilterMenuData = async () => {
        const token = localStorage.getItem('token');
        const results = await recipeService.getMenu(token, ingredientsFilter, calFilter, 1);
        setPageReview(1);
        const filteredMenu = results.recipeJson;
        // .filter(
        //     (menuItem) => !listData.some((recipe) => recipe.idRecipe === menuItem.idRecipe),
        // );
        setMenu(filteredMenu);
        setMaxPageReview(results.maxPage);
    };
    useEffect(() => {
        if (pageReview !== 1) {
            getMoreMenuData();
        }
    }, [pageReview]);
    useEffect(() => {
        getFilterMenuData();
    }, [ingredientsFilter, calFilter]);
    useEffect(() => {
        setShowEdit(false);
        setCheckedItems([]);
    }, [dayObj]);
    const onClickEdit = () => {
        if (!showEdit) {
            setShowEdit(true);
            setCheckedItems(listData);
            // setMenu((prev) => [...listData, ...prev]);
            getFilterMenuData();
        } else {
            setMenu([]);
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
            if (listData) {
                listData.forEach((item) => {
                    numCalo += item.calories;
                });
            }
            setSubtitle(numCalo);
        }
    }, [showEdit, checkedItems, listData]);

    const handleCheckboxChange = (e, data) => {
        if (e.target.checked) {
            setCheckedItems((prev) => [...prev, data]);
            setClear(false);
        } else if (!e.target.checked) {
            const newItems = checkedItems.filter((item) => item.idRecipe !== data.idRecipe);
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
    const handleFilterValue = (ingredients, minCal, maxCal) => {
        const ingredientString = ingredients.map((ingredient) => ingredient.idIngredient).join(',');
        const CalFilterString = `${minCal},${maxCal}`;
        setIngredientsFilter(ingredientString);
        setCalFilter(CalFilterString);
    };
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
            {showEdit && <Filter onChangeFilter={handleFilterValue} />}

            <div className={cx('body')}>
                {showEdit ? (
                    <div>
                        <div className={cx('menu-list')}>
                            {/* {listData.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <RecipeItem
                                            onLiked={handleLiked}
                                            onClickRecipe={onClickRecipe}
                                            data={item}
                                            editing
                                            onChangeEditing={handleCheckboxChange}
                                            selected
                                            clear={clear}
                                        />
                                    </div>
                                );
                            })} */}
                            {checkedItems
                                // .filter((item) => !listData.some((recipe) => recipe.idRecipe === item.idRecipe))
                                .map((item, index) => {
                                    return (
                                        <div key={index}>
                                            <RecipeItem
                                                onLiked={handleLiked}
                                                onClickRecipe={onClickRecipe}
                                                data={item}
                                                editing
                                                onChangeEditing={handleCheckboxChange}
                                                selected
                                                clear={clear}
                                            />
                                        </div>
                                    );
                                })}
                            {menu
                                .filter((menuItem) => !checkedItems.some((item) => item.idRecipe === menuItem.idRecipe))
                                .map((item, index) => {
                                    return (
                                        <div key={index}>
                                            <RecipeItem
                                                onLiked={handleLiked}
                                                onClickRecipe={onClickRecipe}
                                                data={item}
                                                editing
                                                onChangeEditing={handleCheckboxChange}
                                                clear={clear}
                                            />
                                        </div>
                                    );
                                })}
                            {pageReview < maxPageReview && (
                                <div
                                    onClick={() => {
                                        setPageReview((prev) => prev + 1);
                                    }}
                                    className={cx('menu-showMore')}
                                >
                                    Show more...
                                </div>
                            )}
                        </div>
                        <div className={cx('menu-btn')}>
                            <Button
                                onClick={() => {
                                    setShowEdit(false);
                                    setMenu([]);
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
                    listData &&
                    listData.map((recipe, index) => (
                        <RecipeItem onClickRecipe={onClickRecipe} key={index} data={recipe} />
                    ))
                )}
            </div>
        </div>
    );
}

export default List;
