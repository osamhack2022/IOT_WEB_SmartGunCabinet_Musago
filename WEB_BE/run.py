#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from mgc_musago import app
from config import HOST, PORT

if __name__ == '__main__':
    app.run(host=HOST, port=PORT)
