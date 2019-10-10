import React, {Component} from 'react';
import GoogleMapReact, {Coords} from 'google-map-react';
import {getHSLRed, hslToHex, routeColors} from '../util/helpers.js';
import TravelCard from '../maps/TravelCard'
import Shell from '../shell/Layout'
import { inject, observer } from 'mobx-react'
import { toJS } from 'mobx'
import {getHSLGreen} from "../util/helpers";

const AnyReactComponent = (
    {text}
) => <div>{text}</div>;

const API_URL = 'smartpaths.govhack.thaum.io:5000';

@inject('maps')
@observer
class SimpleMap extends Component {

  static defaultProps = {
    center: {
      lng: 151.209900,
      lat: -33.865143
    },
    zoom: 14,
  };

  constructor( props, context ) {
    super(props, context);
    this.state = {
      routeDetail: [
        {color: routeColors[0]},
        {color: routeColors[1]},
        {color: routeColors[2]}
      ],
    }
  }

  onGoogleApiLoaded(map, maps) {
    this.setState({
      map: map,
      maps: maps,
      source: 'pyrmont sydney',
      destination: 'darling harbour sydney',
      mapLayers: new maps.MVCObject()
    });
    let layers = this.state.mapLayers;
    if (this.props.maps.overlay === 'green') {
      layers.setValues({
        uhi: null,
        green: map
      });
    } else {
      layers.setValues({
        uhi: map,
        green: null
      });
    }
    this.setState({
      mapLayers: layers
    });
    this.renderMaps();
  }

