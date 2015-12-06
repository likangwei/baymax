


def get_title(html):

    if html is None:
        return ""
    titles = html.xpath('/html/head/title')
    for title in titles:
        return title.text
    return ""