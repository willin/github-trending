#!/bin/bash

git config user.name "Travis-CI"
git config user.email "travis@nodemeatspace.com"
git checkout master
node src
git add .
git commit -m "Travis-CI Deployed to Github [skip ci]"
git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" master:master > /dev/null 2>&1
