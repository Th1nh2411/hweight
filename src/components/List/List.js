import styles from './List.module.scss';
import classNames from 'classnames/bind';
import { RiEditFill } from 'react-icons/ri';
import RecipeItem from '../Item/Item';
import { useEffect, useState } from 'react';
import Button from '../Button/Button';
import { FaUndo } from 'react-icons/fa';

const cx = classNames.bind(styles);
function List({ title, edit = false, listData, menuData, onEditDone, dayObj, children, className }) {
    const [checkedItems, setCheckedItems] = useState([]);
    const [showEdit, setShowEdit] = useState(false);
    const [clear, setClear] = useState(false);
    const [menu, setMenu] = useState([]);
    const [subtitle, setSubtitle] = useState(0);
    const isSelected = (compareItem) => {
        return listData.some((item) => item.id === compareItem.id);
    };
    useEffect(() => {
        setShowEdit(false);
        setCheckedItems([]);
    }, [dayObj]);
    const onClickEdit = () => {
        if (!showEdit) {
            setShowEdit(true);
            const newMenuData = menuData.slice();
            setMenu(newMenuData);
            menuData.forEach((item, index) => {
                if (isSelected(item)) {
                    newMenuData.splice(0, 0, newMenuData.splice(index, 1)[0]);
                    setMenu(newMenuData);
                    setCheckedItems((prev) => [...prev, item]);
                }
            });
        } else {
            setShowEdit(false);
            setCheckedItems([]);
        }
    };
    useEffect(() => {
        if (showEdit) {
            let numKcal = 0;
            checkedItems.forEach((item) => {
                numKcal += item.kcal;
            });
            setSubtitle(`${numKcal} kcal`);
        } else {
            let numKcal = 0;
            listData.forEach((item) => {
                numKcal += item.kcal;
            });
            setSubtitle(`${numKcal} kcal`);
        }
    }, [showEdit, checkedItems, listData]);
    const handleCheckboxChange = (e, data) => {
        if (e.target.checked) {
            setCheckedItems((prev) => [...prev, data]);
            setClear(false);
        } else if (!e.target.checked) {
            const newItems = checkedItems.filter((item) => item.id !== data.id);
            setCheckedItems(newItems);
        }
    };
    const handleSubmitUpdate = () => {
        onEditDone(checkedItems);
        setShowEdit(false);
        setCheckedItems([]);
    };
    const handleLiked = (id, isLiked) => {
        menu.forEach((item, index) => {
            if (id === item.id) {
                item.isLiked = isLiked;
                console.log(menu, [...menu, item]);
                setMenu([...menu, item]);
            }
        });
    };
    return (
        <div className={cx('wrapper', className)}>
            <div className={cx('header')}>
                <h5 className={cx('title')}>
                    {title} {edit && <RiEditFill onClick={onClickEdit} className={cx('title-icon')} />}
                </h5>
                <span className={cx('subtitle')}>
                    {showEdit && (
                        <FaUndo
                            onClick={() => {
                                setCheckedItems([]);
                                setClear(true);
                            }}
                            className={cx('icon')}
                        />
                    )}
                    {subtitle}
                </span>
            </div>
            {checkedItems.length === 3 && <div className={cx('message')}>Up to 3 recipes</div>}
            <div className={cx('body')}>
                {showEdit ? (
                    <div>
                        <div className={cx('menu-list')}>
                            {menu.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <RecipeItem
                                            onLiked={handleLiked}
                                            data={item}
                                            editing
                                            onChangeEditing={handleCheckboxChange}
                                            disableInput={checkedItems.length >= 3}
                                            selected={isSelected(item)}
                                            clear={clear}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                        <div className={cx('menu-btn')}>
                            <Button
                                onClick={() => {
                                    setShowEdit(false);
                                    setCheckedItems([]);
                                }}
                                className={cx('confirm-btn')}
                            >
                                Cancel
                            </Button>
                            <Button onClick={handleSubmitUpdate} primary className={cx('confirm-btn')}>
                                Confirm
                            </Button>
                        </div>
                    </div>
                ) : (
                    listData.map((recipe, index) => <RecipeItem key={index} data={recipe} />)
                )}
            </div>
        </div>
    );
}

export default List;
