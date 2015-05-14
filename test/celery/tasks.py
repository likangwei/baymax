__author__ = 'hanzhao'

from celery import Celery
import time
app = Celery('tasks', backend='amqp', broker='amqp://')

@app.task
def add(x, y):
    time.sleep(5)
    return x + y