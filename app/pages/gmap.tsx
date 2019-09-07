import React, {Component} from 'react';
import GoogleMapReact, {Coords} from 'google-map-react';

const AnyReactComponent = (
    {text}: { lat: number, lng: number, text: string }
) => <div>{text}</div>;

interface SimpleMapProps {
  center: Coords;
  zoom: number;
}

// interface PolygonPoints {
//   lng: number,
//   lat: number
// }

class SimpleMap extends Component<SimpleMapProps> {
  static defaultProps = {
    center: {
      lng: 151.209900,
      lat: -33.865143
    },
    zoom: 14
  };

  onGoogleApiLoaded(map: any, maps: any) {
    function attachPolygonInfoWindow(map: any, maps: any, polygon: any, text: string) {
      var infoWindow = new maps.InfoWindow();
      maps.event.addListener(polygon, 'mouseover', function (e : any) {
        infoWindow.setContent(text.toString());
        const latLng = e.latLng;
        infoWindow.setPosition(latLng);
        infoWindow.open(map);
      });
    }

    // get UHI
    fetch('http://localhost:5000/gis/uih?lon=151.209900&lat=-33.865143')
    .then(function(response) {
      return response.json();
    })
    .then(function(res) {
      let gisCoords = res.features[0].geometry;
      let uhi = res.features[0].attributes.UHI_16_m; // e.g 2.43

      let ringPolygon = new maps.Polygon({
        paths: gisCoords,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: (uhi / 3.0) / 3.0 // normalise then scale
      });
      ringPolygon.setMap(map);
      attachPolygonInfoWindow(map, maps, ringPolygon, 'UHI: ' + uhi.toString())
    });

    // get routes
    fetch('http://localhost:5000/maps/directions')
    .then(function(response) {
      return response.json();
    })
    .then(function (res) {
      console.log(maps.geometry.encoding.decodePath(res.routes[0].overview_polyline.points)[0].lat());
      let polyline = new maps.Polyline({
        path: maps.geometry.encoding.decodePath(res.routes[0].overview_polyline.points),
        strokeColor: "#2054ff",
        strokeOpacity: 0.8,
        strokeWeight: 6,
      });
      polyline.setMap(map)
    })
  }

  render() {
    return (
        // Important! Always set the container height explicitly
        <div style={{height: '100vh', width: '100%'}}>
          <GoogleMapReact
              bootstrapURLKeys={{key: 'AIzaSyBesscOvCxAPDEAJzV_mWl8SQ_gtGiRXgQ'}}
              defaultCenter={this.props.center}
              defaultZoom={this.props.zoom}
              yesIWantToUseGoogleMapApiInternals
              onGoogleApiLoaded={({map, maps}) => this.onGoogleApiLoaded(map, maps)}
          >
            <AnyReactComponent
                lng={151.209900}
                lat={-33.865143}
                text="My Marker"
            />
          </GoogleMapReact>
        </div>
    );
  }
}

export default SimpleMap;
