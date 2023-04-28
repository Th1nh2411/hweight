import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import styles from './Modal.module.scss';

const cx = classNames.bind(styles);

function Modal({ className, modalClass, handleClickOutside = () => {}, children }) {
    const overlayRef = useRef();
    const handleDocumentClick = (event) => {
        if (overlayRef.current && overlayRef.current.contains(event.target)) {
            handleClickOutside();
        }
    };
    useEffect(() => {
        document.addEventListener('click', handleDocumentClick);
        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, []);
    return (
        <div className={cx('modal', modalClass)}>
            <div ref={overlayRef} className={cx('modal__overlay')}></div>
            <div className={cx('modal__body', className)}>{children}</div>
        </div>
    );
}

export default Modal;
