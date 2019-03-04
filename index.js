'use strict';

import Hapi from 'hapi';
import Repos from './components/repos';
import Commits from './components/commits';
import Generalinfo from './components/generalinfo';
import Auth from './components/auth';
import dotenv from 'dotenv';

const result = dotenv.config();

const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ["*"],
        exposedHeaders: ["X-JWT-TOKEN"],
        credentials: true
      }
    }
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

server.route({
  method: 'GET',
  path: '/generalinfo/{repo}',
  handler: (request, h) => {
    return (new Generalinfo(request, h)).render();
  }
});

server.route({
  method: 'POST',
  path: '/auth',
  handler: (request, h) => {
    return (new Auth(request, h)).render();
  }
});

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();