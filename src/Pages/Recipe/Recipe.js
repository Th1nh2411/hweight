import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Recipe.module.scss';
import Card from '../../components/Card';
import Calendar from '../../components/Calendar';
import RecipeList from '../../components/RecipeList/RecipeList';
import RecipeItem from '../../components/RecipeItem/RecipeItem';
import * as recipeService from '../../services/recipeService';
import { RecipeIcon } from '../../components/Icons/Icons';
import Button from '../../components/Button/Button';
import Modal from '../../components/Modal/Modal';
import dayjs from 'dayjs';

const cx = classNames.bind(styles);

function Recipe() {
    const [dayObj, setDayObj] = useState(dayjs());
    const [recipes, setRecipes] = useState([]);
    const [menu, setMenu] = useState([]);
    const getRecipesData = async (day) => {
        const token = localStorage.getItem('token');
        const results = await recipeService.getRecipe(day, token);
        setRecipes(results);
    };
    const getMenuData = async () => {
        const token = localStorage.getItem('token');
        const results = await recipeService.getMenu(token);
        setMenu(results);
    };
    useEffect(() => {
        getRecipesData(dayObj.format('DDMMYYYY'));
    }, [dayObj]);
    useEffect(() => {
        getMenuData();
    }, []);
    // useEffect(() => {
    //     console.log(recipes, menu);
    //     recipes.forEach((recipe) => {
    //         menu.forEach((item) => {
    //             if (recipe.id === item.id) {
    //                 setRecipes([...recipes, { id: recipe.id, ...item }]);
    //             }
    //         });
    //     });
    // }, [menu]);
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
        const results = await recipeService.updateRecipes(newRecipes, dayObj.format('DDMMYYYY'), token);
    };
    const handleDayChange = (dayChange) => {
        setDayObj(dayChange);
    };

    return (
        <Card className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('title')}>
                    Daily Recipe <RecipeIcon height="30px" className={cx('title-icon')} width="30px" />
                </div>
                <Calendar onDayChange={handleDayChange} />
            </div>
            <div className={cx('body')}>
                <RecipeList
                    menuData={menu}
                    onEditDone={handleSubmitEdit(1)}
                    edit
                    listData={recipes.filter((recipe) => recipe.type === 1)}
                    title="Breakfast"
                    dayObj={dayObj}
                />
                <RecipeList
                    menuData={menu}
                    onEditDone={handleSubmitEdit(2)}
                    edit
                    listData={recipes.filter((recipe) => recipe.type === 2)}
                    title="Lunch"
                />

                <RecipeList
                    menuData={menu}
                    onEditDone={handleSubmitEdit(3)}
                    edit
                    listData={recipes.filter((recipe) => recipe.type === 3)}
                    title="Dinner"
                />
            </div>
        </Card>
    );
}

export default Recipe;
