
#!/bin/bash
clear 
git fetch
if [ "$#" -eq  "1" ]
  then
    echo "Change branch to $1"
    git checkout $1
    git pull origin $1 
 else
    echo "Change branch to master"
    git checkout master
    git pull origin master
fi
echo "set up database config"
node db-setup.js
echo "Reload apps on pm2"
pm2 reload all