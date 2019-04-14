#!/usr/bin/env bash

port=8080
registry=localhost
project=demo
app=autocomplete
tag=${registry}/${project}/${app}:latest

docker run -p ${port}:${port} -e API_KEY=${API_KEY} ${tag}
