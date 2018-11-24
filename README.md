# tmdb-client-demo

The Movie DB client demo

<img src=screenshot.jpg width=300>

# Getting started

## Install dependencies

```sh
npm install
```

## Create `secrets.json` file

This web app requires access key from https://www.themoviedb.org/settings/api

Please register and generate your keys.

Create `secrets.json` file with the following content:

```JSON
{
  "tmdb-auth-v3": "[your auth v3 key]"
}
```

## Start local server

```sh
npm run start-dev
```

## Visit web app

Open http://localhost:8080 in your browser
