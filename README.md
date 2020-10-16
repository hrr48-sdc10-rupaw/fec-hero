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

## CRUD

### GET /api/hero/all_info/<id>

Gets a variant of the data held for <id>. Returns the following JSON structure:
```json
{
  "gameName": "name",
  "description": "desc",
  "publisherId": 0,
  "developerId": 0,
  "releaseDate": "Date of release",
  "gameTags": ["Array of search terms"],
  "gameReviews": {
    "recentReviews": "Description",
    "recentReviewCount": "Number of reviews as a string",
    "allReviews": "Description",
    "allReviewsCount": "Number of reviews as a string"
  },
  "gameMedia": [
    {
      "mediaType": 0|1|2,
      "mediaUrl": "url"
    }
  ]
}
```
0 is an image, 1 is a video, and 2 is the background image for the product.

### POST /api/hero/all_info/

Creates entry. Requires JSON structure:

```json
{
  "info": {
    "gameName": "name",
    "description": "desc",
    "publisherId": 0,
    "developerId": 0,
    "releaseDate": "Date of release"
  },
  "media": {
    "bg": "url",
    "slides": [
      {
        "mediaType": 0|1,
        "mediaUrl": "url"
      }
    ]
  }
}
```
0 is an image, 1 is a video. Returns the ID of the new entry.

### PUT /api/hero/all_info/<id>

Takes the same JSON structure as in POST, but only those elements you want to change. <id> must exist.

### DELETE /api/hero/all_info/<id>

Deletes <id>, or does nothing if <id> doesn't exist. Returns nothing.