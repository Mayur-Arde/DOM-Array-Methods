const main = document.getElementById('main');
const adduserEl = document.getElementById('add-user');
const doubleEl = document.getElementById('double-balance');
const showMillionaires = document.getElementById('show-millionaires');
const sortRichest = document.getElementById('sort-richest');
const calculateWealth = document.getElementById('calculate-wealth');

let data = [];

getRandomUser();

async function getRandomUser (){
  const res =  await fetch('https://randomuser.me/api');
  const data = await res.json();

  const user = await data.results[0];
  const newUser = {
    name : `${user.name.first}  ${user.name.last}`,
    money : Math.trunc(Math.random() * 1000000) 
  } 
  console.log(newUser);
}