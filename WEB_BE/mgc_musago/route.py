# -*- coding: utf-8 -*-
##
#  @package flaskapp.route
#  @file route.py
#  @author  Sinduy
#  This module contains the route for the Flask app.

from flask import render_template
from mgc_musago import app

@app.route('/')
def index():
    return render_template('index.html')
