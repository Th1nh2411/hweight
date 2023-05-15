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
    const updateRecipesData = async (newRecipes) => {
        const token = localStorage.getItem('token');
        const results = await recipeService.updateRecipes(newRecipes, dayObj.format('YYYY-MM-DD'), token);
    };
    useEffect(() => {
        getRecipesData(dayObj.format('YYYY-MM-DD'));
    }, [dayObj]);

    const handleSubmitEdit = (type) => async (checkedItems) => {
        const idListRecipe = { ...recipes };
        Object.keys(idListRecipe).forEach((key) => {
            // Thay đổi giá trị của key
            idListRecipe[key] = idListRecipe[key].map((recipe) => recipe.idRecipe).join(',');
        });

        const newRecipes = { ...idListRecipe, [type]: checkedItems.map((item) => item.idRecipe).join(',') };
        setRecipes((prev) => ({ ...prev, [type]: checkedItems }));
        updateRecipesData(newRecipes);
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
                    onEditDone={handleSubmitEdit('breakfast')}
                    edit
                    listData={recipes.breakfast}
                    title="Breakfast"
                    dayObj={dayObj}
                    onClickRecipe={getDetailRecipeData}
                />
                <RecipeList
                    onEditDone={handleSubmitEdit('lunch')}
                    edit
                    listData={recipes.lunch}
                    title="Lunch"
                    onClickRecipe={getDetailRecipeData}
                />

                <RecipeList
                    onEditDone={handleSubmitEdit('dinner')}
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
