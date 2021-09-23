const main = document.getElementById('main');
const adduserEl = document.getElementById('add-user');
const doubleEl = document.getElementById('double-balance');
const showMillionairesEl = document.getElementById('show-millionaires');
const sortRichestEl = document.getElementById('sort-richest');
const calculateWealthEL = document.getElementById('calculate-wealth');

// store the name and money in this array 
let data = [];

// intial added user 
getRandomUser();
getRandomUser();
getRandomUser();


async function getRandomUser (){
  const res =  await fetch('https://randomuser.me/api');
  const data = await res.json();

  const user = await data.results[0];
  const newUser = {
    name : `${user.name.first}  ${user.name.last}`,
    money : Math.trunc(Math.random() * 10000000) 
  } 
  
  addToData(newUser);
}

// add the userdata to data array
function addToData (obj){
  data.push(obj);
  updateUI();
  console.log(data);
}

// updateUI function to show changes in UI 
function updateUI (providedData = data){
  // clear the div 
  main.innerHTML = '<h2><strong>Person</strong>Wealth</h2>';

  providedData.forEach(user => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${user.name}</strong> ${formatMoney(user.money)}`;
    main.appendChild(element);
  });

}

// format the normal number into insain rupees format 
function formatMoney (number){
  return '₹' + number.toFixed(2).replace(/^(\d{1,2})(,\d{2})*(,\d{1,3}){1}(\.\d{1,})?$/g);
}

// double the money
function double(){
  data = data.map(data =>{
    return {...data , money: data.money * 2};
  });
  updateUI();
}

// fliter the Millionaires
function showMillionaires(){
  data = data.filter(data => data.money > 1000000);
  updateUI();
}
//sort by richest
function sortByRichest(){
  data.sort((a , b) => b.money - a.money);
  updateUI();
}

// to add all user money/ wealth 
function totalWealth() {
  const wealth = data.reduce((accu , data) => (accu+= data.money), 0);

  const wealthEl = document.createElement('div');
  wealthEl.innerHTML = `<h3>Total Amount :<strong>${formatMoney(wealth)}</strong></h3>`
  main.appendChild(wealthEl);

}

// eventListerners

adduserEl.addEventListener('click', getRandomUser);
doubleEl.addEventListener('click', double);
sortRichestEl.addEventListener('click', sortByRichest);
showMillionairesEl.addEventListener('click' ,showMillionaires);
calculateWealthEL.addEventListener('click', totalWealth);