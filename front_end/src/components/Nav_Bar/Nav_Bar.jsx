import React from 'react';
import './Nav_Bar.scss';

export const Nav_Bar = ({selections, randomDb, clearDb, dataBase}) =>{

    return (
        <nav className="Nav_Bar">
            <img src="assets/logos/WeDevelopNow_logo.png" className='Nav_Bar__logo'  alt="WeDevelopNow logo" />
            <h2 className='Nav_Bar_current_store'>Current Store: <span className='Nav_Bar_store'>{selections.location ? selections.location : 'Any'}</span></h2>
            <div className="db_control_btns">
                <button className="make_btn" disabled={dataBase.length ? true : false } onClick={()=>randomDb()} >Generate database</button>
                <button className="delete_btn" disabled={dataBase.length === 0 ? true : false }  onClick={()=>clearDb()}>Empty database</button>
            </div>
        </nav>
    )
}