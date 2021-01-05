import React from 'react';
import './Logo.css';
import Tilty from 'react-tilty';
import brain from './brain.png'

const Logo = () => { 
    return (
        <div className='ma4 mt0'>
            <Tilty className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height:100, width: 100 }} >
                <div className='pa3'> <img style={{paddingTop: '5px'}} src={brain} alt="brain logo"/> </div>
            </Tilty>
        </div>
       
    );
}

export default Logo; 