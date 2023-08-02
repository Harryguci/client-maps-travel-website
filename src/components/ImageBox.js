import { useState, useEffect, memo, useCallback } from 'react';
import '../Assets/SCSS/imageBox.scss';

function ImageBox({ url, description, hide }) {

    const handleHide = useCallback(() => {
        if (hide) {
            document.querySelector('.image-box').classList.add('hidden');
            setTimeout(() => hide(), 300);
        }
    }, [hide]);

    return (
        <>
            <div className='background-dark' onClick={handleHide}></div>
            <div className='center image-box'>
                <div className='thumbnail'
                    style={
                        window.innerWidth > 800 ?
                            {
                                width: 'auto',
                                height: '70vh'
                            }
                            : {
                                width: '90vw',
                                height: 'auto'
                            }
                    }>
                    <img src={url} alt='harryguci' />
                </div>
                <p className='description'>{description}</p>
            </div>
        </>
    )
}

export default memo(ImageBox);
