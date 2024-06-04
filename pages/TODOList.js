class TODOList {
    // Locators
    getModel() {
      return cy.get(".panel");
    }
    getModelTitile() {
      return cy.get(".panel > p");
    }
    getNewToDoInputBox() {
      return cy.get("#input-add");
    }
    getSearchInputBox() {
      return cy.get("#search");
    }
    getAddButton() {
      return cy.get("#add-btn");
    }
    getInputBoxesAndAddButton() {
      return cy.get("#add-btn, #input-add, #search");
    }
    getToDoTasks() {
      return cy.get(".todo-item");
    }
    getCompletedLogo() {
      return cy.get(".panel-icon").eq(0);
    }
    getRemoveLogo() {
      return cy.get(".panel-icon").eq(1);
    }
    getRemoveCompletedTasksButton() {
      return cy.get("#clear");
    }
    getErrorMsg() {
      return cy.get(".notification");
    }
    // Methods
    /**
     * This function clicks on Remove Completed Tasks Button
     * @returns {click}
     */
    ClickOnRemoveCompletedTasksButton() {
      return this.getRemoveCompletedTasksButton().click();
    }
  }
  
  export default TODOList;