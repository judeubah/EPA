import React from "react";
import { useState } from "react";
import { Option_Picker } from "../Option_Picker/Option_Picker";
import './selection_tab.scss'

export const Selection_tab = ({name, options, setSelections, selections, filter, female_choices}) =>{
    
    const handleChange = ({target})=>{
        let {name, value} =target;
        if(value === 'none'){
            if(name === 'location'){
                setSelections({
                    ...selections,
                    [name]:'Any'
                })
            }
            return
        }
        setSelections({
            ...selections,
            [name]: value
        })
        
    }
    
    return(
        <div className="selection_tab" style={{backgroundImage: `url(/assets/${name}/${name === 'location' ? selections.location : name}.jpg)`}}>
            <div className="tab_description">{name.replace('_', ' ').toUpperCase()}</div>
            <Option_Picker
                options={options}
                optionGroup={name}
                handleChange={handleChange}
                chosen={name === 'location' ? selections.location : false}
                selections={selections}
                label={false}
            />
        <div className="selection_tab__filter" style={{backgroundColor: `rgba(${filter}, 0.45)`}}></div>
        </div>
    )
}