import json
import logging
from urllib.parse import quote

import requests


class GISUrbanHeatIndex:
  POINT = 'esriGeometryPoint'
  MULTIPOINT = 'esriGeometryMultipoint'
  POLYLINE = 'esriGeometryPolyline'
  POLYGON = 'esriGeometryPolygon'
  ENVELOPE = 'esriGeometryEnvelope'

  base_url = 'https://mapprod2.environment.nsw.gov.au/arcgis/rest/services/UHGC/UHGC/MapServer/0/query'
  def __init__(self):
    self.logger = logging.getLogger(GISUrbanHeatIndex.__name__)

  """
  Example params: 
  {
      'geometry': {"x" : 151.209900, "y" : -33.865143, "spatialReference" : {"wkid" : 4283}}
      'geometryType': GISUrbanHeatIndex.POINT',
      'outFields': '*',
      'inSR': 4283
  }
  """

  def retrieve_point(self, params, rformat='json'):
    params['f'] = rformat
    params['geometry'] = json.dumps(params['geometry'])

    self.logger.info("Creating request with params={}".format(params))

    request = requests.get(self.base_url, params=params)
    self.logger.info("URL: {}".format(request.url))

    if request.status_code == 200:
      return request.json()

    self.logger.error("Error retrieving data from GIS API: {} - {}"
                      .format(request.status_code, request.content))


if __name__ == "__main__":
  logging.basicConfig(level=logging.DEBUG)
  gis = GISUrbanHeatIndex()
  result = gis.retrieve_point(
      params={
        'geometry': {"x": 151.209900, "y": -33.865143},
        'geometryType': GISUrbanHeatIndex.POINT,
        'outFields': 'UHI_16_m',
        'inSR': '4283'  # spatial reference
      })
  print(result)
  for feature in result['features']:
    if feature.get('attributes') is not None:
      print(json.dumps(feature['attributes'], indent=2))
