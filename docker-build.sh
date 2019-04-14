#!/usr/bin/env bash

registry=localhost
project=demo
app=autocomplete
source_location=.
tag=${registry}/${project}/${app}:latest

docker build -t ${tag} ${source_location}

docker push ${tag}
