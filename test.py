def test():
    from wordRecall.models import Word
    no_meaning_words = Word.objects.filter(google_meaning='')
    from wordRecall.views import get_google_meanings
    get_google_meanings(no_meaning_words)

if __name__ == '__main__':
    import os
    from django.core.wsgi import get_wsgi_application
    os.environ['DJANGO_SETTINGS_MODULE'] = 'healthPriceless.settings'
    application = get_wsgi_application()
    test()