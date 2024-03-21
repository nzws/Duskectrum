#!/bin/bash

set -x

deno run -A --watch=static/,routes/ --location=http://localhost:8000/ dev.ts

# firefox "http://localhost:8000" &
