# App

API Developed with NodeJS with Typescript and fastify to solve SBF Backend Challenge.

## Instructions to Run Locally
Before run the application you will need to create a account to get the API KEY from [APILayer](https://apilayer.com/marketplace/exchangerates_data-api). This API KEY is used to get the current quotation.

After that to run the server you will find two ways:
* Using Docker Compose:
  ```
  docker-compose up
  ```
* Using NPM:
  ```
  npm install
  npm start
  ```

## Brief Explanation
The application makes a request to the External API [APILayer](https://apilayer.com/marketplace/exchangerates_data-api) and saves the price information of each currency in cache using redis.

## How to get the values:
* `/api/converter/{symbol}/{price}`:
  Where `symbol` is like `USD` and `price` is the value of the product.

## Tests
To start the unit tests run:
```
npm run test
```
And to start the e2e tests run:
```
npm run test:e2e
```