// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useLayoutEffect, useMemo, useCallback } from "react";
// eslint-disable-next-line no-unused-vars
import { MapContainer, TileLayer, useMap, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../Assets/SCSS/maps.scss";
import {
  // eslint-disable-next-line no-unused-vars
  Circle,
  // eslint-disable-next-line no-unused-vars
  CircleMarker,
  // eslint-disable-next-line no-unused-vars
  Popup,
  // eslint-disable-next-line no-unused-vars
  Rectangle,
  // eslint-disable-next-line no-unused-vars
  Tooltip,
  // eslint-disable-next-line no-unused-vars
  LayersControl,
  // eslint-disable-next-line no-unused-vars
  Marker,
  // eslint-disable-next-line no-unused-vars
  LayerGroup,
  // eslint-disable-next-line no-unused-vars
  FeatureGroup,
} from "react-leaflet";

// eslint-disable-next-line no-unused-vars
import TooltipCircle from "../components/ToolTipCircle";
import LocationMarker from "./LocationMarker";
// eslint-disable-next-line no-unused-vars
import LayerTerm from "../components/LayerTerm";
import attributions from "../helpers/osmProvider";
import ToolTipPoly from "../components/ToolTipPoly";
import "bootstrap/dist/css/bootstrap.css";
import MapsControl from "../components/MapsControl";


import {
  // eslint-disable-next-line no-unused-vars
  Button,
  ListGroup,
  ListGroupItem,
  Container,
  Row,
  Col,
  Alert,
} from "react-bootstrap";

import convertVNtoEng from "../helpers/convertVNtoEng";
import ImageForm from "../components/ImageForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import ReviewMarker from '../components/ReviewMarker';

const hanoipoints = [
  [21.079374593525337, 105.89481353759767],
  [21.07376838647649, 105.92348098754884],
  [21.061914567119807, 105.92948913574219],
  [21.046695441515006, 105.93584060668947],
  [21.039966489991286, 105.93824386596681],
  [21.034999687911917, 105.94734191894533],
  [21.028911123993602, 105.95111846923828],
  [21.022982546427425, 105.95197677612306],
  [21.014970580547725, 105.948543548584],
  [21.00968244727318, 105.94528198242189],
  [21.00054795738831, 105.93858718872072],
  [20.993496389857583, 105.9346389770508],
  [20.951500617754565, 105.90923309326172],
  [20.94027837682011, 105.90030670166017],
  [20.936751213064184, 105.87215423583986],
  [20.939316431308203, 105.85018157958986],
  [20.952462484967604, 105.80760955810548],
  [20.978109995719024, 105.78014373779297],
  [20.99189371442306, 105.7602310180664],
  [21.008240196572455, 105.74752807617189],
  [21.03836431386586, 105.7379150390625],
  [21.073608206025916, 105.72830200195314],
  [21.09026604845475, 105.74340820312501],
  [21.098594269392102, 105.75576782226564],
  [21.09410990075993, 105.81275939941408],
  [21.092828627710034, 105.82408905029297],
  [21.086742429803333, 105.83747863769533],
  [21.08097632813527, 105.84571838378906],
  [21.07264711969881, 105.8577346801758],
  [21.071686027159775, 105.86803436279297],
  [21.073287844607105, 105.87284088134767],
];

function createId(name) {
  return convertVNtoEng(name).trim().toLowerCase().replace(/ /g, "-");
}

export default function Maps() {
  const [map, setMap] = useState(null);

  const [center, setCenter] = useState({ lat: 21.023997, lng: 105.806099 });
  const [points, setPoints] = useState([]);
  const [showPolygon, setShowPolygon] = useState(false);
  const [cites, setCites] = useState([]);
  const [currentLocation, setCurrentLocation] = useState({
    lat: 21.023997,
    lng: 105.806099,
  });
  const [afterLocation, setAfterLocation] = useState(currentLocation);

  const [newCityState, setNewCityState] = useState("");
  const [weatherData, setWeatherData] = useState({});

  const [alertState, setAlertState] = useState({});
  const [showInforBox, setShowInfoBox] = useState(true);
  const [showImageForm, setShowImageForm] = useState(false);

  const [reviews, setReviews] = useState([]);


  useEffect(() => {
    fetch("https://server-maps-travel-website.onrender.com/points/data")
      .then((response) => response.json())
      .then((data) => setCites(data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    fetch('https://server-maps-travel-website.onrender.com/get-image')
      .then((response) => response.json())
      .then((data) => setReviews(data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      setAlertState({
        variant: "success",
        content: "Detecting location...",
      });
      window.scrollTo(0, 0);

      navigator.geolocation.getCurrentPosition(function (position) {
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });

        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });

        setAlertState({});
        console.log('detected location...');
      });
    }
  }, []);

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${currentLocation.lat}&lon=${currentLocation.lng}&appid=be05f4fc63cacfee5809402834381803`
    )
      .then((response) => response.json())
      .then((response) => {
        // Convert from K temp to C temp

        response.main.temp = Math.round(response.main.temp - 273);
        response.main.temp_max = Math.round(response.main.temp_max - 273);
        response.main.temp_min = Math.round(response.main.temp_min - 273);
        response.main.feels_like = Math.round(response.main.feels_like - 273);

        setWeatherData(response);
      })
      .catch((err) => console.log(err));
  }, [currentLocation]);

  const handleAddPlace = async (e) => {
    cites.push({
      id: createId(newCityState),
      name: newCityState,
      points: points,
    });

    setPoints([]);
    if (newCityState && points && points.length) {
      await fetch("https://server-maps-travel-website.onrender.com/points/data", {
        method: "POST",
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: createId(newCityState),
          name: newCityState,
          points: points,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            alert(data.error);
          } else
            console.log("POST", data)
        })
        .catch((err) => console.log(err));
    } else {
      alert('Please fill the information');
    }
  };

  const [showMapsControl, setShowMapsControl] = useState(() => {
    return !(window.innerWidth < 768);
  });

  const DisplayReviews = useCallback(() => (
    <>
      {reviews && reviews.length &&
        reviews.map((review) => (
          <ReviewMarker key={review.id} review={review} />
        ))
      }
    </>
  ), [reviews])

  const displayMap = useMemo(() => {
    console.log('Update Maps', reviews);

    return (
      <MapContainer
        key={JSON.stringify([center.lat, center.lng])}
        center={center}
        ref={setMap}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "100vh", position: "relative", zIndex: 5 }}
      >
        <LocationMarker
          center={center}
          points={points}
          currentLocation={currentLocation}
          setPoints={setPoints}
          setAfterLocation={setAfterLocation}
          setCurrentLocation={setCurrentLocation}
          setAlertState={setAlertState}
          enablePoly={showPolygon}
          showMapsControl={showMapsControl}
        />

        <DisplayReviews />

        {/* Display Maps */}
        <TileLayer {...attributions} />

        {showPolygon && points && points.length && (
          <ToolTipPoly points={points} />
        )}

      </MapContainer>
    )
  }, [center, currentLocation, points, reviews, showMapsControl, showPolygon]);


  return (
    <>
      <div
        className="information-box"
        style={{
          position: "absolute",
          right: "1rem",
          top: "1rem",
          zIndex: 2000,
          boxShadow: "5px 5px 30px rgba(0,0,0,0.3)",
        }}
      >
        <div className="control-information-box d-flex gap-1 justify-content-center">
          <button
            className="custom-button"
            onClick={(e) => setShowInfoBox((prev) => !prev)}
            style={{ width: "100%" }}
          >
            {showInforBox ? <FontAwesomeIcon icon={faClose} /> : "Info Box"}
          </button>
        </div>
        {showInforBox && (
          <ListGroup>
            <ListGroupItem>
              Tỉnh / Thành phố:
              <b className="mx-2">{weatherData.name || "~"}</b>
            </ListGroupItem>
            <ListGroupItem>
              Nhiệt độ:
              <b className="mx-2">
                {(weatherData.main && weatherData.main.temp) || "~"}
              </b>
            </ListGroupItem>
            <ListGroupItem>
              Cảm giác như:
              <b className="mx-2">
                {(weatherData.main && weatherData.main.feels_like) || "~"}
              </b>
            </ListGroupItem>
            <ListGroupItem>
              Nhiệt độ cao nhất:
              <b className="mx-2">
                {(weatherData.main && weatherData.main.temp_max) || "~"}
              </b>
            </ListGroupItem>
            <ListGroupItem>
              Nhiệt độ thấp nhất:
              <b className="mx-2">
                {(weatherData.main && weatherData.main.temp_min) || "~"}
              </b>
            </ListGroupItem>
            <ListGroupItem>
              Độ ẩm:
              <b className="mx-2">
                {(weatherData.main && weatherData.main.humidity) || "~"}
              </b>
            </ListGroupItem>
            <ListGroupItem>
              Tốc độ gió:
              <b className="mx-2">
                {(weatherData.wind && weatherData.wind.speed) || "~"}
              </b>
            </ListGroupItem>
            <ListGroupItem>
              Lượng mưa:
              <b className="mx-2">
                {(weatherData.rain && weatherData.rain["1h"]) || "~"}
              </b>
            </ListGroupItem>
          </ListGroup>
        )}
      </div>

      {showMapsControl && map && !showImageForm ? <MapsControl
        cites={cites}
        setCenter={setCenter}
        setCurrentLocation={setCurrentLocation}
        setPoints={setPoints}
        hanoipoints={hanoipoints}
        showPolygon={showPolygon}
        setShowPolygon={setShowPolygon}
        newCityState={newCityState}
        setNewCityState={setNewCityState}
        handleAddPlace={handleAddPlace}
        setShowImageForm={setShowImageForm}
        hide={() => setShowMapsControl(false)}
        map={map}
      /> : <button
        className="custom-button position-absolute"
        style={{ top: 100, left: 20, zIndex: 2000 }}
        onClick={e => { setShowMapsControl(true); setCurrentLocation(afterLocation) }}
      >
        <FontAwesomeIcon icon={faBars} />
      </button>}
      
      {showImageForm && ( // disable prettier 
        <ImageForm location={currentLocation} hide={() => setShowImageForm(false)} />
      )}

      <Container
        fluid
        className="maps-section position-relative"
        style={{ zIndex: 5 }}
      >
        <Row>
          <Col className="col-12 maps-section__main">
            {alertState && alertState.content && (
              <Alert
                key={JSON.stringify(alertState)}
                variant={alertState.variant}
              >
                {alertState.content}
              </Alert>
            )}
            <Row>
              {displayMap}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}
