from __future__ import absolute_import
print "absolute_import", absolute_import
import healthPriceless.settings
print healthPriceless.settings.DEBUG
from celery import shared_task
from wordRecall.models import Word
import time
from wordRecall.parser import get_html_word_repeated_info


@shared_task
def add(x, y):
    time.sleep(10)
    return x + y


@shared_task
def mul(x, y):
    return x * y


@shared_task
def xsum(numbers):
    return sum(numbers)


@shared_task
def add_all_page_word_to_repeated(html_url):
    print '>' * 30, html_url
    word_repeated_map = get_html_word_repeated_info(html_url)

    for word_spelling in word_repeated_map:
        word, created = Word.objects.get_or_create(spelling=word_spelling)
        word.add_repeated(word_repeated_map[word_spelling])
    print '<' * 30
    add_all_word_meaning()


def add_all_word_meaning():
    from wordRecall.wordinfos import get_meaning_of_word
    for word in Word.objects.filter(meaning=''):
        if not word.meaning:
            word.meaning = get_meaning_of_word(word.spelling)
            word.save()