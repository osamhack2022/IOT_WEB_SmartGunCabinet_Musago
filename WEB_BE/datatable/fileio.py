# -*- coding: utf-8 -*-
##
#  @package flaskapp
#  @file fileio.py
#  @author  Sinduy
#  @brief csv file input output
#  not tested yet

import os
import csv
from config import CSV_PATH

def readFile(filename):
    with open(os.path.join(CSV_PATH,filename), 'r') as f:
        reader = csv.reader(f, delimiter=',', quotechar='"')
        return [reader.next() for reader in reader]

def saveFile(filename, data):
    with open(os.path.join(CSV_PATH,filename), 'w') as f:
        f.write(data)