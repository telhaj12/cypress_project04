/// <reference types="cypress"/>

import TODOList from "../../../pages/TODOList";

const toDoList = new TODOList();

const arr = ["New Task 1 {enter}", "New Task 2 {enter}", "New Task 3 {enter}", "New Task 4 {enter}", "New Task 5 {enter}"];

describe("Cypress project 04 - To Do List Form", () => {
  beforeEach(() => {
    cy.visit("https://www.techglobal-training.com/frontend/project-6");
  });

  it("Test Case 01 - Todo-App Modal Verification", () => {
    /*
    Navigate to https://techglobal-training.com/frontend/project-6.
    Confirm that the todo-app modal is visible with the title “My Tasks.”
    Validate that the New todo input field is enabled for text entry.
    Validate ADD button is enabled.
    Validate Search field is enabled.
    Validate that the task list is empty, displaying the message “No tasks found!”
    */
    toDoList.getModel().should("be.visible");
    toDoList.getModelTitile().should("have.text", "My Tasks");
    toDoList.getInputBoxesAndAddButton().each(($el) => {
      cy.wrap($el).should("be.enabled");
    });
    toDoList.getToDoTasks().should("have.text", "No tasks found!");
  });

  it("Test Case 02 - Single Task Addition and Removal", () => {
    /*
    Navigate to https://techglobal-training.com/frontend/project-6
    Enter a new task in the todo input field and add it to the list.
    Validate that the new task appears in the task list.
    Validate that the number of tasks in the list is exactly one.
    Mark the task as completed by clicking on it.
    Validate item is marked as completed.
    Click on the button to remove the item you have added.
    Remove the completed task by clicking the designated removal button.
    Validate that the task list is empty, displaying the message “No tasks found!”. 
     */
    toDoList.getNewToDoInputBox().type("New Task {enter}");
    toDoList.getToDoTasks().should("have.text", "New Task");
    toDoList.getToDoTasks().should("have.length", 1);
    toDoList.getToDoTasks().click();
    toDoList.getCompletedLogo().should("be.visible");
    toDoList.getToDoTasks().click();
    toDoList.getRemoveLogo().click();
    toDoList.getToDoTasks().should("have.text", "No tasks found!");
  });

  it("Test Case 03 - Multiple Task Operations", () => {
    /*
    Navigate to https://techglobal-training.com/frontend/project-6
    Enter and add 5 to-do items individually.
    Validate that all added items match the items displayed on the list.
    Mark all the tasks as completed by clicking on them.
    Click on the “Remove completed tasks!” button to clear them.
    Validate that the task list is empty, displaying the message “No tasks found!”.
    */
    arr.forEach((value) => {
      toDoList.getNewToDoInputBox().clear().type(`${value}{enter}`);
    });
    toDoList.getToDoTasks().should("have.length", 5);
    toDoList.getToDoTasks().each(($task) => {
      cy.wrap($task).click();
    });
    // toDoList.ClickOnRemoveCompletedTasksButton();
    // toDoList.getToDoTasks().should("have.text", "No tasks found!");
  });

  it("Test Case 04 - Search and Filter Functionality in todo App", () => {
    /*
    Navigate to https://techglobal-training.com/frontend/project-6
    Enter and add 5 to-do items individually.
    Validate that all added items match the items displayed on the list.
    Enter the complete name of the previously added to-do item into the search bar.
    Validate that the list is now filtered to show only the item you searched for.
    Validate that the number of tasks visible in the list is exactly one.
    */
    arr.forEach((value) => {
      toDoList.getNewToDoInputBox().clear().type(`${value}{enter}`);
    });
    toDoList.getToDoTasks().should("have.length", 5);
    toDoList.getSearchInputBox().type(arr[0]);
    toDoList.getToDoTasks().should("have.length", 1);
  });

  it("Test Case 05 - Task Validation and Error Handling", () => {
    /*
    Navigate to https://techglobal-training.com/frontend/project-6
    Attempt to add an empty task to the to-do list.
    Validate that the task list is empty, displaying the message “No task found!”.
    Enter an item name exceeding 30 characters into the list.
    Validate error message appears and says “Error: Todo cannot be more than 30 characters!”.
    Add a valid item name to the list.
    Validate that the active task count is exactly one.
    Try to enter an item with the same name already present on the list.
    Validate that an error message is displayed, indicating “Error: You already have {ITEM} in your todo list.”.
    */
    toDoList.getAddButton().click();
    toDoList.getToDoTasks().should("have.text", "No tasks found!");
    toDoList.getNewToDoInputBox().type("123456789123456789123456789123456789123456788964321354 {enter}");
    toDoList.getErrorMsg().should("have.text", "Error: Todo cannot be more than 30 characters!");
    toDoList.getNewToDoInputBox().clear().type("Anything {enter}");
    toDoList.getToDoTasks().should("have.length", 1);
    toDoList.getNewToDoInputBox().clear().type("Anything {enter}");
    toDoList.getErrorMsg().should("have.text", "Error: You already have Anything in your todo list.");
  });
});