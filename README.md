# TaskCRUD-Back

To install dependencies, run
``` bash
npm install
```

## Start local server
Envinroment setup

1) Create database
2) Copy .env.example to .env and fill with database credentials.



3) Migrations:
``` bash
npx sequelize-cli db:migrate
```

4) Seeders:
``` bash
npx sequelize-cli db:seed:all
```

5) Start server: 
``` bash
npm start
```

## For the test 
  1) Change 'NODE_ENV' variable to test
  2) Create a test database (do not use the same as production)
  3) Migrations:
``` bash
npx sequelize-cli db:migrate
```

  4) Seeders:
``` bash
npx sequelize-cli db:seed:all
```
  5) npm run test or npm run test-watch
