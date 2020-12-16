#!/bin/sh
mongod --fork --syslog
sleep 30s
node secret.js
npm run devStart