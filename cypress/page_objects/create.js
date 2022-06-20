class Create {
  get newOrganiaztionBtn() {
    return cy.get(".vs-c-my-organization--add-new");
  }

  get nameInput() {
    return cy.get("[type='text']");
  }

  get nextBtn() {
    return cy.get("[type='button']").last();
  }

  get uploadImageBtn() {
    return cy.get(".el-upload-dragger");
  }

  get closeBtn() {
    return cy.get("[name='close-new-board-modal-btn']");
  }

  get addBoardBtn() {
    return cy.get(".vs-c-boards-item__header--add-new ");
  }

  get nextBtnBoard() {
    return cy.get("[name='next_btn']");
  }

  get boardType() {
    return cy.get("[name='type_kanban']");
  }

  get nameInputBoard() {
    return cy.get("[name='name']");
  }

  get deleteBoardBtn() {
    return cy.get(".vs-c-btn--warning");
  }

  get yesBtn() {
    return cy.get("[name='save-btn']");
  }

  create(name) {
    this.newOrganiaztionBtn.click();
    this.nameInput.type(name);
    this.nextBtn.click();
    this.nextBtn.click();
  }

  addBoard(name) {
    this.closeBtn.click();
    this.addBoardBtn.click();
    this.nameInputBoard.type(name);
    this.nextBtnBoard.click();
    this.boardType.click();
    this.nextBtnBoard.click();
    this.nextBtnBoard.click();
    this.nextBtnBoard.click();
    this.nextBtnBoard.click();
  }

  deleteBoard() {
    this.deleteBoardBtn.click();
    this.yesBtn.click();
    this.closeBtn.click();
  }
}

export const create = new Create();
