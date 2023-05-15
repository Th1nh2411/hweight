import PropTypes from 'prop-types';
import styles from './Toast.module.scss';
import classNames from 'classnames/bind';
import { AiFillCheckCircle, AiFillCloseCircle, AiFillExclamationCircle, AiFillInfoCircle } from 'react-icons/ai';
import { useEffect, useRef, useState } from 'react';
const cx = classNames.bind(styles);

const Toast = ({ title, content, type, duration = 3000, onClose }) => {
    const [show, setShow] = useState(true);
    const toastRef = useRef(null);
    useEffect(() => {
        const PITimeoutId = setTimeout(() => {
            setShow(false);
            onClose();
        }, duration + 1000);
        return () => {
            clearTimeout(PITimeoutId);
        };
    }, [show]);
    useEffect(() => {
        const delay = (duration / 1000).toFixed();
        const toast = toastRef.current;
        if (toast) {
            toast.style.animation = `slideToast linear 0.2s, fadeOut linear 1s ${delay}s forwards`;
            toast.style.webkitAnimation = `slideToast linear 0.2s, fadeOut linear 1s ${delay}s forwards`;
            toast.style.mozAnimation = `slideToast linear 0.2s, fadeOut linear 1s ${delay}s forwards`;
            toast.style.oAnimation = `slideToast linear 0.2s, fadeOut linear 1s ${delay}s forwards`;
            toast.style.msAnimation = `slideToast linear 0.2s, fadeOut linear 1s ${delay}s forwards`;
        }
    }, []);
    const icons = {
        success: <AiFillCheckCircle />,
        error: <AiFillCloseCircle />,
        warning: <AiFillExclamationCircle />,
        info: <AiFillInfoCircle />,
    };
    const icon = icons[type];
    return (
        <>
            {show && (
                <div ref={toastRef} className={cx('toast', { [type]: type })}>
                    <div className={cx('toast__icon')}>{icon}</div>
                    <div className={cx('toast__body')}>
                        <div className={cx('toast__title')}> {title}</div>
                        <div className={cx('toast__content')}>{content}</div>
                    </div>
                </div>
            )}
        </>
    );
};

Toast.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
    duration: PropTypes.number,
};

export default Toast;
