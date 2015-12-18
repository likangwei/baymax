import time
def test():
    from wordRecall.models import Word
    no_meaning_words = Word.objects.filter(google_meaning='')[:500]
    from wordRecall.views import get_google_meanings

    while no_meaning_words.count() > 0:
        get_google_meanings(no_meaning_words)
        no_meaning_words = Word.objects.filter(google_meaning='')[:500]
        time.sleep(50)


if __name__ == '__main__':
    import os
    from django.core.wsgi import get_wsgi_application
    os.environ['DJANGO_SETTINGS_MODULE'] = 'healthPriceless.settings'
    application = get_wsgi_application()
    test()
