import os
import requests
import logging

class Maps:
  APIKEY = os.environ.get("MAPS_API_KEY")
  base_url = 'https://maps.googleapis.com/maps/api/directions/json?key={key}'.format(key=APIKEY)
  # 'origin=Toronto&destination=Montreal&key=YOUR_API_KEY'

  graphhopper_url = 'https://graphhopper.com/api/1/route'

  def __init__(self):
    self.logger = logging.getLogger(Maps.__name__)

  def get_directions(self, origin, destination, mode='walking', alternatives='true'):
    response = requests.get(self.base_url, params={
      'origin': origin,
      'destination': destination,
      'mode': mode,
      'alternatives': alternatives
    })
    if response.status_code == 200:
      return response.json()

    self.logger.error("Error getting directions: {}".format(response.status_code))
    self.logger.error(response.content)


  def get_graphhopper(self, origin, destination, mode='foot'):
    params = {
      'key': 'GRAPHHOPPER_API_KEY',
      'calc_points': 'true',
      'vehicle': mode,
      'alternative_route.max_paths': 3,
      'instructions': 'false',
      'algorithm': 'alternative_route',
      'ch.disable': 'true',
      'point': destination
    }
    response = requests.get(self.graphhopper_url + '?point=' + origin, params=params)
    if response.status_code == 200:
      return response.json()

    self.logger.error("Error getting directions: {}".format(response.status_code))
    self.logger.error(response.content)
