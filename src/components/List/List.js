import styles from './List.module.scss';
import classNames from 'classnames/bind';
import { RiEditFill } from 'react-icons/ri';
import RecipeItem from '../Item/Item';
import { useState } from 'react';
import Button from '../Button/Button';

const cx = classNames.bind(styles);
function List({ title, subtitle, edit = false, listData, menuData, onEditDone, children, className }) {
    const [checkedCount, setCheckedCount] = useState(0);
    const [checkedItems, setCheckedItems] = useState([]);
    const [showEdit, setShowEdit] = useState(false);
    const isSelected = (compareItem) => {
        return listData.some((item) => item.id === compareItem.id);
    };
    const onClickEdit = () => {
        if (!showEdit) {
            setShowEdit(true);
            menuData.forEach((item) => {
                if (isSelected(item)) {
                    setCheckedCount((prev) => prev + 1);
                    setCheckedItems((prev) => [...prev, item]);
                }
            });
        }
    };
    const handleCheckboxChange = (e, data) => {
        if (e.target.checked) {
            setCheckedCount(checkedCount + 1);
            setCheckedItems((prev) => [...prev, data]);
        } else if (!e.target.checked) {
            setCheckedCount(checkedCount - 1);
            const newItems = checkedItems.filter((item) => item.id !== data.id);
            setCheckedItems(newItems);
        }
    };
    const handleSumitUpdate = () => {
        onEditDone(checkedItems);
        setShowEdit(false);
        setCheckedCount(0);
        setCheckedItems([]);
    };
    return (
        <div className={cx('wrapper', className)}>
            <div className={cx('header')}>
                <h5 className={cx('title')}>
                    {title} {edit && <RiEditFill onClick={onClickEdit} className={cx('title-icon')} />}
                </h5>
                <span className={cx('subtitle')}>{subtitle}</span>
            </div>
            <div className={cx('body')}>
                {showEdit ? (
                    <div>
                        <div className={cx('menu-list')}>
                            {menuData.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <RecipeItem
                                            data={item}
                                            editing
                                            onChangeEditing={handleCheckboxChange}
                                            disableInput={checkedCount >= 3}
                                            selected={isSelected(item)}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                        <div className={cx('menu-btn')}>
                            <Button
                                onClick={() => {
                                    setShowEdit(false);
                                    setCheckedCount(0);
                                    setCheckedItems([]);
                                }}
                                className={cx('confirm-btn')}
                            >
                                Cancel
                            </Button>
                            <Button onClick={handleSumitUpdate} primary className={cx('confirm-btn')}>
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
