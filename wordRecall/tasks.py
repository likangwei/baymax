from __future__ import absolute_import
import healthPriceless.settings
from wordRecall.models import Word
from celery import shared_task

current_words = {}

@shared_task
def checkout_new_word_and_add(words):
    for word in words:
        if word not in current_words:
            if not Word.objects.filter(spelling=word).exists():
                Word.objects.create(spelling=word, meaning='')
            current_words[word] = None

