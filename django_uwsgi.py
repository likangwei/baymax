# django_uwsgi.py
#!/usr/bin/env python
# coding: utf-8
import os
import sys
reload(sys)
sys.setdefaultencoding('utf8')

from django.core.wsgi import get_wsgi_application

os.environ['DJANGO_SETTINGS_MODULE'] = 'healthPriceless.settings'
application = get_wsgi_application()
