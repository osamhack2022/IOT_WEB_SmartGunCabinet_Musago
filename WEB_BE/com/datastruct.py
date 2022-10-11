# -*- coding: utf-8 -*-
##
#  @package flaskapp
#  @file __init__.py
#  @author  Sinduy
#  @brief This module for en-decapsulation of data

from array import array
from dataclasses import MISSING
from struct import *
from typing import overload


class GunStatus:
    ID = 0xA1

    NONE = 0x00
    NOTEXIST = 0x01
    EXIST = 0x03

    def __init__(self, data : list[int]):
        self.data = data

class DataStruct:
    @overload
    def __init__(self, id : int, len : int, data : bytes):
        self.id = id
        self.len = len
        self.data = data
    @overload
    def __init__(self, gunstatus : GunStatus):
        self.id = gunstatus.ID
        self.len = len(gunstatus.data)
        self.data = bytes(gunstatus.data)

    def pack(self):
        return pack('B', self.id) + pack('B', self.len) + self.data
    
    def unpack(self, data):
        self.id = unpack('B', data[0:1])[0]
        self.len = unpack('B', data[1:2])[0]
        self.data = data[2:2+self.len]

        if(self.id == GunStatus.ID):
            return GunStatus(list(self.data))

    def __str__(self):
        id = ""
        if(self.id == GunStatus.ID):
            id = "GunStatus "
        id += "({})".format(hex(self.id))
        return "id: {}, len: {}, data: {}".format(id, self.len, self.data)
