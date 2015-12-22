WEBPATH=$(cd `dirname $0`;pwd)
cd $WEBPATH
ps auxf|grep uwsgi|awk '{print $2}'|xargs kill -9

sleep 3
uwsgi -x uwsgi.xml --daemonize ./uwsgi.log
