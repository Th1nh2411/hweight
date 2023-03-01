import Header from '../components/Header';
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

export default UploadLayout;
