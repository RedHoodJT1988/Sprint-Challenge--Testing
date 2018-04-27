const mongoose = require('mongoose');
const chai = require('chai');
const chaiHTTP = require('chai-http');
const { expect } = chai;
const sinon = require('sinon');
const server = require('./server');

const Game = require('./models');

chai.use(chaiHTTP);

describe('Games', () => {
  before(done => {
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/test');
    const db = mongoose.connection;
    db.on('error', () => console.error.bind(console, 'connection error'));
    db.once('open', () => {
      console.log('we are connected');
      done();
    });
  });

  after(done => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(done);
      console.log('we are disconnected');
    });
  });
  let gameId;
  // hint - these wont be constants because you'll need to override them.
  beforeEach(done => {
    // write a beforeEach hook that will populate your test DB with data
    // each time this hook runs, you should save a document to your db
    // by saving the document you'll be able to use it in each of your `it` blocks

    const newCharacter = new Character({
      name: 'Kyle Rayner',
      alias: 'White Lantern',
      firstAppearance: '1994',
    });
    newCharacter
      .save()
      .then(savedCharacter => {
        characterId = savedCharacter._id.toString();
      })
      .catch(error => console.log(error));
    done();
  });
  afterEach(done => {
    // simply remove the collections from your DB.
    Character.remove({})
      .then(done())
      .catch(err => {
        console.log(err);
        done();
      });
  });

  // test the POST here
  describe('[POST] /api/character/create', () => {
    it('should create a new character in the database', done => {
      chai
        .request(server)
        .post('/api/character/create')
        .send({
          character: 'Bruce Wayne',
          alias: 'Batman',
          firstAppearance: '1939',
        })
        .then(response => {
          expect(response.status).to.equal(200);
          done();
        });
    });
  });

  // test the GET here
  describe('[GET] /api/character/get', () => {
    it('should get a list of characters in the database', done => {
      chai
        .request(server)
        .get('/api/character/get')
        .then(response => {
          const { _id, name, alias, firstAppearance } = response.body[0];
          expect(response.status).to.equal(200);
          done();
        });
    });
  });

  // Test the DELETE here
  describe('[DELETE] /api/character/destroy/:id', () => {
    it('should be able to delete a character from the database', done => {
      chai
        .request(server)
        .delete(`/api/character/destroy/${characterId}`)
        .end((error, response) => {
          expect(response.body).to.be.equal('object');
          done();
        });
    });
  });

  // --- Stretch Problem ---
  // test the PUT here
  describe('[PUT] /api/character/update', () => {
    it('should be able to update a character in the database', done => {
      const updateCharacter = { id: characterId, title: 'Changed' };

      chai
        .request(server)
        .put('/api/character/update')
        .send()
        .end((error, response) => {
          if (error) {
            console.log(response);
          }
          expect(response.body).to.be.an('object');
          done();
        });
    });
  });
});
