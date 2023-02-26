import classNames from 'classnames';
import { forwardRef, useState } from 'react';
import images from '../../assets/images';
import styles from './Image.module.scss';
function Image({ src, className, customFallback = images.defaultAvatar, alt, ...props }, ref) {
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
}

export default forwardRef(Image);
