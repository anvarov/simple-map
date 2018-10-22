import React, { PureComponent } from "react";
import Loader from "react-loader-spinner";
import "../Styles/App.css";

export default class PlaceInfo extends PureComponent {
  componentDidMount() {
    const TOKEN = "fb812cdd68d7ec1bf098bc601d2d150a";
    const { setPhotos, place, handleError } = this.props;
    const { latitude, longitude } = place;
    fetch(
      `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${TOKEN}&lat=${latitude}&lon=${longitude}&radius=2&format=json&nojsoncallback=1`
    )
      .then(response => response.json())
      .then((data) => {
        setPhotos(data.photos.photo);
      }).catch((err) => handleError(err));
  }

  render() {
    const { photos, place, error } = this.props;
    if (error) return (<div>Sorry something went wrong. Error {error}</div> )
    if (photos) {
      const randomNumber = Math.floor(Math.random() * Math.floor(photos.length))
      const randomPhoto = photos[randomNumber]
      if (randomPhoto) {
        const { farm, id, server, secret } = randomPhoto;
        return (
          <div className="popup">
            <h4>{place.name}</h4>
            <p>{place.description}</p>
            <img
              src={`https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_q.jpg`}
              className="image"
              alt="Point of interest"
            />
          </div>
        );
      }
    }
    return (<Loader
      type="Circles"
      color="#00BFFF"
      height="100"
      width="100"
    />
    );
  }
}
