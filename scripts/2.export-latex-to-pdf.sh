
#!/bin/bash

# Parameter for CI/CD and offline testing
# This is another hoop for CI/CD, you can usually ignore it:
tty_params=""
if [[ $- == *i* ]]; then
    echo "in"
    tty_params="--interactive --tty"
fi

# Build the Docker image
docker build --tag texlive-extended ./tex

# Run the Docker container
docker run --rm \
    --volume `pwd`/tex:/work/src:ro \
    --volume `pwd`/tex/out:/work/out \
    ${tty_params} \
    texlive-extended:latest \
    work lualatex WongZhaoWu-resume.tex

# Move compiled pdf to static folder
cp tex/out/WongZhaoWu-resume.pdf static/WongZhaoWu-resume.pdf