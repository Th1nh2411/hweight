import { useEffect, useRef, useState } from 'react';
import styles from './Search.module.scss';
import classNames from 'classnames/bind';
import { AiFillCloseCircle, AiOutlineLoading3Quarters } from 'react-icons/ai';
import HeadlessTippy from '@tippyjs/react/headless';
import { IoSearch } from 'react-icons/io5';
import { Wrapper as PopperWrapper } from '../../../Popper';
import AccountItem from '../../../AccountItem';
import { useDebounce } from '../../../../hooks';
import * as searchServices from '../../../../apiServices/searchServices';

const cx = classNames.bind(styles);
function Search() {
    const [searchResult, setSearchResult] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);
    const debounced = useDebounce(searchValue, 500);
    useEffect(() => {
        if (!debounced.trim()) {
            setSearchResult([]);
            return;
        }
        const fetchApi = async () => {
            setLoading(true);

            const results = await searchServices.search(debounced);
            setSearchResult(results);

            setLoading(false);
        };
        fetchApi();
    }, [debounced]);
    const inputRef = useRef();
    const handleClearSearch = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };
    const handleHideResult = () => {
        setShowResult(false);
    };
    return (
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
                    onChange={(e) => setSearchValue(e.target.value)}
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

                <button className={cx('search-btn')}>
                    <IoSearch />
                </button>
            </div>
        </HeadlessTippy>
    );
}

export default Search;
