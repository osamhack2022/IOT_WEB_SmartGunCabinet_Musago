# -*- coding: utf-8 -*-
##
#  @package flaskapp
#  @file __init__.py
#  @author  Sinduy
#  @brief This module for uart protocol communication

import signal
import threading
import serial
from com.datastruct import *
from config import *

try:
    com = serial.Serial(port = UART_PORT,
    baudrate = UART_BAUDRATE,
    bytesize = UART_DATABITS,
    parity = UART_PARITY,
    timeout = UART_TIMEOUT,
    stopbits = UART_STOPBITS)
    print('uart: open port %s' % UART_PORT)
except Exception as e:
    print('uart: open port %s failed' % UART_PORT)
    print(e)


def requst_gunStatus():
    data = DataStruct(Requst(Requst.GUNSTATUS, []))
    try:
        data = com.read()
        l1_data = DataStruct(0, 0, b'')
        l2_data = l1_data.unpack(data)
        if(l2_data is not None):
            if(type(l2_data) == GunStatus):
                return l2_data
            else:
                print('requst_gunStatus: is not GunStatus')
        else:
            print('requst_gunStatus: is None')

    except serial.SerialTimeoutException:
        print('requst_gunStatus: timeout')
    except Exception as e:
        print('uart: open port %s failed' % UART_PORT)
        print(e)