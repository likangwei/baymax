ps auxf|grep uwsgi|awk '{print $2}'|xargs kill -9
