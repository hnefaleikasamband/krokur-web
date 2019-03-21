#!/bin/bash
STAGE=$1
STAGING="staging"
PRODUCTION="prod"
if [ "$STAGE" != "$STAGING" ] && [ "$STAGE" != "$PRODUCTION" ]; then
  echo "you must pass in either \"staging\" or \"prod\""
  exit 1
fi

npm i -g caprover
rm -r ./dist
npm run build:$STAGE
tar -cvf ./deploy.tar --exclude="*.map" ./captain-definition ./dist/*
caprover deploy -t ./deploy.tar -h $CAP_HOST -a $APP_NAME -p $CAP_PASS > /dev/null 2>&1
