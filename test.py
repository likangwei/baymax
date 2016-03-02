import os
import time
os.environ = {'PYTHONIOENCODING': 'UTF-8', 'LESS': '-R', 'VERSIONER_PYTHON_PREFER_32_BIT': 'no', 'LC_CTYPE': '', 'LOGNAME': 'likangwei', 'USER': 'likangwei', 'PATH': '/Users/likangwei/.autojump/bin:/Users/likangwei/.autojump/bin:/Users/likangwei/Library/Android/sdk/platform-tools:/usr/local/go/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin', 'HOME': '/Users/likangwei', 'PYTHONUNBUFFERED': '1', 'ZSH': '/Users/likangwei/.oh-my-zsh', 'SHELL': '/bin/zsh', 'VERSIONER_PYTHON_VERSION': '2.7', 'XPC_FLAGS': '0x0', 'GOPATH': '/Users/likangwei/Dropbox/workspace/go', 'XPC_SERVICE_NAME': 'com.jetbrains.pycharm.56352', 'PYTHONPATH': '/Users/likangwei/Dropbox/workspace/PycharmProjects/baymax', 'SSH_AUTH_SOCK': '/private/tmp/com.apple.launchd.Rc9IQgtdvu/Listeners', 'AUTOJUMP_ERROR_PATH': '/Users/likangwei/Library/autojump/errors.log', 'Apple_PubSub_Socket_Render': '/private/tmp/com.apple.launchd.yBkQ6OjIrI/Render', 'TMPDIR': '/var/folders/28/5_7j_d2s1qvcb12k52sn93pm0000gn/T/', 'LSCOLORS': 'Gxfxcxdxbxegedabagacad', 'AUTOJUMP_SOURCED': '1', 'OLDPWD': '/Applications/PyCharm.app/Contents/bin', 'PYCHARM_HOSTED': '1', '__CF_USER_TEXT_ENCODING': '0x1F5:0x19:0x34', 'PAGER': 'less'}
from splinter import Browser
b = Browser('chrome')

user_css = '#regName'
pwd_css = '#password'

b.visit('http://www.baihe.com/home.shtml')
user = b.find_by_css(user_css)[0]
user.fill('18612201227')
time.sleep(3)
pwd= b.find_by_css(pwd_css)[0]
pwd.fill('3632840aa')