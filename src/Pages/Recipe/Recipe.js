import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './Recipe.module.scss';
import Card from '../../components/Card';
import Calendar from '../../components/Calendar';
import RecipeList from '../../components/List/List';
import RecipeItem from '../../components/Item/Item';
import * as recipeService from '../../services/recipeService';
import { RecipeIcon } from '../../components/Icons/Icons';

const cx = classNames.bind(styles);

function Recipe() {
    const [recipes, setRecipe] = useState([]);
    useEffect(() => {
        const getRecipesData = async () => {
            const token = localStorage.getItem('token');
            const results = await recipeService.getRecipe(token);
            setRecipe(results);
        };
        getRecipesData();
    }, []);
    console.log(recipes);
    return (
        <Card className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('title')}>
                    Daily Recipe <RecipeIcon height="30px" className={cx('title-icon')} width="30px" />
                </div>
                <Calendar />
            </div>
            <div className={cx('body')}>
                <RecipeList title="Breakfast" subtitle="200kcal">
                    {recipes.map((recipe, index) => {
                        if (recipe.type === 1) {
                            return <RecipeItem key={index} data={recipe} />;
                        }
                    })}
                </RecipeList>
                <RecipeList title="Lunch" subtitle="500kcal">
                    {recipes.map((recipe, index) => {
                        if (recipe.type === 2) {
                            return <RecipeItem key={index} data={recipe} />;
                        }
                    })}
                </RecipeList>
                <RecipeList title="Supper" subtitle="300kcal">
                    {recipes.map((recipe, index) => {
                        if (recipe.type === 3) {
                            return <RecipeItem key={index} data={recipe} />;
                        }
                    })}
                </RecipeList>
                <RecipeList title="Dinner" subtitle="400kcal">
                    {recipes.map((recipe, index) => {
                        if (recipe.type === 4) {
                            return <RecipeItem key={index} data={recipe} />;
                        }
                    })}
                </RecipeList>
            </div>
        </Card>
    );
}

export default Recipe;
