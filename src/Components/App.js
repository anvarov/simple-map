import React, { Component } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import Pin from "./Pin";
import PlaceInfo from "./PlaceInfo";
import PLACES from "./Places";
import "mapbox-gl/dist/mapbox-gl.css";
import "../Styles/App.css";
import Checkbox from "./Checkbox";
import '../../node_modules/animate.css/animate.css'

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
      checkedItems: new Map(),
      photos: null,
    };
  }

  componentWillMount() {
    window.removeEventListener("resize", this.resize);
  }

  componentDidMount() {
    window.addEventListener("resize", this.resize);
    this.resize();
  }

  handleChange = e => {
    const item = e.target.name;
    const isChecked = e.target.checked;
    this.setState(prevState => ({
      checkedItems: prevState.checkedItems.set(item, isChecked)
    }));
  };

  setPhotos = photos => {
    this.setState({ photos });
  };

  handleError = () => {
    this.setState({photos: null})
  }

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
    this.setState({ viewport });
  };

  renderPlaceMarker = place => {
    const { checkedItems } = this.state;
    return (
      checkedItems.get(place.type) && (
        
        <Marker className={"animated bounce"} key={place.id} {...place}>
        
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
          />
        </Popup>
      )
    );
  };

  render() {
    const { viewport, checkedItems } = this.state;
    return (
      <div>
        <h1 align="center">Places to visit in Samarkand</h1>
        <form>
          <fieldset>
          <legend>Please select to show</legend>
          <Checkbox
            checkedItems={checkedItems}
            handleChange={this.handleChange}
          />
          </fieldset>
        </form>
        <ReactMapGL
          {...viewport}
          onViewportChange={this.updateViewport}
          mapboxApiAccessToken={TOKEN}
        >
          {PLACES.map(this.renderPlaceMarker)}
          {this.renderPopup()}
        </ReactMapGL>
      </div>
    );
  }
}
