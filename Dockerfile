ARG BUILDER_IMAGE
ARG RUNTIME_IMAGE

FROM ${BUILDER_IMAGE} AS builder
ARG PROJECT_ROOT

WORKDIR ${PROJECT_ROOT}

COPY package.json package.json

RUN npm install

COPY . .

RUN npm run build

FROM ${RUNTIME_IMAGE}
ARG PROJECT_ROOT

WORKDIR ${PROJECT_ROOT}

RUN rm -rf *

COPY --from=builder $PROJECT_ROOT/dist/static ./static
COPY --from=builder $PROJECT_ROOT/dist/index.html ./index.html
COPY --from=builder $PROJECT_ROOT/dist/asset-manifest.json ./asset-manifest.json
COPY nginx.conf /etc/nginx/conf.d/default.conf

ENTRYPOINT ["nginx", "-g", "daemon off;"]