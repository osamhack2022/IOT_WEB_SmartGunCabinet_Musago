# -*- coding: utf-8 -*-
##
#  @package flaskapp
#  @file fileio.py
#  @author  Sinduy
#  @brief convert json string to python object and vice versa
#  not tested yet

import os
import json
from config import DATAFILE_PATH

data_path = os.path.join('../',DATAFILE_PATH)

def to_json(data):
    return json.dumps(data)

def from_json(string):
    return json.loads(string)

def load_json(filename):
    with open(os.path.join(data_path,filename),'r') as f:
        return json.load(f)
        
def save_json(filename,data):
    with open(os.path.join(data_path,filename),'w') as f:
        json.dump(data,f)