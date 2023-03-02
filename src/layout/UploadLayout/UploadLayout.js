import Header from '../components/Header';
import PropTypes from 'prop-types';
function UploadLayout({ children }) {
    return (
        <div>
            <Header />
            <div>
                <div>{children}</div>
            </div>
        </div>
    );
}
UploadLayout.propTypes = {
    children: PropTypes.node.isRequired,
};
export default UploadLayout;
