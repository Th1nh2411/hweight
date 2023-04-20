import styles from './Filter.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import { useDebounce } from '../../hooks';
import { AiFillCloseCircle, AiOutlineLoading3Quarters } from 'react-icons/ai';
import HeadlessTippy from '@tippyjs/react/headless';
import PopperWrapper from '../Popper';
import * as filterService from '../../services/filterService';
import SearchItem from './SearchItem';

const cx = classNames.bind(styles);
function Filter({}) {
    const minCalories = 50;
    const maxCalories = 600;
    const [minCaloriesValue, setMinCaloriesValue] = useState(minCalories);
    const [maxCaloriesValue, setMaxCaloriesValue] = useState(maxCalories);

    const [searchFilterResult, setSearchFilterResult] = useState([]);
    const [searchFilterValue, setFilterSearchValue] = useState('');
    const [showFilterResult, setShowFilterResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const debouncedValue = useDebounce(searchFilterValue, 500);

    useEffect(() => {
        const fetchFilterApi = async () => {
            setLoading(true);

            const results = await filterService.getSearchFilter(debouncedValue);
            setSearchFilterResult(results);

            setLoading(false);
        };
        fetchFilterApi();
    }, [debouncedValue]);

    const calcLeftPosition = (value) => (100 / (maxCalories - minCalories)) * (value - minCalories);
    const renderFilterIngredients = () => {
        const handleClearSearch = () => {
            setFilterSearchValue('');
            // setSearchFilterResult([]);
        };
        const handleHideResult = () => {
            setShowFilterResult(false);
        };
        const handleChangeInput = (e) => {
            const searchValue = e.target.value;
            if (!searchValue.startsWith(' ')) {
                setFilterSearchValue(searchValue);
            }
        };
        return (
            <HeadlessTippy
                interactive
                visible={showFilterResult}
                onClickOutside={handleHideResult}
                placement="bottom"
                offset={[2, 2]}
                render={(attrs) => (
                    <div className={cx('search-filter-result')} tabIndex="-1">
                        <PopperWrapper>
                            {searchFilterResult.map((data, index) => (
                                <SearchItem key={index} data={data} />
                            ))}
                        </PopperWrapper>
                    </div>
                )}
            >
                <div className={cx('search-filter')}>
                    <input
                        onChange={handleChangeInput}
                        value={searchFilterValue}
                        placeholder="Select ingredients to filter"
                        onFocus={() => setShowFilterResult(true)}
                    />
                    {loading ||
                        (!!searchFilterValue && (
                            <button onClick={handleClearSearch} className={cx('clear')}>
                                <AiFillCloseCircle />
                            </button>
                        ))}

                    {loading && <AiOutlineLoading3Quarters className={cx('loading')} />}
                </div>
            </HeadlessTippy>
        );
    };
    return (
        <div className={cx('filter-wrapper')}>
            {/* <p className={cx('filter-title')}>Filter </p> */}
            <div className={cx('calories-filter')}>
                <p className={cx('filter-subtitle')}>Calories : </p>
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

export default Filter;
