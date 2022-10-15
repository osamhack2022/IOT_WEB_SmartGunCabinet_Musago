# -*- coding: utf-8 -*-
##
#  @package flaskapp.route
#  @file route.py
#  @author  Sinduy
#  This module contains the route for the Flask app.

from flask import render_template, jsonify, make_response
from sgc_musago import app, arduino
import json

@app.route('/')
def index():
    arduino.tryConnect()
    return render_template('index.html')

@app.route('/gunstatus')
def gunstatus():
    try:
        data = arduino.requst_gunStatus()
        if(data is not None):
            return jsonify(data.data)
        return make_response("data is None", 500)
    except Exception as e:
        print(e)
        return make_response(e, 500)
