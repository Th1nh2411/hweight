import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';
import { memo } from 'react';

const cx = classNames.bind(styles);

function Button({
    disable = false,
    primary = false,
    outline = false,
    small = false,
    large = false,
    rounded = false,
    to,
    href,
    children,
    leftIcon,
    rightIcon,
    className,
    onClick,
    ...passProps
}) {
    let Comp = 'button';
    const props = { onClick, ...passProps };

    // Remove listener when btn is disable
    if (disable) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') || typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }
    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }
    const classes = cx('wrapper', {
        [className]: className,
        primary,
        outline,
        small,
        large,
        disable,
        rounded,
    });
    return (
        <Comp className={classes} {...props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Comp>
    );
}
Button.propTypes = {
    disable: PropTypes.bool,
    primary: PropTypes.bool,
    outline: PropTypes.bool,
    small: PropTypes.bool,
    large: PropTypes.bool,
    rounded: PropTypes.bool,
    to: PropTypes.string,
    href: PropTypes.string,
    children: PropTypes.node.isRequired,
    leftIcon: PropTypes.node,
    rightIcon: PropTypes.node,
    className: PropTypes.string,
    onClick: PropTypes.func,
};
export default memo(Button);
