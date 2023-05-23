import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './Input.module.scss';

const cx = classNames.bind(styles);

function Input({
    required = true,
    errorMessage,
    errorCondition,
    value,
    onChange,
    title,
    type = 'text',
    unit,
    className,
}) {
    return (
        <div className={cx('input-container', { error: errorCondition }, className)}>
            <input
                className={cx('form-input', {
                    hasValue: value,
                })}
                type={type}
                value={value}
                onChange={onChange}
                required={required}
            />
            <p>{title}</p>
            <div className={cx('unit')}>{unit}</div>
            <span>
                <i />
            </span>
            {errorCondition && (
                <div id="error" className={cx('error-message')}>
                    {errorMessage}
                </div>
            )}
        </div>
    );
}
Input.propTypes = {
    errorMessage: PropTypes.string,
    errorCondition: PropTypes.any,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    title: PropTypes.string,
    type: PropTypes.string,
    unit: PropTypes.string,
};
export default Input;
