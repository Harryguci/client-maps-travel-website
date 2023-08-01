import { useState } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import { Icon } from "leaflet";
import '../Assets/SCSS/reviewMarker.scss';
import ImageBox from "./ImageBox";
// import TooltipCircle from "../components/ToolTipCircle";
export default function LocationMarker({
    review
}, key) {
    const [position, setPosition] = useState(review.location);
    const [imageBox, setImageBox] = useState({});

    return position === null ? null : (
        <>
            {
                imageBox && imageBox.url &&
                (
                    <ImageBox url={imageBox.url} description={imageBox.description} hide={() => setImageBox({})} />
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
                    <div className="thumbnail" onClick={e => setImageBox({ url: 'https://server-maps-travel-website.onrender.com' + review.image.url, description: review.description })}>
                        <img src={'https://server-maps-travel-website.onrender.com' + review.image.url} alt="Harryguci" />
                    </div>
                </Popup>
            </Marker>
        </>
    );
}
