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
import Modal from '../../components/Modal/Modal';

const cx = classNames.bind(styles);

function Recipe() {
    const [recipes, setRecipes] = useState([]);
    const [menu, setMenu] = useState([]);
    const [showModal, setShowModal] = useState(false);
    useEffect(() => {
        const getRecipesData = async () => {
            const token = localStorage.getItem('token');
            const results = await recipeService.getRecipe(token);
            setRecipes(results);
        };
        getRecipesData();
        const getMenuData = async () => {
            const token = localStorage.getItem('token');
            const results = await recipeService.getMenu(token);
            setMenu(results);
        };
        getMenuData();
    }, []);
    console.log(showModal);
    return (
        <Card className={cx('wrapper')}>
            {showModal && (
                <Modal handleCloseModal={() => setShowModal(false)} className={cx('modal-wrapper')}>
                    <RecipeList title="What I will have for breakfast :">
                        {menu.map((recipe, index) => {
                            return <RecipeItem key={index} data={recipe} />;
                        })}
                    </RecipeList>
                </Modal>
            )}
            <div className={cx('header')}>
                <div className={cx('title')}>
                    Daily Recipe <RecipeIcon height="30px" className={cx('title-icon')} width="30px" />
                </div>
                <Calendar />
            </div>
            <div className={cx('body')}>
                <RecipeList edit onClickEdit={() => setShowModal(true)} title="Breakfast" subtitle="200kcal">
                    {recipes.map((recipe, index) => {
                        if (recipe.type === 1) {
                            return <RecipeItem key={index} data={recipe} />;
                        }
                    })}
                </RecipeList>
                <RecipeList edit title="Lunch" subtitle="500kcal">
                    {recipes.map((recipe, index) => {
                        if (recipe.type === 2) {
                            return <RecipeItem key={index} data={recipe} />;
                        }
                    })}
                </RecipeList>
                <RecipeList edit title="Supper" subtitle="300kcal">
                    {recipes.map((recipe, index) => {
                        if (recipe.type === 3) {
                            return <RecipeItem key={index} data={recipe} />;
                        }
                    })}
                </RecipeList>
                <RecipeList edit title="Dinner" subtitle="400kcal">
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
