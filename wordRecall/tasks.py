from __future__ import absolute_import
print "absolute_import", absolute_import
import healthPriceless.settings
print healthPriceless.settings.DEBUG
from celery import shared_task
from wordRecall.models import Word
import time
from wordRecall import parser
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
