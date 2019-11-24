process.env.NODE_ENV = 'test';

const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');
const knex = require('../knex');

describe('/api', () => {
  beforeEach(() => {
    return knex.seed.run();
  });
  after(() => {
    knex.destroy();
  });
  describe('/topics', () => {
    it('GET:200 returns an array of topics', () => {
      return request(app)
        .get('/api/topics')
        .expect(200)
        .then(({ body }) => {
          const isTopic = element => {
            expect(element).to.have.keys('slug', 'description');
            if (element.slug && element.description) return true;
            return false;
          };
          expect(body.topics.every(isTopic)).to.be.true;
        });
    });
  });
  describe('/users', () => {
    it('GET:200 responds with an array of users', () => {
      return request(app)
        .get('/api/users')
        .expect(200)
        .then(({ body: { users } }) => {
          const isUser = element => {
            const { username, name, avatar_url } = element;
            expect(element).to.have.keys('username', 'name', 'avatar_url');
            if (username && name && avatar_url) return true;
            return false;
          };
          expect(users.every(isUser)).to.be.true;
        });
    });
    describe('/:username', () => {
      it('GET:200 returns a user', () => {
        return request(app)
          .get('/api/users/rogersop')
          .expect(200)
          .then(({ body: { user } }) => {
            expect(user).to.eql({
              username: 'rogersop',
              name: 'paul',
              avatar_url:
                'https://avatars2.githubusercontent.com/u/24394918?s=400&v=4'
            });
          });
      });
      it('GET:404 returns a message explaining that user doesnt exist', () => {
        const user = 'shaq';
        return request(app)
          .get(`/api/users/${user}`)
          .expect(404)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal(`User (${user}) does not exist`);
          });
      });
    });
  });
  describe('/articles', () => {
    xit('GET:200 ', () => {});
    describe.only('/:article_id', () => {
      it('GET:200 returns the request article', () => {
        const article_id = 2;
        return request(app)
          .get(`/api/articles/${article_id}`)
          .expect(200)
          .then(({ body: { article } }) => {
            console.log(article);
            expect(article.article_id).to.equal(article_id);
            expect(article.comment_count).to.equal(1);
            expect(article).to.contain.keys(
              'title',
              'body',
              'votes',
              'topic',
              'author',
              'created_at'
            );
          });
      });
      it('GET:404 returns a message explaining the article does not exists', () => {
        const article_id = 2000;
        return request(app)
          .get(`/api/articles/${article_id}`)
          .expect(404)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal(
              `article with article_id (${article_id}) does not exist`
            );
          });
      });
      it('GET:400 returns a message explaining id should be an integer', () => {
        const article_id = 'not-an-id';
        return request(app)
          .get(`/api/articles/${article_id}`)
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal(
              `"${article_id}" is an invalid input syntax for type integer`
            );
          });
      });
      it('PATCH:200 returns the updated article', () => {
        return request(app)
          .patch('/api/articles/2')
          .send({ inc_votes: 200 })
          .expect(200)
          .then(({ body: { article } }) => {
            expect(article.votes).to.equal(200);
          });
      });
      it('PATCH:200 returns the article with nothing updated if inc_votes not sent', () => {
        return request(app)
          .patch('/api/articles/2')
          .send({ is: 200 })
          .expect(200)
          .then(({ body: { article } }) => {
            expect(article.votes).to.equal(0);
          });
      });
      it("PATCH:404 returns a message explaining the id doesn't exist", () => {
        return request(app)
          .patch('/api/articles/2000')
          .send({ inc_votes: 200 })
          .expect(404)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal(
              'article with article_id (2000) does not exist'
            );
          });
      });
      it('PATCH:400 returns a message explaining votes must be a number', () => {
        return request(app)
          .patch('/api/articles/2')
          .send({ inc_votes: 'not-a-number' })
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal(
              '"NaN" is an invalid input syntax for type integer (votes value)'
            );
          });
      });
      it('PATCH:400 returns a message explaining article_id must be a number', () => {
        return request(app)
          .patch('/api/articles/not-an-id')
          .send({ inc_votes: 200 })
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal(
              '"not-an-id" is an invalid input syntax for type integer'
            );
          });
      });
    });
  });
});
