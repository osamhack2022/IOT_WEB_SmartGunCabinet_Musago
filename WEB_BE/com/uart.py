# -*- coding: utf-8 -*-
##
#  @package flaskapp
#  @file __init__.py
#  @author  Sinduy
#  @brief This module for uart protocol communication

import serial
import time
import signal
import threading

from config import UART_PORT, UART_BAUDRATE

exitThread = False

def handler(signum, frame):
    exitThread = True

def parsing_data(data):
	# TODO : add data parsing
	# TODO : add event handler
	pass

def readThread():
    global line
    global exitThread

    while not exitThread:
        for c in com.read():
            parsing_data(c)

if __name__ == "__main__":
    signal.signal(signal.SIGINT, handler)
    com = serial.Serial(port = UART_PORT,
        baudrate = UART_BAUDRATE,
        bytesize = serial.EIGHTBITS,
        parity = serial.PARITY_NONE,)
    thread = threading.Thread(target=readThread)
    thread.start()