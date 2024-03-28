#!/bin/bash

deno run -A --watch=static/,routes/ --location=http://localhost:8000/ --allow-env dev.ts

# firefox "http://localhost:8000" &
