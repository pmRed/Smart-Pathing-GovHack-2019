#!bin/python
from flask import Flask, jsonify, abort, request, make_response, url_for
from flask_httpauth import HTTPBasicAuth
from flask_cors import CORS

# GIS
from gis import GISUrbanHeatIndex, GISGreenCover, ESRI_POINT
from maps import Maps
from geocode import Geocode

app = Flask(__name__, static_url_path = "")
CORS(app)
auth = HTTPBasicAuth()

@app.route("/gis/uih", methods=['GET'])
def uih_gis():
    # sydney = 151.209900, -33.865143
    # http://localhost:5000/gis/uih?lon=151.209900&lat=-33.865143
    lon = request.args.get('lon', type=float)
    lat = request.args.get('lat', type=float)
    gis = GISUrbanHeatIndex()
    response = gis.retrieve_point(
    params={
        'geometry': {"x" : lon, "y" : lat},
        'geometryType': ESRI_POINT
    })
    return make_response(jsonify(response), 200)

@app.route("/maps/directions", methods=['GET'])
def map_directions():
    # http://localhost:5000/maps/directions?src=1%20george%20st%20sydney&dst=the%20star%20sydney
    src = request.args.get('src', type=str)
    dst = request.args.get('dst', type=str)

    m = Maps()
    params = {
        'origin': src,
        'destination': dst,
        'mode': 'cycling',
        'alternatives': True
    }
    return m.get_directions(**params)

@app.route("/maps/graphhopper", methods=['GET'])
def map_graphhopper():
    # http://localhost:5000/maps/graphhopper?src=1%20george%20st%20sydney&dst=the%20star%20sydney&mode=foot
    src = request.args.get('src', type=str)
    dst = request.args.get('dst', type=str)
    mode = request.args.get('mode', type=str)

    m = Maps()
    params = {
        'origin': src,
        'destination': dst,
        'mode': mode
    }
    return m.get_graphhopper(**params)

@app.route("/maps/geocode", methods=['GET'])
def geocode():
    address = request.args.get('address', type=str)

    m = Geocode()
    return make_response(jsonify(m.geocode(address)), 200)

@app.route("/gis/green", methods=['GET'])
def green_cover_gis():
    lon = request.args.get('lon', type=float)
    lat = request.args.get('lat', type=float)
    gis = GISGreenCover()
    response = gis.retrieve_point(
        params={
            'geometry': {"x" : lon, "y" : lat},
            'geometryType': ESRI_POINT
        })
    return make_response(jsonify(response), 200)

@auth.get_password
def get_password(username):
    if username == 'miguel':
        return 'python'
    return None

@auth.error_handler
def unauthorized():
    return make_response(jsonify( { 'error': 'Unauthorized access' } ), 403)
    # return 403 instead of 401 to prevent browsers from displaying the default auth dialog

@app.errorhandler(400)
def not_found(error):
    return make_response(jsonify( { 'error': 'Bad request' } ), 400)

@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify( { 'error': 'Not found' } ), 404)

@app.route('/auth/helloworld', methods = ['GET'])
@auth.login_required
def auth_helloworld():
    return jsonify( { 'hello': 'world' } )

@app.route('/helloworld', methods = ['GET'])
def helloworld():
    return jsonify( { 'hello': 'world' } )

if __name__ == '__main__':
    app.run(debug = True)
