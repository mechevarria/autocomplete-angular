#!/usr/bin/env bash

port=8080
registry=gcr.io
project=autocomplete-d62e3
app=autocomplete-app
tag=${registry}/${project}/${app}:latest

docker run -p ${port}:${port} -e API_KEY=${API_KEY} ${tag}
