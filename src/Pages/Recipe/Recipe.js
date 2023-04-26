import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Recipe.module.scss';
import Card from '../../components/Card';
import Calendar from '../../components/Calendar';
import RecipeList from '../../components/RecipeList/RecipeList';
import * as recipeService from '../../services/recipeService';
import { RecipeIcon } from '../../components/Icons/Icons';
import dayjs from 'dayjs';
import DetailRecipe from '../../components/DetailRecipe/DetailRecipe';

const cx = classNames.bind(styles);

function Recipe() {
    const [dayObj, setDayObj] = useState(dayjs());
    const [recipes, setRecipes] = useState([]);
    const [menu, setMenu] = useState([]);
    const [showDetailRecipe, setShowDetailRecipe] = useState(false);
    const [detailRecipe, setDetailRecipe] = useState({});

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
    const getDetailRecipeData = async (id) => {
        const token = localStorage.getItem('token');
        const results = await recipeService.getDetailRecipe(id, token);
        setDetailRecipe(results);
        setShowDetailRecipe(true);
    };
    useEffect(() => {
        getRecipesData(dayObj.format('DDMMYYYY'));
    }, [dayObj]);
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
        const results = await recipeService.updateRecipes(newRecipes, dayObj.format('DDMMYYYY'), token);
    };
    const handleDayChange = (dayChange) => {
        setDayObj(dayChange);
    };

    return (
        <Card className={cx('wrapper')}>
            {showDetailRecipe && (
                <DetailRecipe
                    data={detailRecipe}
                    show={showDetailRecipe}
                    onCloseModal={() => setShowDetailRecipe(false)}
                />
            )}
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
                    onClickRecipe={getDetailRecipeData}
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
