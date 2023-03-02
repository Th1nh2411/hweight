import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function useDebounce(value, delay = 500) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay);
        return () => {
            clearTimeout(handler);
        };
    }, [value]);
    return debouncedValue;
}
useDebounce.propTypes = {
    value: PropTypes.node.isRequired,
    delay: PropTypes.number,
};

export default useDebounce;
