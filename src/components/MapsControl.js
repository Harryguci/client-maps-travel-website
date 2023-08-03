import { useCallback } from 'react';
import { FormControl, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

function MapsControl({
    cites,
    setCenter,
    setCurrentLocation,
    setPoints,
    hanoipoints,
    showPolygon,
    setShowPolygon,
    newCityState,
    setNewCityState,
    handleAddPlace,
    setShowImageForm,
    hide,
    map
}) {
    const detectCurrentLocation = (e) => {
        if (navigator.geolocation) {
            window.scrollTo(0, 0);

            // detect real location
            map.locate();
        }
    }

    const handleHide = useCallback(() => {
        try {
            document.getElementsByClassName('maps-section__control')[0].classList.add('hidden');
        } catch (err) {
            console.log(err);
        }
        if (hide)
            setTimeout(() => hide(), 300);
    }, [hide]);

    return (
        <>
            <div className='background-dark' onClick={handleHide}></div>
            <button
                className="custom-button position-absolute"
                style={{ top: 20, left: 210, zIndex: 2000 }}
                onClick={handleHide}
            >
                <FontAwesomeIcon icon={faClose} />
            </button>
            <div className="maps-section__control p-4" style={{ zIndex: 1000 }}>
                <Row>
                    <h3 className="brand">Harryguci</h3>
                </Row>
                <Row className="my-2 d-flex justify-content-center gap-2">
                    <button
                        className="custom-button danger"
                        onClick={detectCurrentLocation}
                    >
                        Current Location
                    </button>
                    {cites &&
                        cites.length &&
                        cites.map((city) => (
                            <button
                                key={city.id}
                                className="custom-button"
                                onClick={(e) => {
                                    map.flyTo({
                                        lat: city.points[0][0],
                                        lng: city.points[0][1],
                                    }, map.getZoom());

                                    setPoints(city.points || hanoipoints);
                                    window.scrollTo(0, 0);
                                }}
                            >
                                {city.name}
                            </button>
                        ))}
                </Row>
                <Row className="d-flex justify-content-center my-5 gap-2">
                    <button
                        className="custom-button danger"
                        onClick={(e) => setPoints([])}
                    >
                        Reset Poly
                    </button>
                    <button // prettier-ignore
                        className='custom-button'
                        onClick={(e) => setShowPolygon((prev) => !prev)}
                    >
                        Toggle Poly
                    </button>
                    <FormControl
                        type="text"
                        style={{ maxWidth: 500 }}
                        value={newCityState}
                        onChange={(e) => setNewCityState(e.target.value)}
                        placeholder="city"
                        required
                    />
                    <button
                        className="custom-button primary"
                        onClick={handleAddPlace}
                    >
                        Add City
                    </button>
                    <button
                        className="custom-button"
                        onClick={e => { setShowImageForm(prev => !prev); window.scrollTo(0, 0) }}
                    >
                        Add Image
                    </button>
                </Row>
                <Row>
                    <div className="opacity-50">
                        <p>[space] back to current location</p>
                        <p>[-][+] change zoom</p>
                    </div>
                </Row>
            </div>
        </>
    )
}

export default MapsControl;