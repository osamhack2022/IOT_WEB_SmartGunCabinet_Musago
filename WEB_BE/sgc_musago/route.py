# -*- coding: utf-8 -*-
##
#  @package flaskapp.route
#  @file route.py
#  @author  Sinduy
#  This module contains the route for the Flask app.

from flask import render_template, jsonify, make_response
from sgc_musago import app
from com import uart
import json

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/gunstatus')
def gunstatus():
    try:
        data = uart.requst_gunStatus()
        out = jsonify(json.dumps(data.data))
        return out
    except Exception as e:
        print(e)
        return make_response(e, 500)
