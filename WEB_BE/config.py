# -*- coding: utf-8 -*-

import os

# current path is ./WEB_BE
# static files for flaskapp
RESOURCE_PATH = os.environ.get('WEB_FE_HOME', '../WEB_FE')
# datatable files
DATAFILE_PATH = './data'

# uart
#UART_PORT = '/dev/ttyUSB0'
UART_PORT = 'COM7'
UART_BAUDRATE = "9600"
UART_DATABITS = 8 # 5, 6, 7, 8
UART_PARITY = "N"   # N, E, O, S, M (None, Even, Odd, Space, Mark)
UART_TIMEOUT = 0.1
UART_STOPBITS = 1 # 1, 1.5, 2
