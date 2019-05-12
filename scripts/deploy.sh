#!/bin/bash
STAGE=$1
STAGING="staging"
PRODUCTION="prod"

case "$STAGE" in
  "$STAGING")
    echo -e "\u001b[32;7m Environment set to staging \u001b[0m"
    APP_NAME=$APP_NAME_STAGING
    REACT_APP_API_GATEWAY=$API_STAGING
    ;;
  "$PRODUCTION")
    echo -e "\u001b[33;1m Environment set to production \u001b[0m"
    APP_NAME=$APP_NAME_PRODUCTION
    REACT_APP_API_GATEWAY=$API_PROD
    ;;
  *)
    echo -e $"\u001b[31;1m Usage: $0 {staging|prod}\u001b[0m"
    exit 1
esac

export REACT_APP_API_GATEWAY="$REACT_APP_API_GATEWAY"

yarn add global caprover
rm -r ./build
yarn build --prod
tar -cvf ./deploy.tar --exclude="*.map" ./captain-definition ./build/*
caprover deploy -t ./deploy.tar -h $CAP_HOST -a $APP_NAME -p $CAP_PASS > /dev/null 2>&1
