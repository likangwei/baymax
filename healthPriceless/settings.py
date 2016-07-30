"""
Django settings for healthPriceless project.

For more information on this file, see
https://docs.djangoproject.com/en/1.6/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.6/ref/settings/
"""

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
import os
import raven
import socket
BASE_DIR = os.path.dirname(os.path.dirname(__file__))
CONFIG_FILE = os.path.join(BASE_DIR, "config.json")
import json
config = json.load(open(CONFIG_FILE))
# celery config
BROKER_URL = 'amqp://'
IS_SERVER = socket.gethostname() in ['iZ25jidmr1pZ']

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.6/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'yrsksv91p%l2)xc(jm)4hf&^3+0&946+%!z&)l4o&^5ccxc=-d'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

TEMPLATE_DEBUG = True

ALLOWED_HOSTS = []

# Application definition

INSTALLED_APPS = (
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    "bootstrapform",
    # 'baymax',
    'rest_framework',
    'corsheaders',
    'wordRecall',
)

if config['sentry']['enable']:
    INSTALLED_APPS += ('raven.contrib.django.raven_compat',)
    RAVEN_CONFIG = {
        'dsn': config['sentry']['dsn'],
        'release': raven.fetch_git_sha(BASE_DIR),
    }


MIDDLEWARE_CLASSES = (
    'wordRecall.middleware.DisableCSRFCheck',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    # 'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
)

CORS_ORIGIN_ALLOW_ALL = True
ROOT_URLCONF = 'healthPriceless.urls'

WSGI_APPLICATION = 'healthPriceless.wsgi.application'

DATABASES = config['db']
HOST = config['host']

LANGUAGE_CODE = 'zh-CN'

TIME_ZONE = 'Asia/Shanghai'

DATETIME_FORMAT = 'Y-m-d H:i:s'
DATE_FORMAT = 'Y-m-d'

USE_I18N = True

USE_L10N = True

USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.6/howto/static-files/

STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'wordRecall/static')

TEMPLATE_DIRS = (
    os.path.join(BASE_DIR, 'baymax', 'templates'),
    os.path.join(BASE_DIR, 'wordRecall', 'templates'),
    os.path.join(BASE_DIR,  'templates'),
)
LOGIN_URL = 'http://{HOST}/login'.format(**locals())
LOGOUT_URL = 'http://{HOST}/logout'.format(**locals())
CONFIG_URL = 'http://{HOST}/mywords'.format(**locals())
CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.locmem.LocMemCache',
    }
}


REST_FRAMEWORK = {
    # Use Django's standard `django.contrib.auth` permissions,
    # or allow read-only access for unauthenticated users.
    'DEFAULT_PERMISSION_CLASSES': [
        # AllowAny
        'rest_framework.permissions.DjangoModelPermissionsOrAnonReadOnly'
    ]
}