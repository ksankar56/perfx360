BASEDIR=$(dirname "$0")
mongodb="./dist/db/mongodb-osx-ssl-x86_64-3.4.3"
DBDIR="./dist/db"

echo "############################"
echo "Checking MongoDB Extracted"
echo "############################"

if test -d mongodb-osx-ssl-x86_64-3.4.3
then
	echo "$mongodb found."
else
	echo "$mongodb not found."
	#tar -xvf ./dist/db/mongodb-osx-ssl-x86_64-3.4.3.tgz -C db
fi
