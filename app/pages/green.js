import React, {Component} from 'react';
import GoogleMapReact, {Coords} from 'google-map-react';
import {getHSLGreen, hslToHex} from '../util/helpers.js';
import Shell from '../shell/Layout'
import TravelCard from '../maps/TravelCard'
const AnyReactComponent = (
    {text}
) => <div>{text}</div>;

// interface PolygonPoints {
//   lng: number,
//   lat: number
// }

const API_URL = 'smartpaths.govhack.thaum.io:5000';

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lng: 151.209900,
      lat: -33.865143
    },
    zoom: 14
  };

  onGoogleApiLoaded(map, maps) {
    function attachPolygonInfoWindow(map, maps, polygon, text) {
      var infoWindow = new maps.InfoWindow();
      maps.event.addListener(polygon, 'mouseover', function (e) {
        infoWindow.setContent(text.toString());
        const latLng = e.latLng;
        infoWindow.setPosition(latLng);
        infoWindow.open(map);
      });

      maps.event.addListener(polygon, 'mouseout', function (e) {
        infoWindow.close(map);
      });
    }

    // get routes
    fetch('http://'+API_URL+'/maps/directions?src=darling%20harbour%20sydney&dst=centennial%20park%20sydney')
    .then(function (response) {
      return response.json();
    })
    .then(function (res) {
      let poly = res.routes[0].overview_polyline.points;
      let decoded = maps.geometry.encoding.decodePath(poly);
      let polyline = new maps.Polyline({
        path: decoded,
        strokeColor: "#2054ff",
        strokeOpacity: 0.8,
        strokeWeight: 6,
      });
      polyline.setMap(map);
      return decoded;
    })
    .then(function (points) {
      let points1 = [];
      for (let p of points) {
        // points1.push([p.lng(), p.lat() + 0.0001]);
        // points1.push([p.lng(), p.lat() - 0.0001]);
        points1.push([p.lng() + 0.0001, p.lat()]);
        points1.push([p.lng() - 0.0001, p.lat()]);
      }
      points = [];

      for (let p of points1) {
        // get Green cover
        fetch('http://'+API_URL+'/gis/green?lon=' + p[0].toString() + '&lat=' + p[1].toString())
        .then(function (response) {
          return response.json();
        })
        .then(function (res) {
          // console.log(res)
          let gisCoords = res.features[0].geometry;
          let percentVeg = res.features[0].attributes.PerAnyVeg; // e.g 2.43
          let colorHSL = getHSLGreen(percentVeg/100.0);
          let colorHex = hslToHex(colorHSL[0], colorHSL[1], colorHSL[2]);

          let ringPolygon = new maps.Polygon({
            paths: gisCoords,
            strokeColor: colorHex,
            strokeOpacity: 0.8,
            strokeWeight: 2,
            // fillColor: "#FF0000",
            fillColor: colorHex, // red to blue
            fillOpacity: 0.15
          });
          ringPolygon.setMap(map);
          attachPolygonInfoWindow(map, maps, ringPolygon, 'Vegetation: ' + percentVeg.toString() + '%')
        });
      }
    });
  }

  render() {
    return (
        // Important! Always set the container height explicitly
        <Shell>
          <TravelCard />
          <GoogleMapReact
              bootstrapURLKeys={{key: 'GMAPS_API_KEY', libraries: ['geometry', 'drawing']}}
              defaultCenter={this.props.center}
              defaultZoom={this.props.zoom}
              yesIWantToUseGoogleMapApiInternals
              onGoogleApiLoaded={({map, maps}) => this.onGoogleApiLoaded(map, maps)}
          >
            {/*<AnyReactComponent*/}
            {/*    lng={151.209900}*/}
            {/*    lat={-33.865143}*/}
            {/*    text="My Marker"*/}
            {/*/>*/}
          </GoogleMapReact>
        </Shell>
    );
  }
}

export default SimpleMap;
