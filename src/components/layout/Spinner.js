import React from 'react'
import style from './Spinner.module.css'

const Spinner = () => (
    <div className="all-center-spinner">
        <div className={style.ldsRipple}>
            <div></div>
            <div></div>
        </div>
    </div>
)


export default Spinner
