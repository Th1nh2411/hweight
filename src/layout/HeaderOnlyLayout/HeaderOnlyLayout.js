import Header from '../components/Header';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './HeaderOnlyLayout.module.scss';
const cx = classNames.bind(styles);
function HeaderOnlyLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
}
HeaderOnlyLayout.propTypes = {
    children: PropTypes.node.isRequired,
};
export default HeaderOnlyLayout;
