from splinter import Browser
import time
import json
import requests
host = 'http://0.0.0.0:8877'
host = 'http://readdoc.net'

def webkit_get_meanings(words):
    with Browser('chrome') as browser:
        # Visit URL
        url = "http://translate.google.cn/"
        browser.visit(url)
        new_translate = None
        tmp_translate = None
        for word in words:
            spelling = word['spelling']
            browser.fill('text', spelling)
            while new_translate == tmp_translate:
                time.sleep(1)
                new_translate = browser.find_by_xpath('//*[@id="result_box"]/span')[0].text
            tmp_translate = new_translate
            print spelling, new_translate
            rest_update_meaning(word['id'], new_translate)

def rest_update_meaning(word_id, translate):
    url = '%s/rest/words/%s/' % (host, word_id)
    response = requests.patch(url, json={'google_meaning': translate})
    print response.ok

def test():
    url = '%s/rest/words/' % host
    param = {
        'filter': json.dumps({'google_meaning': ''})
    }
    response = requests.get(url, params=param)
    if response.ok:
        data = response.json()
        webkit_get_meanings(data)
    else:
        print response.status_code

if __name__ == '__main__':
    test()
