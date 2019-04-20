#!/usr/bin/env bash

registry=gcr.io
project=autocomplete-d62e3
app=autocomplete-app
source_location=.
tag=${registry}/${project}/${app}:latest

docker build -t ${tag} ${source_location}

docker push ${tag}
