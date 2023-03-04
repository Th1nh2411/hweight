import { useEffect, useRef, useState } from 'react';
import styles from './Search.module.scss';
import classNames from 'classnames/bind';
import { AiFillCloseCircle, AiOutlineLoading3Quarters } from 'react-icons/ai';
import HeadlessTippy from '@tippyjs/react/headless';
import { IoSearch } from 'react-icons/io5';
import PopperWrapper from '../../../components/Popper';
import AccountItem from '../../../components/AccountItem';
import { useDebounce } from '../../../hooks';
import * as services from '../../../services/searchService';

const cx = classNames.bind(styles);
function Search() {
    const [searchResult, setSearchResult] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const debouncedValue = useDebounce(searchValue, 500);
    useEffect(() => {
        if (!debouncedValue.trim()) {
            setSearchResult([]);
            return;
        }
        const fetchApi = async () => {
            setLoading(true);

            const results = await services.search(debouncedValue);
            setSearchResult(results);

            setLoading(false);
        };
        fetchApi();
    }, [debouncedValue]);
    const inputRef = useRef();
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
    const handleSubmit = (e) => {};
    return (
        // Using a wrapper div => solve warning Tippy, creating a newparentNode context
        <div>
            <HeadlessTippy
                interactive
                visible={showResult && searchResult.length > 0}
                onClickOutside={handleHideResult}
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1">
                        <PopperWrapper>
                            <h4 className={cx('search-title')}>Accounts</h4>
                            {searchResult.map((data) => (
                                <AccountItem key={data.id} data={data} />
                            ))}
                        </PopperWrapper>
                    </div>
                )}
            >
                <div className={cx('search')}>
                    <input
                        ref={inputRef}
                        onChange={handleChangeInput}
                        value={searchValue}
                        placeholder="Search accounts and videos"
                        onFocus={() => setShowResult(true)}
                    />
                    {loading ||
                        (!!searchValue && (
                            <button onClick={handleClearSearch} className={cx('clear')}>
                                <AiFillCloseCircle />
                            </button>
                        ))}

                    {loading && <AiOutlineLoading3Quarters className={cx('loading')} />}

                    <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()}>
                        <IoSearch />
                    </button>
                </div>
            </HeadlessTippy>
        </div>
    );
}

export default Search;
