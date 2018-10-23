import React, { Component } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import Pin from "./Pin";
import PlaceInfo from "./PlaceInfo";
import PLACES from "./Places";
import "mapbox-gl/dist/mapbox-gl.css";
import "../Styles/App.css";
import Select from "./Select";
import "../../node_modules/animate.css/animate.css";

const TOKEN = `pk.eyJ1IjoiYW52YXJvdiIsImEiOiJjamphdHI3YnUzbDY1M2tvNm5ua24xb3QxIn0.bGvFRXDBsgP4DEpB_LN15w
`;

export default class MapApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 39.6543,
        longitude: 66.9742,
        zoom: 13,
        bearing: 0,
        pitch: 0,
        width: 500,
        height: 500
      },
      popupInfo: null,
      selected: "all",
      photos: null,
      error: null,
      clicked: false
    };
  }

  componentWillMount() {
    window.removeEventListener("resize", this.resize);
    this.setState({ error: false });
  }

  componentDidMount() {
    window.addEventListener("resize", this.resize);
    this.resize();
  }

  handleChange = e => {
    this.setState({ selected: e.target.value });
  };

  setPhotos = photos => {
    if (photos) {
      this.setState({ photos });
    }
  };

  handleError = error => {
    this.setState({ error });
  };

  resize = () => {
    const { viewport, width, height } = this.state;
    this.setState({
      viewport: {
        ...viewport,
        width: width || window.innerWidth,
        height: height || window.innerHeight
      }
    });
  };

  updateViewport = viewport => {
    const { viewState } = viewport;
    this.setState({ viewport: viewState });
  };

  renderSelect = e => {
    const place = PLACES[e.target.getAttribute("index")];
    if (place) {
      place.className = "animated bounce";
      setTimeout(() => {
        delete place.className;
      }, 100);
    }

    this.setState({
      popupInfo: place
    });
  };
  renderPlaceMarker = place => {
    const { selected } = this.state;
    if (selected === "all") {
      return (
        <Marker
          className={place.className ? place.className : "animated"}
          key={place.id}
          {...place}
        >
          <Pin
            size={20}
            onClick={() => this.setState({ popupInfo: place })}
            place={place}
          />
        </Marker>
      );
    }
    return (
      place.type === selected && (
        <Marker
          className={place.className ? place.className : "animated"}
          key={place.id}
          {...place}
        >
          <Pin
            size={20}
            onClick={() => this.setState({ popupInfo: place })}
            place={place}
          />
        </Marker>
      )
    );
  };

  renderPopup = () => {
    const { popupInfo, photos } = this.state;
    return (
      popupInfo && (
        <Popup
          {...popupInfo}
          size={5}
          anchor="top"
          onClose={() => this.setState({ popupInfo: null })}
        >
          <PlaceInfo
            place={popupInfo}
            setPhotos={this.setPhotos}
            photos={photos}
            error={this.state.error}
            handleError={this.handleError}
          />
        </Popup>
      )
    );
  };

  render() {
    const { viewport, selected } = this.state;
    return (
      <React.Fragment>
        <h1 align="center">Places to visit in Samarkand</h1>
        <div className="grid">
          <div className="sidebar">
            <Select
              selected={selected}
              handleChange={this.handleChange}
              renderSelect={this.renderSelect}
            />
          </div>
          <div className="map">
            <ReactMapGL
              {...viewport}
              onViewStateChange={this.updateViewport}
              mapboxApiAccessToken={TOKEN}
            >
              {PLACES.map(this.renderPlaceMarker)}
              {this.renderPopup()}
            </ReactMapGL>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
