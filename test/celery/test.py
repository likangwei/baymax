__author__ = 'hanzhao'


from tasks import add
result = add.delay(4, 4)
# while not result.ready():
#     print '1'
print result.get(timeout=10)