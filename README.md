# bench-web

A simple web interface for Benchmarks

## Data Format

The data should be put in `data/`.

Example data format can be found [here](https://github.com/liufengyun/bench/tree/gh-pages/data):

- `charts.js`: specify meta data for charts
- `key.json`: hold data points for the line `key`

## Development

- `npm install`
- `npm run watch`

## Deployment

- `npm run build`
- `sh deploy user@host:path/to/dest/`


