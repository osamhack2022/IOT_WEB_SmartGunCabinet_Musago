# -*- coding: utf-8 -*-
##
#  @package flaskapp
#  @file fileio.py
#  @author  Sinduy
#  @brief csv file input output
#  not tested yet

import os
import csv
from config import CSV_PATH, CSV_ENCODING

csv_path = os.path.join('../',CSV_PATH)

def readFile(filename):
    with open(os.path.join(csv_path,filename), 'r', encoding=CSV_ENCODING) as f:
        reader = csv.reader(f, delimiter=',', quotechar='"')
        return [reader.next() for reader in reader]

def saveFile(filename, data):
    with open(os.path.join(csv_path,filename), 'w', encoding=CSV_ENCODING) as f:
        f.write(data)