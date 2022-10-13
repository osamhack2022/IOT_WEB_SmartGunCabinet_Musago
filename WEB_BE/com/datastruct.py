# -*- coding: utf-8 -*-
##
#  @package flaskapp
#  @file __init__.py
#  @author  Sinduy
#  @brief This module for en-decapsulation of data

from struct import *

class Requst:
    ID = 0xAA

    GUNSTATUS = 0x01

    def __init__(self, cmd : int, data : list[int]):
        self.cmd = cmd
        self.data = data

class GunStatus:
    ID = 0xA1

    NONE = 0x00
    NOTEXIST = 0x01
    EXIST = 0x03

    def __init__(self, data : list[int]):
        self.data = data

class DataStruct:

    def __init__(self, id : int = 0, len : int = 0, data : bytes = b''):
        self.id = id
        self.len = len
        self.data = data
    
    @classmethod
    def from_GunStatus(cls, gunstatus : GunStatus) -> 'DataStruct':
        return cls(gunstatus.ID, len(gunstatus.data), bytes(gunstatus.data))

    @classmethod
    def from_Requst(cls, requst : Requst) -> 'DataStruct':
        return cls(requst.ID, 1+len(requst.data), bytes([requst.cmd]+requst.data))

    def pack(self):
        return pack('B', self.id) + pack('B', self.len) + self.data
    
    def unpack(self, data):
        self.id = unpack('B', data[0:1])[0]
        self.len = unpack('B', data[1:2])[0]
        self.data = data[2:2+self.len]

        if(self.id == GunStatus.ID):
            return GunStatus(list(self.data))
        if(self.id == Requst.ID):
            return Requst(self.data[0:1], self.data[1:])
        return None

    def __str__(self):
        id = ""
        if(self.id == GunStatus.ID):
            id = "GunStatus "
        if(self.id == Requst.ID):
            id = "Requst "
        id += "({})".format(hex(self.id))
        return "id: {}, len: {}, data: {}".format(id, self.len, hex(self.data))
