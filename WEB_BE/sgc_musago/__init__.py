# -*- coding: utf-8 -*-
##
#  @package flaskapp
#  @file __init__.py
#  @author  Sinduy
#  @brief This module contains the Flask app.

import os
from flask import Flask
from config import RESOURCE_PATH
from com import uart

rs_path = os.path.join('../',RESOURCE_PATH)

app = Flask(__name__,
    static_url_path='',
    static_folder=rs_path,
    template_folder=rs_path)

arduino = uart.Port()

from sgc_musago import route
