# -*- coding: utf-8 -*-
##
#  @package flaskapp
#  @file __init__.py
#  @author  Sinduy
#  @brief This module for uart protocol communication

import serial
from com.datastruct import *
from config import *

class Port:
    def __init__(self):
        self.com = None
        try:
            self.com = serial.Serial(port = UART_PORT,
                baudrate = UART_BAUDRATE,
                bytesize = UART_DATABITS,
                parity = UART_PARITY,
                timeout = UART_TIMEOUT,
                stopbits = UART_STOPBITS)
            print('uart: open port %s' % UART_PORT)
        except Exception as e:
            print('uart: open port %s failed' % UART_PORT)
            print(e)

    def requst_gunStatus(self):
        data = DataStruct.from_Requst(Requst(Requst.GUNSTATUS, [])) # requst gun status
        try:
            if (self.com is None):
                print('requst_gunStatus: open port %s failed' % UART_PORT)
                return None
            self.com.write(data.pack()) # send requst
            data = self.com.read(2) # read id and len
            for i in range(0, data[1]): # read data
                data += self.com.read(1)
                if (data is None or len(data) == 0):
                    print('requst_gunStatus: read data failed')
                    return None
            l1_data = DataStruct()
            l2_data = l1_data.unpack(data)
            if(l2_data is not None):
                if(type(l2_data) == GunStatus):
                    return l2_data
                else:
                    print('requst_gunStatus: is not GunStatus')
            else:
                print('requst_gunStatus: is None')

        except serial.SerialTimeoutException: # is not raised on read
            print('requst_gunStatus: timeout')
            return None
        except serial.SerialException:
            print('requst_gunStatus: open port %s failed' % UART_PORT)
            return None
        except TypeError:
            print('requst_gunStatus: TypeError')
            return None