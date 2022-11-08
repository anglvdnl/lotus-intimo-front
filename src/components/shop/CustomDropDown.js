import React from 'react';
import Select from 'react-select';

function CustomDropDown({ content, currValue, onSelect, dropDownStyles, setDropDownStyles }) {
    const options = [];

    content.map(x => options.push({ value: x.value, label: x.value, isDisabled: !x.isAvailable }));
    
    return (
        <Select
            menuPortalTarget={document.body}
            styles={{ menuPortal: base => ({ ...base, zIndex: 5 }) }}
            classNamePrefix="react-select"
            className='react-select-container'
            onChange={(e) => onSelect(e.value)}
            options={options}
            value={options.find(option => option.value === currValue)}
            onMenuOpen={() => setDropDownStyles(true)}
            onMenuClose={() => setDropDownStyles(false)}
        />

    );
}
export default CustomDropDown