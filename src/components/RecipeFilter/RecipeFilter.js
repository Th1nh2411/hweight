import styles from './RecipeFilter.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import { useDebounce } from '../../hooks';
import { AiFillCloseCircle } from 'react-icons/ai';
import HeadlessTippy from '@tippyjs/react/headless';
import PopperWrapper from '../Popper';
import * as recipeService from '../../services/recipeService';
import SearchItem from './SearchItem';

const cx = classNames.bind(styles);
function RecipeFilter({ onChangeFilter }) {
    const minCalories = 50;
    const maxCalories = 600;
    const [minCaloriesValue, setMinCaloriesValue] = useState(minCalories);
    const [maxCaloriesValue, setMaxCaloriesValue] = useState(maxCalories);

    const [ingredients, setIngredients] = useState([]);
    const [filteredIngredients, setFilteredIngredients] = useState([]);
    const [checkedIngredients, setCheckedIngredients] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [showFilterResult, setShowFilterResult] = useState(false);
    const [pageIngredients, setPageIngredients] = useState(1);
    const [maxPageIngredients, setMaxPageIngredients] = useState(1);
    const debounceMinCalValue = useDebounce(minCaloriesValue);
    const debounceMaxCalValue = useDebounce(maxCaloriesValue);
    const getIngredient = async () => {
        const token = localStorage.getItem('token');
        const results = await recipeService.getIngredients(token, pageIngredients);
        setIngredients([...ingredients, ...results.listIngredient]);
        setMaxPageIngredients(results.maxPage);
    };
    useEffect(() => {
        getIngredient();
    }, [pageIngredients]);
    useEffect(() => {
        onChangeFilter(checkedIngredients, debounceMinCalValue, debounceMaxCalValue);
    }, [checkedIngredients, debounceMinCalValue, debounceMaxCalValue]);
    useEffect(() => {
        if (ingredients) {
            const newFilteredIngredients = ingredients.filter((ingredient) =>
                ingredient.name.toLowerCase().includes(searchValue.toLowerCase()),
            );
            setFilteredIngredients(newFilteredIngredients);
        }
    }, [searchValue, ingredients]);
    const calcLeftPosition = (value) => (100 / (maxCalories - minCalories)) * (value - minCalories);
    const onChangeCheckBoxIngredientItem = (e, data) => {
        if (e.target.checked) {
            setCheckedIngredients((prev) => [...prev, data]);
        } else if (!e.target.checked) {
            const newItems = checkedIngredients.filter((item) => item.idIngredient !== data.idIngredient);
            setCheckedIngredients(newItems);
        }
    };
    const renderFilterIngredients = () => {
        const handleClearSearch = () => {
            setSearchValue('');
            // setSearchFilterResult([]);
        };
        const handleHideResult = () => {
            setShowFilterResult(false);
        };
        const handleChangeInput = (e) => {
            const searchValue = e.target.value;
            if (!searchValue.startsWith(' ')) {
                setSearchValue(searchValue);
            }
        };
        return (
            <HeadlessTippy
                interactive
                visible={showFilterResult}
                onClickOutside={handleHideResult}
                placement="bottom"
                offset={[2, 5]}
                render={(attrs) => (
                    <div className={cx('search-filter-result')} tabIndex="-1">
                        <PopperWrapper>
                            {filteredIngredients.map((data, index) => (
                                <SearchItem key={index} data={data} onCheckBoxChange={onChangeCheckBoxIngredientItem} />
                            ))}
                            {pageIngredients < maxPageIngredients && (
                                <div
                                    onClick={() => setPageIngredients((prev) => prev + 1)}
                                    className={cx('ingredients-showMore')}
                                >
                                    Show more...
                                </div>
                            )}
                        </PopperWrapper>
                    </div>
                )}
            >
                <div className={cx('search-filter')}>
                    <input
                        onChange={handleChangeInput}
                        value={searchValue}
                        placeholder="Select ingredients to filter"
                        onFocus={() => setShowFilterResult(true)}
                    />
                    {!!searchValue && (
                        <button onClick={handleClearSearch} className={cx('clear')}>
                            <AiFillCloseCircle />
                        </button>
                    )}
                </div>
            </HeadlessTippy>
        );
    };
    return (
        <div className={cx('filter-wrapper')}>
            {/* <p className={cx('filter-title')}>Filter </p> */}
            <div className={cx('calories-filter')}>
                <div className={cx('filter-subtitle')}>Calories : </div>
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
                            step={10}
                            value={minCaloriesValue}
                            onChange={(event) => {
                                if (parseInt(event.target.value) < parseInt(maxCaloriesValue)) {
                                    setMinCaloriesValue(event.target.value);
                                }
                            }}
                        />
                        <input
                            type="range"
                            min={minCalories}
                            max={maxCalories}
                            step={10}
                            value={maxCaloriesValue}
                            onChange={(event) => {
                                if (parseInt(event.target.value) > parseInt(minCaloriesValue)) {
                                    setMaxCaloriesValue(event.target.value);
                                }
                            }}
                        />
                    </div>
                    <div className={cx('calories-display')}>
                        <span id="min">{minCaloriesValue}</span>
                        <span id="max">{maxCaloriesValue}</span>
                    </div>
                </div>
            </div>
            <div className={cx('ingredients-filter')}>{renderFilterIngredients()}</div>
        </div>
    );
}

export default RecipeFilter;
