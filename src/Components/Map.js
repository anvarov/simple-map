import React, { Component } from 'react'
import ReactMapGL from 'react-map-gl'
import PLACES from './Places'

export default class Map extends Component {
  render() {
      const { viewport, TOKEN, updateViewport, handleError, renderPopup, renderPlaceMarker } = this.props
    return (
      <div>
        <ReactMapGL
              {...viewport}
              onViewStateChange={updateViewport}
              mapboxApiAccessToken={TOKEN}
              onError={handleError}
            >
              {PLACES.map(renderPlaceMarker)}
              {renderPopup()}
            </ReactMapGL>
      </div>
    )
  }
}
