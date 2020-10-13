# hero-section
This repo contains the code for the hero section of front end capstone at hackreactor

## Prerequisites
1. Ensure that you have `mysql` installed.
2. Update the `.env` file in the root folder with your mysql `username` and `password`. The server would generally listen to port 3001. To change this, update the `PORT` field in `.env`.
3. For further control, take a look at `database/config/config.js` to configure three different environments, `dev`, `test` and `production`, and edit the `.env` along with `config.js`.

## Database design
Database schema: ![Database Schema]('https://github.com/Jamie-Lee-Birdis/hero-section/blob/master/databaseSchema.png')

## Running the service
1. Seed the database
```bash
npm run setup:db
```

2. Build the files
```bash
npm run build
```

3. Start the server
```bash
npm run start-dev
```

4. Check the result in the browser at `localhost:3001`