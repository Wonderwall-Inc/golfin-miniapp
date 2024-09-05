import React from 'react'

import { TitleComponentProps } from '../../type'
import './Title.css'

const Title = ({ titlename, style }: TitleComponentProps) => {
    return (
        <div>
            <div className='screen-title-container'>
                <div className='screen-base-title'>GOLFIN</div>
                <div className='screen-title' style={style}>{titlename}</div>
            </div>
        </div>
    )
}

export default Title