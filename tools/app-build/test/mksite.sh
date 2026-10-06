#!/bin/bash
# Fresh test copy of the app (data.js snapshot; never touches the real data.js).
set -e
rm -rf /workspace/v2-build/site && mkdir -p /workspace/v2-build/site
cp -r /workspace/icu-quickref/. /workspace/v2-build/site/
node --check /workspace/v2-build/site/data.js
