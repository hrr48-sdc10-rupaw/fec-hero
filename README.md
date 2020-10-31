## VAPORWARE HEADER
A display case for products, with a brief description and a turntable for media.

Build:
```sh
npm run build
```
in that order. `npm start` starts the server. Be sure you have a Postgres server running, and that you acquaint it with `config.js`.

## CRUD
__CRUD operations beyond "read" are not active during deployment.__

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