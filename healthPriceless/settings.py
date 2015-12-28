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
print BASE_DIR
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

if IS_SERVER:
    INSTALLED_APPS += ('raven.contrib.django.raven_compat',)

RAVEN_CONFIG = {
    'dsn': 'https://2dec9af7a6324fcbac49412869fb3826:9336ea24c06a4d86bafa718ba3c8d5dd@app.getsentry.com/55984',
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


# Database
# https://docs.djangoproject.com/en/1.6/ref/settings/#databases

DATABASES_LOCAL = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'baymax',
        'USER': 'root',
        'PASSWORD': 'root',
        'HOST': '127.0.0.1'
    }
}

DATABASES_SERVER = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'baymax',
        'USER': 'lkw',
        'PASSWORD': '3632840aa',
        'HOST': 'rdsg5v30594h2i02977d.mysql.rds.aliyuncs.com'
    }
}
HOST_MAP = {
    'default': {
        'db': DATABASES_LOCAL
    },
    'iZ25jidmr1pZ': {
        'db': DATABASES_SERVER
    }
}
host_name = socket.gethostname()
HOST_DATA = HOST_MAP.get(host_name, HOST_MAP.get("default"))
DATABASES = HOST_DATA['db']


# Internationalization
# https://docs.djangoproject.com/en/1.6/topics/i18n/

LANGUAGE_CODE = 'en-us'

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
print STATIC_ROOT

TEMPLATE_DIRS = (
    os.path.join(BASE_DIR, 'baymax', 'templates'),
    os.path.join(BASE_DIR, 'wordRecall', 'templates'),
    os.path.join(BASE_DIR,  'templates'),
)
LOGIN_URL = '/login'
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