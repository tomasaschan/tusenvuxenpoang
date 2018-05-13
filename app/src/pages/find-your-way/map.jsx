import React from 'react'
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker
} from 'react-google-maps'
import { compose, withProps } from 'recompose'
import './map.css'

const googleMapURL =
  'https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyAGx_n4ZUaZwQ3NFuZemBVHwzy-rkSzu0E&libraries=geometry,drawing,places'
const loadingElement = <div style={{ height: '100%' }} />
const containerElement = <div className="map" />
const mapElement = <div style={{ height: '100%' }} />

export default compose(
  withProps({
    googleMapURL,
    loadingElement,
    containerElement,
    mapElement
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap defaultZoom={13} defaultCenter={{ lat: 59.135, lng: 16.45 }}>
    <Marker
      position={{ lat: 59.1525932, lng: 16.4894057 }}
      label="Bröllopsfest i Kolhuset"
    />
    <Marker
      position={{ lat: 59.115302, lng: 16.410561 }}
      label="Vigsel på Sjöviken"
    />
    <Marker
      position={{ lat: 59.1135539, lng: 16.4056433 }}
      label="Övernattning på Granhedsgården"
    />
  </GoogleMap>
))
