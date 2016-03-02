import sys
reload(sys)
sys.setdefaultencoding('utf8')
from splinter import Browser
import time
import json
import requests
import base64
# host = 'http://0.0.0.0:8877'
host = 'http://readdoc.net'
import os
os.environ = {'PYTHONIOENCODING': 'UTF-8', 'LESS': '-R', 'VERSIONER_PYTHON_PREFER_32_BIT': 'no', 'LC_CTYPE': '', 'LOGNAME': 'likangwei', 'USER': 'likangwei', 'PATH': '/Users/likangwei/.autojump/bin:/Users/likangwei/.autojump/bin:/Users/likangwei/Library/Android/sdk/platform-tools:/usr/local/go/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin', 'HOME': '/Users/likangwei', 'PYTHONUNBUFFERED': '1', 'ZSH': '/Users/likangwei/.oh-my-zsh', 'SHELL': '/bin/zsh', 'VERSIONER_PYTHON_VERSION': '2.7', 'XPC_FLAGS': '0x0', 'GOPATH': '/Users/likangwei/Dropbox/workspace/go', 'XPC_SERVICE_NAME': 'com.jetbrains.pycharm.56352', 'PYTHONPATH': '/Users/likangwei/Dropbox/workspace/PycharmProjects/baymax', 'SSH_AUTH_SOCK': '/private/tmp/com.apple.launchd.Rc9IQgtdvu/Listeners', 'AUTOJUMP_ERROR_PATH': '/Users/likangwei/Library/autojump/errors.log', 'Apple_PubSub_Socket_Render': '/private/tmp/com.apple.launchd.yBkQ6OjIrI/Render', 'TMPDIR': '/var/folders/28/5_7j_d2s1qvcb12k52sn93pm0000gn/T/', 'LSCOLORS': 'Gxfxcxdxbxegedabagacad', 'AUTOJUMP_SOURCED': '1', 'OLDPWD': '/Applications/PyCharm.app/Contents/bin', 'PYCHARM_HOSTED': '1', '__CF_USER_TEXT_ENCODING': '0x1F5:0x19:0x34', 'PAGER': 'less'}
def webkit_get_meanings(words):
    with Browser('chrome') as browser:
        # Visit URL
        url = "http://translate.google.cn/#en/zh-CN/"
        browser.visit(url)
        new_translate = None
        tmp_translate = None
        for idx, word in enumerate(words):
            spelling = word['spelling']
            print 'fill %s' % spelling
            browser.fill('text', spelling)
            retry = 0
            while new_translate == tmp_translate and retry < 5:
                retry += 1
                time.sleep(1)
                print new_translate, tmp_translate
                try:
                    element = browser.find_by_xpath('//*[@id="result_box"]/span')[0]
                    new_translate = element.text
                except:
                    new_translate = tmp_translate
            if retry >= 5:
                continue
            tmp_translate = new_translate
            print spelling, new_translate
            rest_update_meaning(word['id'], new_translate)

def rest_update_meaning(word_id, translate):
    headers = {
        'authorization': "Basic %s" % base64.encodestring('likangwei:3632840aa').strip(),
    }
    url = '%s/rest/words/%s/' % (host, word_id)
    response = requests.patch(url, json={'google_meaning': translate}, headers=headers)
    print response.ok

def test():
    url = '%s/rest/words/' % host
    param = {
        'filter': json.dumps({'google_meaning': ''})
    }
    response = requests.get(url, params=param)
    if response.ok:
        data = response.json()
        if data:
            webkit_get_meanings(data)
        else:
            print 'no data'
    else:
        print response.status_code

if __name__ == '__main__':
    test()
