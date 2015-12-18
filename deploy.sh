WEBPATH=$(cd `dirname $0`;pwd)
echo $WEBPATH

git reset --hard
git clean -f
git pull