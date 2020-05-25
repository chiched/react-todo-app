const knex = require("../db/knex");
const request = require("supertest");

const expect = require("chai").expect;
const fixtures = require("./fixtures");

const app = require("../app");

describe("CRUD Todos", () => {
  before((done) => {
    knex.migrate
      .latest()
      .then(() => {
        return knex.seed.run();
      })
      .then(() => done());
  });

  it("Lists all records", (done) => {
    request(app)
      .get("/api/")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).to.be.a("array");
        expect(response.body).to.be.deep.equal(fixtures.todos);
        done();
      });
  });

  it("Creates a record", (done) => {
    request(app)
      .post("/api/")
      .send(fixtures.todo)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).to.be.a("object");
        fixtures.todo.id = response.body.id;
        expect(response.body).to.deep.equal(fixtures.todo);
        done();
      });
  });

  it("Updates a record", (done) => {
    fixtures.todo.title = "Buy eggs";
    request(app)
      .put("/api/6")
      .send(fixtures.todo)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).to.be.a("object");
        fixtures.todo.id = response.body.id;
        expect(response.body).to.deep.equal(fixtures.todo);
        done();
      });
  });
});
