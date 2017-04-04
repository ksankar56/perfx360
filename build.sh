BASEDIR=$(dirname "$0")
mongodb="./db/mongodb-osx-ssl-x86_64-3.4.3"
DBDIR="./db"

echo "############################"
echo "Checking MongoDB Extracted"
echo "############################"

if test -d mongodb-osx-ssl-x86_64-3.4.3
then
	echo "$mongodb found."
else
	echo "$mongodb not found."
	#tar -xvf ./db/mongodb-osx-ssl-x86_64-3.4.3.tgz -C db
fi
