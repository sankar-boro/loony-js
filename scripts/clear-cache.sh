#!/usr/bin/env sh

npm cache clean --force
npm cache verify

rm -rf node_modules
rm -rf package-lock.json
rm -rf yarn.lock