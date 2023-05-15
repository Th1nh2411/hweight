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
    const [showDetailRecipe, setShowDetailRecipe] = useState(false);
    const [detailRecipe, setDetailRecipe] = useState({});

    const getRecipesData = async (day) => {
        const token = localStorage.getItem('token');
        const results = await recipeService.getRecipe(day, token);
        setRecipes(results);
    };

    const getDetailRecipeData = async (id) => {
        const token = localStorage.getItem('token');
        const results = await recipeService.getDetailRecipe(id, token);
        setDetailRecipe(results.recipe);
        setShowDetailRecipe(true);
    };
    useEffect(() => {
        getRecipesData(dayObj.format('YYYY-MM-DD'));
    }, [dayObj]);

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
        const results = await recipeService.updateRecipes(newRecipes, dayObj.format('YYYY-MM-DD'), token);
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
                    onEditDone={handleSubmitEdit(1)}
                    edit
                    listData={recipes.breakfast}
                    title="Breakfast"
                    dayObj={dayObj}
                    onClickRecipe={getDetailRecipeData}
                />
                <RecipeList
                    onEditDone={handleSubmitEdit(2)}
                    edit
                    listData={recipes.lunch}
                    title="Lunch"
                    onClickRecipe={getDetailRecipeData}
                />

                <RecipeList
                    onEditDone={handleSubmitEdit(3)}
                    edit
                    listData={recipes.dinner}
                    title="Dinner"
                    onClickRecipe={getDetailRecipeData}
                />
            </div>
        </Card>
    );
}

export default Recipe;
