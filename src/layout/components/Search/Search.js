import { useEffect, useRef, useState } from 'react';
import styles from './Search.module.scss';
import classNames from 'classnames/bind';
import { AiFillCloseCircle, AiOutlineLoading3Quarters } from 'react-icons/ai';
import HeadlessTippy from '@tippyjs/react/headless';
import { IoSearch } from 'react-icons/io5';
import PopperWrapper from '../../../components/Popper';
import RecipeItem from '../../../components/RecipeItem';
import { useDebounce } from '../../../hooks';
import * as searchServices from '../../../services/searchService';
import * as recipeService from '../../../services/recipeService';
import DetailRecipe from '../../../components/DetailRecipe/DetailRecipe';

const cx = classNames.bind(styles);
function Search() {
    const [searchResult, setSearchResult] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const debouncedValue = useDebounce(searchValue, 500);
    const inputRef = useRef();
    const [showDetailRecipe, setShowDetailRecipe] = useState(false);
    const [detailRecipe, setDetailRecipe] = useState({});
    useEffect(() => {
        if (!debouncedValue.trim()) {
            setSearchResult([]);
            return;
        }
        const fetchApi = async () => {
            setLoading(true);
            const token = localStorage.getItem('token');
            const results = await searchServices.search(debouncedValue, token);
            setSearchResult(results.recipeJson);

            setLoading(false);
        };
        fetchApi();
    }, [debouncedValue]);
    const handleClearSearch = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };
    const handleHideResult = () => {
        setShowResult(false);
    };
    const handleChangeInput = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };
    const getDetailRecipeData = async (id) => {
        const token = localStorage.getItem('token');
        const results = await recipeService.getDetailRecipe(id, token);
        setDetailRecipe(results.recipe);
        setShowDetailRecipe(true);
    };
    const handleSubmit = (e) => {};
    return (
        // Using a wrapper div => solve warning Tippy, creating a newparentNode context
        <>
            {showDetailRecipe && (
                <DetailRecipe
                    data={detailRecipe}
                    show={showDetailRecipe}
                    onCloseModal={() => setShowDetailRecipe(false)}
                />
            )}
            <>
                <HeadlessTippy
                    offset={[0, 5]}
                    interactive
                    visible={showResult && searchResult && searchResult.length > 0}
                    onClickOutside={handleHideResult}
                    render={(attrs) => (
                        <>
                            <PopperWrapper>
                                <div className={cx('search-result')} tabIndex="-1">
                                    <h4 className={cx('search-title')}>Recipes</h4>
                                    {searchResult.map((data) => (
                                        <RecipeItem onClickRecipe={getDetailRecipeData} key={data.id} data={data} />
                                    ))}
                                </div>
                            </PopperWrapper>
                        </>
                    )}
                >
                    <div className={cx('search')}>
                        <input
                            ref={inputRef}
                            onChange={handleChangeInput}
                            value={searchValue}
                            placeholder="Search recipes"
                            onFocus={() => setShowResult(true)}
                        />
                        {loading ||
                            (!!searchValue && (
                                <button onClick={handleClearSearch} className={cx('clear')}>
                                    <AiFillCloseCircle />
                                </button>
                            ))}

                        {loading && <AiOutlineLoading3Quarters className={cx('loading')} />}

                        <button
                            onClick={() => setShowResult(true)}
                            className={cx('search-btn')}
                            onMouseDown={(e) => e.preventDefault()}
                        >
                            <IoSearch />
                        </button>
                    </div>
                </HeadlessTippy>
            </>
        </>
    );
}

export default Search;
