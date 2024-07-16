ARG base_image="reitzig/texlive-base-luatex:latest"
FROM ${base_image}

RUN apk --no-cache add font-liberation fontconfig && \
    fc-cache -f -v
