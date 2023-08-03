import { useState, memo, useMemo, useCallback } from "react";
import { Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import '../Assets/SCSS/reviewMarker.scss';
import ImageBox from "./ImageBox";

function LocationMarker({
    review
}, key) {
    const [position] = useState(review.location);
    const [imageBox, setImageBox] = useState({});
    const imgData = useMemo(
        () => ({ url: 'https://server-maps-travel-website.onrender.com' + review.image.url, description: review.description }),
        [review.description, review.image.url]);

    const hideImageBox = useCallback(() => setImageBox({}), []);

    return position === null ? null : (
        <>
            {
                imageBox && imageBox.url &&
                (
                    <ImageBox url={imageBox.url} description={imageBox.description} hide={hideImageBox} />
                )
            }
            <Marker
                key={key}
                position={position}
                icon={
                    new Icon({
                        iconUrl: './marker-review-green.png',
                        iconSize: [40, 41],
                        iconAnchor: [12, 41],
                    })
                }
                className={'review-marker'}
            >
                <Popup>
                    <div className="thumbnail" onClick={e => setImageBox(imgData)}>
                        <img src={'https://server-maps-travel-website.onrender.com' + review.image.url} alt="Harryguci" />
                    </div>
                </Popup>
            </Marker>
        </>
    );
}


export default LocationMarker;