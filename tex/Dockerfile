ARG base_image="reitzig/texlive-base-luatex:latest"
FROM ${base_image}

RUN apk --no-cache add font-linux-libertine msttcorefonts-installer fontconfig && \
    update-ms-fonts && \
    fc-cache -f
RUN tlmgr update --self && \
    tlmgr install amsmath tabu changepage enumitem catchfile fontawesome varwidth 
