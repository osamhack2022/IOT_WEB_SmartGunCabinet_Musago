# -*- coding: utf-8 -*-
##
#  @package flaskapp
#  @file __init__.py
#  @author  Sinduy
#  @brief This module contains the Flask app.

from flask import Flask
from config import RESOURCE_PATH

app = Flask(__name__,
    static_url_path='', 
    static_folder=RESOURCE_PATH,
    template_folder=RESOURCE_PATH)

from flaskapp import route
