__author__ = 'likangwei'
import sys
reload(sys)
sys.setdefaultencoding('utf8')
import time
import json
import requests
import base64
# host = 'http://0.0.0.0:8877'
host = 'http://readdoc.net'
import os
def get_meanings(words):
    count = len(words)
    skip = 50
    for idx in range(0, count, skip):
        cur_words = words[idx:idx+skip]
        spelling_list = [word['spelling'] for word in cur_words]
        trans = get_meaning_from_google(spelling_list)
        assert len(trans) == len(cur_words)
        for word in cur_words:
            rest_update_meaning(word['id'], trans.pop(0))

def get_meaning_from_google(word_spellings):
    params = {
        'key': 'AIzaSyBh5ETQW4x_rat4PoOcyuGrTni17xexWlc',
         'q': word_spellings,
         'target': 'zh-CN',
         'source': 'en'
    }
    response = requests.get('https://www.googleapis.com/language/translate/v2', params=params)
    print response.url
    data = response.json().get("data", None)
    if not data:
        print response.json()
        return
    translations = data['translations']
    print translations
    return [t['translatedText'] for t in translations]

def rest_update_meaning(word_id, translate):
    headers = {
        'authorization': "Basic %s" % base64.encodestring('likangwei:3632840aa').strip(),
    }
    url = '%s/rest/words/%s/' % (host, word_id)
    response = requests.patch(url, json={'google_meaning': translate}, headers=headers)
    print word_id, response.ok

def test():
    url = '%s/rest/words/' % host
    param = {
        'filter': json.dumps({'google_meaning': ''})
    }
    response = requests.get(url, params=param)
    if response.ok:
        data = response.json()
        if data:
            get_meanings(data)
        else:
            print 'no data'
    else:
        print response.status_code

if __name__ == '__main__':
    test()
