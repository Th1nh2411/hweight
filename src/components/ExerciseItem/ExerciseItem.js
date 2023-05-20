import styles from './ExerciseItem.module.scss';
import classNames from 'classnames/bind';
import Image from '../Image';
import { AiOutlineRightCircle } from 'react-icons/ai';
import { MdFitnessCenter } from 'react-icons/md';
import { useEffect, useState } from 'react';
import Modal from '../Modal/Modal';
import Tippy from '@tippyjs/react';
import ReactPlayer from 'react-player';
const cx = classNames.bind(styles);

function Item({ data }) {
    const [showModalDetail, setShowModalDetail] = useState();
    const handleClickRecipe = () => {
        setShowModalDetail(true);
    };

    return (
        <div>
            {showModalDetail && (
                <Modal className={cx('detail-wrapper')} handleClickOutside={() => setShowModalDetail(false)}>
                    <div className={cx('detail-body__name')}>{data.name}</div>
                    <div className={cx('detail-body__info')}>
                        <MdFitnessCenter width="2.4rem" height="2.4rem" className={cx('clock-icon')} />
                        {data.time} reps
                    </div>

                    <div className={cx('detail-video')}>
                        <ReactPlayer controls width={800} url={data.video} />
                    </div>
                </Modal>
            )}
            <div onClick={handleClickRecipe} className={cx('wrapper')}>
                <div className={cx('info')}>
                    <Image src={data.image} alt={data.name} className={cx('img')} />
                    <div className={cx('desc')}>
                        <h4 id="name" className={cx('name')}>
                            {data.name}
                        </h4>
                        <h5 id="time-eat" className={cx('time')}>
                            Rep {data.index}
                        </h5>
                    </div>
                </div>
                <div className={cx('more-btn')}>
                    <AiOutlineRightCircle />
                </div>
            </div>
        </div>
    );
}

export default Item;
