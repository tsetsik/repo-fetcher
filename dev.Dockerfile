# 1: Use node 11.0.0 as base:
FROM node:11.0.0

# 2: We'll set the application path as the working directory
WORKDIR /usr/src/app

# 3: We'll add the app's binaries path to $PATH:
ENV PATH=/usr/src/app/bin:$PATH

COPY . /usr/src/app

# RUN echo 'export PATH=$(npm bin):$PATH' >> ~/.bashrc

# 4: Install ember-cli and friends:
RUN set -ex \
  && npm install --quiet \
  && npm install -g typescript \
  && npm install -g ember-cli

# 5: Install watchman:
RUN set -ex \
  && export WATCHMAN_VERSION=4.6.0 \
  && curl -SL "https://github.com/facebook/watchman/archive/v${WATCHMAN_VERSION}.tar.gz" | tar -xz -C /tmp/ \
  && cd /tmp/watchman-${WATCHMAN_VERSION} \
  && ./autogen.sh \
  && ./configure \
  && apt-get update && apt-get install -y --no-install-recommends python-dev \
  && make \
  && make install \
  && apt-get purge -y --auto-remove python-dev \
  && rm -rf /var/lib/apt/lists/* \
  && rm -rf /tmp/*

# 6: Expose the app and live-reload ports:
EXPOSE 4200 35730

# 7: Set the default command:
CMD ["ember", "server", "--live-reload-port", "35730"]