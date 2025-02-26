import React from 'react'
import Header from './Header';

type PropsSideMenu = {
    menuOpened: boolean;
    onClose: () => void;
}

const SideMenu = ({ menuOpened, onClose }: PropsSideMenu) => {
    return (
        <div className={`${menuOpened ? 'w-screen' : 'w-0'} bg-slate-100 fixed top-0 bottom-0 right-0 z-30 transition-all duration-200 ease-in overflow-hidden`}>
            <div id='area' className='w-screen flex flex-col h-full'>
                <Header title={`Bienvenido Breno`} svgLeft={"close"} onClickLeftIcon={onClose}/>
            </div>
            <div>
                Text Text Text
            </div>
        </div>
    )
}

export default SideMenu