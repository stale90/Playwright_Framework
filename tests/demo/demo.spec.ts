import { test, expect } from '@playwright/test'


test('My First Test' , async ({page}) => {

  console.log("Test1 Method Executeed");
  
});


test('My Second Test', async ({page}) => {

  console.log("Test2 Method Executed");  

});


test('My Third Test', async({page}) => {

  console.log('Test3 Method Executed');

});

test('My Fourth Test', async({page}) => {

  console.log('Test4 Method Executed');

});

test('My Five Test', async({page}) => {

  console.log('Test5 Method Executed');

});