import PropTypes from 'prop-types';
import classNames from 'classnames';
import React, { useState } from 'react';
import images from '../../assets/images';
import styles from './Image.module.scss';
const Image = React.forwardRef(({ src, className, customFallback = images.defaultAvatar, alt, ...props }, ref) => {
    const [fallback, setFallback] = useState('');

    const handleError = () => {
        setFallback(customFallback);
    };
    return (
        <img
            className={classNames(className, styles.wrapper)}
            ref={ref}
            src={fallback || src}
            alt={alt}
            {...props}
            onError={handleError}
        />
    );
});
Image.propTypes = {
    src: PropTypes.string,
    className: PropTypes.string,
    customFallback: PropTypes.node,
    alt: PropTypes.string,
    ref: PropTypes.string,
};
export default Image;
