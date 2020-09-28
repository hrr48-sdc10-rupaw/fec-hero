const faker = require('faker')
faker.seed(123);

module.export = {
  gamesId: [1, 2, 3, 4, 5],
  gameName: ['Hello Kitty', 'Doom Eternal', faker.hacker.adjective(), faker.hacker.adjective(), faker.hacker.adjective()],
  publisher_id: [getPublisherId(), getPublisherId(), getPublisherId(), getPublisherId(), getPublisherId()],
  developer_id: [getDeveloperId(), getDeveloperId(), getDeveloperId(), getDeveloperId(), getDeveloperId()],
  description: [helloKittyDescription, doomEternalDescription, faker.lorem.paragraphs(), faker.lorem.paragraphs(), faker.lorem.paragraphs()],
  releaseDate: [helloKittyReleaseDate, doomEternalReleaseDate, getReleaseDate(), getReleaseDate(), getReleaseDate()]
}