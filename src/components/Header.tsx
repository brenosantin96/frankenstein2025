import React from 'react'
import { Icon } from './svg/Icon';

type PropsHeader = {
    title: string;
    svgLeft?: string;
    svgRight?: string;
}

function Header({ title, svgLeft = "backward", svgRight }: PropsHeader) {
    return (
        <div className='pt-3 pl-3 flex justify-between items-center'>
            <div><Icon svg={svgLeft} color='#000' /></div>
            <h3 className='font-semibold text-2xl'>{title}</h3>
            {svgRight &&
                <div className='mr-[10px] font-semibold text-2xl'><Icon svg={svgRight as string} /></div>
            }
            {!svgRight &&
                <div className='w-6'> </div>
            }
        </div>
    )
}

export default Header
