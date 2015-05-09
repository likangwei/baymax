# -*- coding: utf-8 -*-
__author__ = 'likangwei'

def a(f):

    def result(i,*x,**kw):
        print 'i',i
        print 'x',x
        print 'kw',kw
        if i == 2:
            print 'i am 2'
            f(i,**kw)
        else:
            print x

    return result

@a
def b(i, **kw):
    print kw['x']
    print i

b(2, 1, 2, 3, x={1:2, 2:3}, y=4)