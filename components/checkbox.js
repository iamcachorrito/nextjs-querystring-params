import React, { useEffect, useState } from 'react';

const Checkbox = ({ elemId, elemName, elemValue, params, updateQueryParams, ...props }) => {

    const[isChecked, setCheckedState] = useState(false);

    useEffect(() => {
        if(params) {
            if (params.hasOwnProperty(elemName)) {
                const elemFound = params[elemName].includes(elemValue);
                setCheckedState(elemFound);
            }
        }
    }, [params]);

    const handleCheckboxOnChange = (e) => {
        if (isChecked) {
            setCheckedState(false);
        } else {
            setCheckedState(true);
        }
        updateQueryParams(e);
    }

    return (
        <div>
            <input
                type='checkbox'
                id={elemId}
                name={elemName}
                value={elemValue}
                checked={isChecked || false}
                onChange={handleCheckboxOnChange}
            />
            <label htmlFor={elemId}>{props.children}</label>
        </div>
    );
}
 
export default Checkbox;