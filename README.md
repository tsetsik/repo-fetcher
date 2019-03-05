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
  - JWT_SECRET
  - AUTH_URL
  - USERNAME - for demo purposes (username that checks for validation)
  - PASSWORD - for demo purposes (password that check for validation)
 - run `npm install`
- run `docker-compose up`

## Usage

The following endpoints are exposed, all via GET and they require token header `Authorization Bearer <token>`:
- /repos
- /generalinfo/:nameId
- /commits/:nameId

There is a endpoint `/auth` that uses POST and requires parameters `username` and `password`. Based on valid credentials, it issues a JWT token, which have to be used for authentication for the others endpoints

## Respond
- repos: `[{id: 123,..}, {id: 456,..}]`
- generalinfo: `{id: 123,..}`
- commits: `{sha: 'f20c3..', url: 'https://..',..}`

## Example iteractions with the api
- `curl -i -d "username=xxx&password=xxx" http://localhost:4000/auth` - It will return a header in which if the credentials are correct will be like `x-jwt-token: eyJhbGciOiJIUzI1NiIsInR5cCI6Ikp..`

- `curl -i -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6Ikp.." http://localhost:4000/repos` - we need to send the token in the headers so the api can validate it and give us access to the ednpoint that is requiring token