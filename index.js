'use strict';

import Hapi from 'hapi';
import Repos from './components/repos';
import Commits from './components/commits';
import dotenv from 'dotenv';

const result = dotenv.config();

const server = Hapi.server({
    port: 4000,
    host: 'localhost'
});

const init = async () => {
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

server.route({
  method: 'GET',
  path: '/repos',
  handler: (request, h) => {
    return (new Repos(request, h)).render();
  }
});

server.route({
  method: 'GET',
  path: '/commits/{repo}/{commit_hash}',
  handler: (request, h) => {
    return (new Commits(request, h)).render();
  }
});

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();