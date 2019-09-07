import React, { Component } from 'react';
import GoogleMapReact, {Coords} from 'google-map-react';

const AnyReactComponent = (
    { text } : {lat: number, lng: number, text: string}
    ) => <div>{text}</div>;

interface SimpleMapProps {
  center: Coords;
  zoom: number;
}



class SimpleMap extends Component<SimpleMapProps> {
  static defaultProps = {
    center: {
      lng: 151.209900,
      lat: -33.865143
    },
    zoom: 11
  };

  render() {
    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '100vh', width: '100%' }}>
          <GoogleMapReact
              bootstrapURLKeys={{ key: 'AIzaSyBesscOvCxAPDEAJzV_mWl8SQ_gtGiRXgQ' }}
              defaultCenter={this.props.center}
              defaultZoom={this.props.zoom}
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
