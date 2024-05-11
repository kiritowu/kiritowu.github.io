#!/bin/bash

# Parameter for CI/CD and offline testing
# This is another hoop for CI/CD, you can usually ignore it:
tty_params=""
if [[ $- == *i* ]]; then
    tty_params="--interactive --tty"
fi

docker build --tag tld-hello-world .
docker run --rm \
    --volume `pwd`:/work/src:ro \
    --volume `pwd`/out:/work/out \
    ${tty_params} \
    tld-hello-world:latest \
    work lualatex template.tex