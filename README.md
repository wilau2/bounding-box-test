# Bounding box
programmation test

## Setup
### With nodejs
```
  "engines": {
    "node": ">=10.1.0",
    "npm": ">=5.6.0"
  }
```
`npm install`
`npm run start`

### With Docker
```
docker build -t bounding-box .
docker run -p 8000:8000 bounding-box
```

## Load tests
### Install artillery
`npm install -g artillery`

### Run artillery
```ES6
artillery quick --count 500 -n 10 http://localhost:8000/id/744
```