  renderMaps() {
    const map = this.state.map;
    const maps = this.state.maps;
    const src = this.props.maps.source;
    const dst = this.props.maps.destination;

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

    const sourceLngLat = async () => {
      const req = await fetch('http://' + API_URL + '/maps/geocode?address=' + (src));
      const res = await req.json();
      this.setState({
        sourceLngLat: res.pos
      });
    };

    const destinationLngLat = async () => {
      const req = await fetch('http://'+ API_URL +'/maps/geocode?address=' + (dst));
      const res = await req.json();
      this.setState({
        destinationLngLat: res.pos
      });
    };

    sourceLngLat();
    destinationLngLat();

    setTimeout(() => {
      // get routes
      // todo, gecode this
      // const src = sourceLngLat[0].toString() + ',' + sourceLngLat[1].toString();
      // const dst = destinationLngLat[0].toString() + ',' + destinationLngLat[1].toString();
      const mode = 'foot';
      if (this.state.sourceLngLat !== undefined && this.state.destinationLngLat
          !== undefined) {
        fetch('http://'+ API_URL+ '/maps/graphhopper?mode=' + mode + '&src='
            + this.state.sourceLngLat + '&dst=' + this.state.destinationLngLat)
        .then(response => {return response.json()})
        .then(res => {
          // let poly = res.routes[0].overview_polyline.points;
          let decodedPaths = [];
          let routeIndex = 0;
          for (let routeOption of res.paths) {
            let routeDetail = this.state.routeDetail;
            routeDetail[routeIndex]['distance'] = (routeOption.distance / 1000).toFixed(1);
            routeDetail[routeIndex]['time'] = (routeOption.time / (1000 * 60)).toFixed(0);
            this.setState({
              routeDetail: routeDetail
            });

            let poly = routeOption.points;
            let decoded = maps.geometry.encoding.decodePath(poly);
            let polyline = new maps.Polyline({
              path: decoded,
              strokeColor: routeColors[routeIndex],
              strokeOpacity: 0.8,
              strokeWeight: 6,
              zIndex: 100
            });
            // routePolylines.push(polyline);
            polyline.setMap(map);
            decodedPaths.push(decoded);
            routeIndex++;
          }

          return decodedPaths;
        })
        .then(paths => {
          for (let i=0; i<paths.length; i++) { // {lat:x, lng:y} objs
            let points = paths[i];
            let points1 = [];
            for (let p of points) {
              // points1.push([p.lng(), p.lat() + 0.0001]);
              // points1.push([p.lng(), p.lat() - 0.0001]);
              points1.push([p.lng() + 0.0001, p.lat()]); // lon, lat
              points1.push([p.lng() - 0.0001, p.lat()]);
            }

            let totalUHI = 0;
            let countUHI = 0;
            let totalGreen = 0;
            let countGreen = 0;
            for (let p of points1) {
              // get UHI
              fetch(
                  'http://'+API_URL+'/gis/uhi?lon=' + p[0].toString()
                  + '&lat='
                  + p[1].toString())
              .then(response => {return response.json()})
              .then(res => {
                let gisCoords = res.features[0].geometry;
                let uhi = res.features[0].attributes.UHI_16_m; // e.g 2.43
                let colorHSL = getHSLRed(uhi / 15);
                let colorHex = hslToHex(colorHSL[0], colorHSL[1], colorHSL[2]);

                // update averages
                totalUHI += uhi;
                countUHI += 1;
                // average
                // console.log('uhi average');
                // console.log(totalUHI / countUHI);
                // this.props.uhiAverage = totalUHI / countUHI;
                let routeDetail = this.state.routeDetail;
                routeDetail[i]['heat'] = (totalUHI / countUHI).toFixed(1);
                // console.log(i);
                this.setState({routeDetail: routeDetail});
                this.props.maps.table = routeDetail;

                let ringPolygon = new maps.Polygon({
                  paths: gisCoords,
                  strokeColor: colorHex,
                  strokeOpacity: 0.8,
                  strokeWeight: 2,
                  // fillColor: "#FF0000",
                  fillColor: colorHex, // red to blue
                  fillOpacity: 0.15,
                });
                ringPolygon.bindTo('map', this.state.mapLayers, 'uhi');
                // ringPolygon.setMap(map);
                attachPolygonInfoWindow(map, maps, ringPolygon,
                    'UHI: ' + uhi.toFixed(2).toString())
              });

              // get Green cover
              fetch('http://'+API_URL+'/gis/green?lon=' + p[0].toString() + '&lat=' + p[1].toString())
              .then(response => {
                return response.json();
              })
              .then(res => {
                let gisCoords = res.features[0].geometry;
                let percentVeg = res.features[0].attributes.PerAnyVeg; // e.g 2.43
                let areaRatio = res.features[0].attributes.FulArRatio;

                // update averages
                totalGreen += percentVeg/100.0;
                countGreen += 1;
                let routeDetail = this.state.routeDetail;
                routeDetail[i]['green'] = (totalGreen / countGreen);
                this.setState({
                  routeDetail: routeDetail
                });
                // console.log(this.state.routeDetail[0]['green']);
                // console.log(res.features[0].attributes)
                let greenCoverMetric = (percentVeg/100.0) * areaRatio;
                let colorHSL = getHSLGreen(greenCoverMetric);
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
                ringPolygon.bindTo('map', this.state.mapLayers, 'green');
                // ringPolygon.setMap(map);
                attachPolygonInfoWindow(map, maps, ringPolygon, 'Vegetation: ' + percentVeg.toString() + '%')
              });
            }
          }
        });
        // console.log(this.state.routeDetail);
      } else {
        console.log('One of source, destination latlng is empty');
      }
    }, 3000);
  }

  render() {

    const { maps } = this.props;
    if(maps.trigger){
          this.onGoogleApiLoaded(this.state.map, this.state.maps);
          maps.flipTrigger()
    }
    else {}
    return (
        // Important! Always set the container height explicitly
        <Shell title="SmartMaps -Dashboard">
          <TravelCard />
          <GoogleMapReact
              bootstrapURLKeys={{key: 'GMAPS_API_KEY', libraries: ['geometry', 'drawing']}}
              defaultCenter={this.props.center}
              defaultZoom={this.props.zoom}
              yesIWantToUseGoogleMapApiInternals
              onGoogleApiLoaded={({map, maps}) =>
                this.onGoogleApiLoaded(map, maps)
              }
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
