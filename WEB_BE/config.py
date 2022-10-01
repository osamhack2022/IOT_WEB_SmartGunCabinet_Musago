# -*- coding: utf-8 -*-

import os

# flaskapp network configuration
HOST = '127.0.0.1'
PORT = '5000'
# current path is ./WEB_BE
# static files for flaskapp
RESOURCE_PATH = os.environ.get('MUSAGO_WEB_FE_HOME', '../WEB_FE')
# datatable files
DATAFILE_PATH = './data'
