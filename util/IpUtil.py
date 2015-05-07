# -*- coding: utf-8 -*-
__author__ = 'likangwei'

import socket
def get_ip_address():
    return socket.gethostbyname(socket.gethostname())#得到本地ip

def get_host_name():
    return socket.gethostname()
print get_ip_address()