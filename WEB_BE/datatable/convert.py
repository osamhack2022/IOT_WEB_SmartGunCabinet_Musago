# -*- coding: utf-8 -*-
##
#  @package flaskapp
#  @file fileio.py
#  @author  Sinduy
#  @brief convert json string to python object and vice versa
#  not tested yet

import json

def to_json(data):
    return json.dumps(data)

def from_json(str):
    return json.loads(str)
