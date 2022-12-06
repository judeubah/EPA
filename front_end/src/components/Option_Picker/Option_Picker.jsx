import React from 'react';
import './Option_Picker.scss';
export const Option_Picker = ({options, optionGroup, handleChange, selections, label})=>{

    return (
        <>
        {label&&(<label htmlFor={optionGroup}>{optionGroup.toUpperCase().replace('_', ' ')}</label>)}
        <select name={optionGroup} onChange={handleChange} className={`options_picker`}>
            <option   value="none">N/A</option>
            {options.map((option)=>(
                <option selected={selections[optionGroup] === option ? true : false} key={option} value={option}>{option}</option>
                ))}
        </select>
        </>
    )
}