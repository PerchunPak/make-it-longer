# MIL - Make it longer

[![Support Ukraine](https://badgen.net/badge/support/UKRAINE/?color=0057B8&labelColor=FFD700)](https://war.ukraine.ua/support-ukraine/)

Unshorts shorten links (like bit.ly) and shows history of redirects.

## How to build a Docker image

```shell
sudo docker build --build-arg='ORIGIN=https://superhub.perchun.it' --build-arg='SENTRY_AUTH_TOKEN=...' -t make-it-longer .
sudo docker run -d --name make-it-longer -p 3000:3000 make-it-longer
```

## Thanks

This project was generated with [svelte-template](https://github.com/PerchunPak/svelte-template).
