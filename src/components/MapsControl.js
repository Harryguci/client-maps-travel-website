import { useState, useEffect, useMemo } from 'react';
import { Form, FormControl, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTurnUp, faClose } from '@fortawesome/free-solid-svg-icons';
import { useMap } from 'react-leaflet';

function MapsControl({
    cites,
    setCenter,
    setCurrentLocation,
    setPoints,
    hanoipoints,
    setShowPolygon,
    newCityState,
    setNewCityState,
    handleAddPlace,
    setShowImageForm,
    hide
}) {

    const map = useMap();
    const detectCurrentLocation = (e) => {
        if (navigator.geolocation) {

            window.scrollTo(0, 0);

            navigator.geolocation.getCurrentPosition(function (position) {
                map.flyTo({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }, map.getZoom());
                setCurrentLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
            });
        }
    }
    return (
        <>
            <button
                className="custom-button position-absolute"
                style={{ top: 20, left: 210, zIndex: 2000 }}
                onClick={hide}
            >
                <FontAwesomeIcon icon={faClose} />
            </button>
            <div className="position-absolute maps-section__control p-4" style={{ left: 0, top: 0, zIndex: 1000 }}>
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
                    <button
                        className="custom-button danger"
                        onClick={(e) => setPoints([])}
                    >
                        Reset
                    </button>
                </Row>
                <Row className="d-flex justify-content-center my-5 gap-2">
                    <Form.Check // prettier-ignore
                        type="switch"
                        id="custom-switch"
                        label="Show poly"
                        onChange={(e) => setShowPolygon((prev) => !prev)}
                    />
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
                        Add
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
                {window.innerWidth < 800 && (
                    <Row>
                        <div>
                            <button
                                className="custom-button"
                                onClick={(e) => window.scrollTo(0, 0)}
                            >
                                <FontAwesomeIcon icon={faTurnUp} />
                            </button>
                        </div>
                    </Row>
                )}
            </div>
        </>
    )
}

export default MapsControl;