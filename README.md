# hero-section
This repo contains the code for the hero section of front end capstone at hackreactor

## Prerequisites
1. Ensure that you have `mysql` installed.
2. Update the `.env` file in the root folder with your mysql `username` and `password`. The server would generally listen to port 3001. To change this, update the `PORT` field in `.env`.
3. For further control, take a look at `database/config/config.js` to configure three different environments, `dev`, `test` and `production`, and edit the `.env` along with `config.js`.

## Database design
Database schema: Check the screenshot of the database schema in the file called 'databaseSchema.png' in the repo.

Additional info: The table called game_media contains the images that are used to poplulate the service with images.
The images are filtered according to the following rule: if `media_type === 2`, that indicates a header image, that is the
image displayed at the top right corner. Additionally, if `media_type === 0`, that would be one of the images to be
used to populate the carousel. `media_type === 1` indicates a video, that is not currently used.

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