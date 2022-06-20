/// <reference types="Cypress" />

import { login } from "../page_objects/login";
import { create } from "../page_objects/create";
const faker = require("faker");

describe("Organization test", () => {
  let loginData = {
    email: "raickovic2001@gmail.com",
    password: "test123456",
  };
  let organizationData = {
    name: faker.name.firstName(),
    boardName: faker.name.lastName(),
  };
  let orgId;
  let boardId;

  beforeEach("visit login page", () => {
    cy.visit("/login");
    cy.url().should("include", "/login");
  });

  it.skip("valid login", () => {
    cy.intercept({
      method: "POST",
      url: "https://cypress-api.vivifyscrum-stage.com/api/v2/login",
    }).as("login");

    login.login(loginData.email, loginData.password);

    cy.wait("@login").then((interception) => {
      expect(interception.response.statusCode).eq(200);
      expect(interception.response.body.token).to.exist;
      expect(interception.response.body.user.id).to.exist;
      cy.url().should("not.include", "/login");
    });
  });

  // ————————————————————————————————————————————————————————————————————————————————————
  it("create organization without image", () => {
    cy.intercept({
      method: "POST",
      url: "https://cypress-api.vivifyscrum-stage.com/api/v2/organizations",
    }).as("create");

    login.login(loginData.email, loginData.password);
    cy.wait(3000);
    cy.visit("/my-organizations");
    cy.url().should("include", "/my-organizations");

    create.create(organizationData.name);

    cy.wait("@create").then((interception) => {
      orgId = interception.response.body.id;
      expect(interception.response.statusCode).eq(201);
      expect(interception.response.body.id).to.exist;
      expect(interception.response.body.status).eq("active");
      expect(interception.response.body.name).eq(organizationData.name);
      cy.url().should("include", `/organizations/${orgId}/boards`);
    });
  });

  // ————————————————————————————————————————————————————————————————————————————————————
  it("add new board", () => {
    cy.intercept({
      method: "POST",
      url: `https://cypress-api.vivifyscrum-stage.com/api/v2/boards`,
    }).as("addBoard");

    login.login(loginData.email, loginData.password);
    cy.wait(3000);

    cy.visit(
      `https://cypress.vivifyscrum-stage.com/organizations/${orgId}/boards`
    );

    create.addBoard(organizationData.boardName);

    cy.wait("@addBoard").then((interception) => {
      boardId = interception.response.body.id;
      expect(interception.response.statusCode).eq(201);
      expect(interception.response.body.name).eq(organizationData.boardName);
      expect(interception.response.body.status).eq("active");
      expect(interception.response.body.type).eq("kanban_board");
      cy.url().should("include", `/boards/${boardId}`);
    });
  });

  // ————————————————————————————————————————————————————————————————————————————————————
  it("delete board", () => {
    cy.intercept({
      method: "DELETE",
      url: `https://cypress-api.vivifyscrum-stage.com/api/v2/boards/${boardId}`,
    }).as("deleteBoard");

    login.login(loginData.email, loginData.password);
    cy.wait(3000);

    cy.visit(
      `https://cypress.vivifyscrum-stage.com/boards/${boardId}/settings`
    );

    create.deleteBoard();

    cy.wait("@deleteBoard").then((interception) => {
      expect(interception.response.statusCode).eq(200);
      cy.url().should("include", `/organizations/${orgId}/boards`);
    });
  });
});
