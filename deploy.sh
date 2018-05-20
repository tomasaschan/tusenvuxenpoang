#!/bin/bash

if [[ $# -ne 1 ]]; then
  echo "Usage: ./deploy.sh [web|post-rsvp]"
  exit 1
fi

if [[ "$1" == "web" ]]; then
  echo "Building app..."
  cd app && yarn build > /dev/null && cd .. || cd ..

  echo "Uploading web assets..."
  aws s3 sync ./public s3://tusenvuxenpoang.se --delete --region eu-central-1 > /dev/null

  echo "Invalidating CloudFront cache"
  aws cloudfront create-invalidation --distribution-id "E4ZXM1QM1OLQJ" --paths /index.html /bundle.js /styles.css > /dev/null
elif [[ "$1" == "post-rsvp" ]]; then
  echo "Zipping lambda function..."
  cd post-rsvp && zip -ur ../post-rsvp.zip *  > /dev/null && cd .. || cd ..

  echo "Updating lambda code..."
  aws lambda update-function-code --function-name post-rsvp-1kVP --zip-file fileb://./post-rsvp.zip > /dev/null
else
  echo "I don't know how to deploy $1"
  exit 1
fi