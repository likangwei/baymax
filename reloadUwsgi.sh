ps auxf|grep uwsgi|awk '{print $2}'|xargs kill -9
uwsgi -x uwsgi.xml --daemonize ./uwsgi.log
