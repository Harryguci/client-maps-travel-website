import { useState, useEffect } from 'react';
import '../Assets/SCSS/imageBox.scss';

export default function ImageBox({ url, description, hide }) {

    const handleHide = () => {
        if (hide) {
            document.querySelector('.image-box').classList.add('hidden');
            setTimeout(() => hide(), 300);
        }
    }

    return (
        <>
            <div className='background-dark' onClick={handleHide}></div>
            <div className='center image-box'>
                <div className='thumbnail'>
                    <img src={url} alt='harryguci' />
                </div>
                <p className='description'>{description}</p>
            </div>
        </>
    )
}