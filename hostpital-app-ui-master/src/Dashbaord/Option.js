import React from 'react';

const Option = ({ Value = "info", }) => {


    return (
        <button type="button" className="btn btn-secondary p-2 m-1 w-75 h-100">
            {Value}
        </button>
    )

}

export default Option;