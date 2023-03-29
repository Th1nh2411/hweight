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
    const getRecipesData = async () => {
        const token = localStorage.getItem('token');
        const results = await recipeService.getRecipe(token);
        setRecipes(results);
    };
    const getMenuData = async () => {
        const token = localStorage.getItem('token');
        const results = await recipeService.getMenu(token);
        setMenu(results);
    };
    useEffect(() => {
        getRecipesData();
    }, []);
    useEffect(() => {
        getMenuData();
    }, []);
    const handleSubmitEdit = (type) => async (checkedItems) => {
        const newRecipes = recipes
            .filter((item) => item.type !== type)
            .concat(
                checkedItems.map((recipe) => {
                    return { ...recipe, type: type };
                }),
            );
        setRecipes(newRecipes);
        const token = localStorage.getItem('token');
        console.log(recipes);
        const results = await recipeService.updateRecipe(newRecipes, token);
        console.log(results);
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
                <RecipeList
                    menuData={menu}
                    onEditDone={handleSubmitEdit(1)}
                    edit
                    listData={recipes.filter((recipe) => recipe.type === 1)}
                    title="Breakfast"
                    subtitle="200kcal"
                />
                <RecipeList
                    menuData={menu}
                    onEditDone={handleSubmitEdit(2)}
                    edit
                    listData={recipes.filter((recipe) => recipe.type === 2)}
                    title="Lunch"
                    subtitle="500kcal"
                />

                <RecipeList
                    menuData={menu}
                    onEditDone={handleSubmitEdit(3)}
                    edit
                    listData={recipes.filter((recipe) => recipe.type === 3)}
                    title="Dinner"
                    subtitle="400kcal"
                />
            </div>
        </Card>
    );
}

export default Recipe;
