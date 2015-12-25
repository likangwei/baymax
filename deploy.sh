WEBPATH=$(cd `dirname $0`;pwd)
echo $WEBPATH
cd $WEBPATH
git reset --hard
git clean -fx -d
git pull
