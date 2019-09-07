import logging
import os

import requests


class Geocode:
  APIKEY = os.environ.get("MAPS_API_KEY")
  GOOGLE_MAPS_API_URL = 'https://maps.googleapis.com/maps/api/geocode/json'

  def __init__(self):
    self.logger = logging.getLogger(Geocode.__name__)

  def geocode(self, address):
    params = {
      'address': address,
      'region': 'au',
      'key': self.APIKEY
    }

    req = requests.get(self.GOOGLE_MAPS_API_URL, params=params)
    if req.status_code == 200:
      res = req.json()

      # Use the first result
      result = res['results'][0]

      geodata = dict()
      geodata['lat'] = result['geometry']['location']['lat']
      geodata['lng'] = result['geometry']['location']['lng']
      geodata['formatted_address'] = result['formatted_address']
      return {
        'pos': [geodata['lat'], geodata['lng']]
      }
    self.logger.error("Error retreiving data: {}", req.content)
