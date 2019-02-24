# Repo Fetcher
A nodejs backend api that has 3 restful endpoints for iteracting with github api. It does supports caching

## Instalation

In order to get it up and running in development mode, you need to perform the follwoing things:
- Make sure that you have docker installed on your machine
- clone the repo
- inside the repository folder create a .env file that holds at least the following variables:
  - REPOS_URL
  - COMMITS_URL
  - GENERALINFO_URL
  - PORT
  - HOST
- run `docker-compose up`

## Usage

The following endpoints are exposed, all via GET:
- /repos
- /generalinfo/:nameId
- /commits/:nameId

## Respond
- repos: `[{id: 123,..}, {id: 456,..}]`
- generalinfo: `{id: 123,..}`
- commits: `{sha: 'f20c3..', url: 'https://..',..}`

