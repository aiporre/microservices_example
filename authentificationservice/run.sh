#!/bin/sh
node secret.js
mongod --fork --syslog
npm run devStart