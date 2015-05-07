__author__ = 'hanzhao'
import urllib
import lxml

def get_html_str(tran_page_url):
    url_md5 = md5util.get_md5_value(tran_page_url)
    html_tmp_file_name = "tmp/%s.html" %url_md5
    print os.path.abspath(html_tmp_file_name)

    if os.path.exists(html_tmp_file_name):
        return open(html_tmp_file_name).read()
    else:
        f = urllib.urlopen(tran_page_url)
        html_str = f.read()
        if f.getcode() == 200:
            open(html_tmp_file_name, 'w').write(html_str)
        return html_str

def get_html_element(tran_page_url):
    html_str = get_html_str(tran_page_url)
    html_element = lxml.html.fromstring(html_str)
    return html_element