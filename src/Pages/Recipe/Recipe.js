import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Recipe.module.scss';
import Card from '../../components/Card';
import Calendar from '../../components/Calendar';
import RecipeList from '../../components/List/List';
import RecipeItem from '../../components/Item/Item';
import * as recipeService from '../../services/recipeService';
import { RecipeIcon } from '../../components/Icons/Icons';
import Button from '../../components/Button/Button';
import Modal from '../../components/Modal/Modal';

const cx = classNames.bind(styles);

function Recipe() {
    const [recipes, setRecipes] = useState([]);
    const [menu, setMenu] = useState([]);
    const [editBF, setEditBF] = useState(false);
    const [checkedCount, setCheckedCount] = useState(0);
    const [checkedItems, setCheckedItems] = useState([]);
    useEffect(() => {
        const getRecipesData = async () => {
            const token = localStorage.getItem('token');
            const results = await recipeService.getRecipe(token);
            setRecipes(results);
        };
        getRecipesData();
    }, [editBF]);
    useEffect(() => {
        const getMenuData = async () => {
            const token = localStorage.getItem('token');
            const results = await recipeService.getMenu(token);
            setMenu(results);
        };
        getMenuData();
    }, []);
    const onEditing = () => {
        if (!editBF) {
            setEditBF(true);
            menu.forEach((item) => {
                if (isSelected(1, item)) {
                    setCheckedCount((prev) => prev + 1);
                    item.type = 1;
                    setCheckedItems((prev) => [...prev, item]);
                }
            });
        }
    };
    const isSelected = (type, item) => {
        return recipes.some((recipe) => recipe.type === type && recipe.id === item.id);
    };
    const handleCheckboxChange = (e, data) => {
        if (e.target.checked) {
            setCheckedCount(checkedCount + 1);
            data.type = 1;
            setCheckedItems((prev) => [...prev, data]);
        } else if (!e.target.checked) {
            setCheckedCount(checkedCount - 1);
            const newItems = checkedItems.filter((item) => item.id !== data.id);
            setCheckedItems(newItems);
        }
    };
    const handleSumitUpdate = async (type) => {
        const newRecipes = recipes.filter((item) => item.type !== type).concat(checkedItems);

        console.log(newRecipes);
        const token = localStorage.getItem('token');
        // fixx put method
        // await recipeService.deleteRecipe(token);
        const results = await recipeService.updateRecipe(newRecipes, token);
        console.log(results);
        setEditBF(false);
        setCheckedCount(0);
        setCheckedItems([]);
    };
    return (
        <Card className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('title')}>
                    Daily Recipe <RecipeIcon height="30px" className={cx('title-icon')} width="30px" />
                </div>
                <Calendar />
            </div>
            <div className={cx('body')}>
                <RecipeList edit onClickEdit={onEditing} title="Breakfast" subtitle="200kcal">
                    {editBF ? (
                        <div>
                            <div className={cx('menu-list')}>
                                {menu.map((item, index) => {
                                    return (
                                        <div key={index}>
                                            <RecipeItem
                                                data={item}
                                                editing
                                                onChangeEditing={handleCheckboxChange}
                                                disableInput={checkedCount >= 3}
                                                selected={isSelected(1, item)}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                            <div className={cx('menu-btn')}>
                                <Button
                                    onClick={() => {
                                        setEditBF(false);
                                        setCheckedCount(0);
                                        setCheckedItems([]);
                                    }}
                                    className={cx('confirm-btn')}
                                >
                                    Cancel
                                </Button>
                                <Button onClick={() => handleSumitUpdate(1)} primary className={cx('confirm-btn')}>
                                    Confirm
                                </Button>
                            </div>
                        </div>
                    ) : (
                        recipes.map((recipe, index) => {
                            if (recipe.type === 1) {
                                return <RecipeItem key={index} data={recipe} />;
                            }
                            return '';
                        })
                    )}
                </RecipeList>
                <RecipeList edit title="Lunch" subtitle="500kcal">
                    {recipes.map((recipe, index) => {
                        if (recipe.type === 2) {
                            return <RecipeItem key={index} data={recipe} />;
                        }
                        return '';
                    })}
                </RecipeList>
                <RecipeList edit title="Supper" subtitle="300kcal">
                    {recipes.map((recipe, index) => {
                        if (recipe.type === 3) {
                            return <RecipeItem key={index} data={recipe} />;
                        }
                        return '';
                    })}
                </RecipeList>
                <RecipeList edit title="Dinner" subtitle="400kcal">
                    {recipes.map((recipe, index) => {
                        if (recipe.type === 4) {
                            return <RecipeItem key={index} data={recipe} />;
                        }
                        return '';
                    })}
                </RecipeList>
            </div>
        </Card>
    );
}

export default Recipe;
