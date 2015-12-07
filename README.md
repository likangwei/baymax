### [生词变色](http://github.com/likangwei/baymax) : 
#### 技术关键词：Django, lxml, RabbitMQ+Celery
在我们程序员日常工作中，免不了要看各种英文文档，但是英语毕竟不是我们的母语，所以可能看起来没有很透彻的感觉。
 
 这个web系统，主要实现了将网页上的生词进行变色显示，鼠标停留在生词上显示生词的翻译内容。并加入了词频功能，将单词按词频来排序，优先推荐记忆高词频的单词。
 
 该系统采用了 Django Web框架，利用 RabbitMQ+Celery进行异步任务处理，利用lxml来对爬下来的网页进行处理并生成新的页面。
 
 [点击进入](http://www.likangwei.com)
