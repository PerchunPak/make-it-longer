ARG ORIGIN="http://localhost:3000"
ARG SENTRY_AUTH_TOKEN

FROM node:20-slim AS base

WORKDIR /app

RUN \
  apt-get update && \
  apt-get install ca-certificates && \
  apt-get clean

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN corepack prepare pnpm@latest --activate


FROM base AS build

ARG SENTRY_AUTH_TOKEN

COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

COPY . .

ENV ORIGIN=${ORIGIN}
ENV SENTRY_AUTH_TOKEN=${SENTRY_AUTH_TOKEN}

RUN pnpm run build


FROM base AS prod-dependencies
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile --prod


FROM node:20-slim AS final

WORKDIR /app
COPY --from=build /app/build /app
COPY --from=prod-dependencies /app/node_modules /app/node_modules
COPY package.json .

EXPOSE 3000
ENTRYPOINT ["node", "index.js"]
