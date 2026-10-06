#!/bin/bash
# Concatenate app.js parts into /workspace/icu-quickref/app.js and syntax-check.
set -e
cd /workspace/v2-build
for f in parts/*.js; do node --check "$f" || { echo "FAIL $f"; exit 1; }; done
{
  echo "/* ICU QuickRef: app logic (v2). Content lives in data.js. No build step needed to deploy:"
  echo "   this file is plain ES5-compatible JS. Supports both data schemas (string list items or"
  echo "   {id,t,s} objects; top-level meta{} or legacy version/date/reviewStatus). */"
  echo "(function () {"
  echo "  'use strict';"
  echo "  try {"
  cat parts/*.js
  cat <<'FALLBACK'
  } catch (fatal) {
    /* Last-resort recovery if startup itself fails: plain DOM, no dependencies. */
    try { console.error('[icuqr] fatal', fatal); } catch (e) {}
    var root = document.getElementById('app');
    if (root) {
      root.innerHTML = '<div class="recovery" role="alert"><h1 id="view-h" tabindex="-1">Something went wrong</h1><p>The app could not start. Use facility protocol meanwhile.</p>' +
        '<div class="btnrow"><button type="button" class="abtn primary" id="fx-reload">Try again</button><button type="button" class="abtn danger" id="fx-reset" data-act="resetall">Reset app data</button></div>' +
        '<p class="note">Reset deletes ticks, code log, pins and settings on this device.</p></div>';
      document.getElementById('fx-reload').addEventListener('click', function () { location.reload(); });
      document.getElementById('fx-reset').addEventListener('click', function () {
        if (!window.confirm('Reset app data? Deletes ticks, code log, pins and settings on this device.')) return;
        try { Object.keys(localStorage).forEach(function (k) { if (k.indexOf('icuqr.') === 0) localStorage.removeItem(k); }); } catch (e) {}
        location.reload();
      });
    }
  }
FALLBACK
  echo "})();"
} > /workspace/v2-build/app.build.js
node --check /workspace/v2-build/app.build.js
mv /workspace/v2-build/app.build.js /workspace/icu-quickref/app.js
echo "built app.js: $(wc -l < /workspace/icu-quickref/app.js) lines"
