#!bin/python
from flask import Flask, jsonify, abort, request, make_response, url_for
from flask_httpauth import HTTPBasicAuth
from flask_cors import CORS

# GIS
from gis import GISUrbanHeatIndex

app = Flask(__name__, static_url_path = "")
CORS(app)
auth = HTTPBasicAuth()

@app.route("/gis", methods=['GET'])
def test_gis():
    gis = GISUrbanHeatIndex()
    gis.retrieve_point(
    params={
        'geometry': {"x" : 151.209900, "y" : -33.865143, "spatialReference" : {"wkid" : 4283}},
        'geometryType': GISUrbanHeatIndex.POINT,'outFields': '*'
    })

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
