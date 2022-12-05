import React from 'react';
import './Option_Picker.scss';
export const Option_Picker = ({options, optionGroup, handleChange, chosen, selections, label})=>{

    return (
        <>
        {label&&(<label htmlFor={optionGroup}>{optionGroup.toUpperCase().replace('_', ' ')}</label>)}
        <select name={optionGroup} onChange={handleChange} className={`options_picker`}>
            <option selected={chosen ? false : true}  value="none">N/A</option>
            {options.map((option)=>(
                <option selected={option === selections.location ? true : false} key={option} value={option}>{option}</option>
                ))}
        </select>
        </>
    )
}