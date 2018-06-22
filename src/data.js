/*window.data = {
  computeUsersStasts: () => {
    
  },
  sortUsers: () => {

  },
  filterUsers: () => {

  },
  processCohortData: () => {
    
  } 
}*/


url1 = 'http://127.0.0.1:8080/data/cohorts.json'
url2 = 'http://127.0.0.1:8080/data/cohorts/lim-2018-03-pre-core-pw/progress.json'
url3 = 'http://127.0.0.1:8080/data/cohorts/lim-2018-03-pre-core-pw/users.json'

let selectCohorts = document.getElementById('select_cohorts');
let filterButton = document.getElementById('filter_button');
let usersList = document.getElementById('users_list');
//let usersButton = document.getElementById('users_button')

fetch(url1)
 .then((response) => {
   return response.json();
 })
 .then((cohorts) => {
   let paintCohorts = '';
   for (i = 0; i < cohorts.length; i++) {
     paintCohorts += '<option value="' + i + '">' + cohorts[i].id + '</option>';
   }
   selectCohorts.innerHTML = paintCohorts;
 })

filterButton.addEventListener("click", function () {
  let value = selectCohorts.options[selectCohorts.selectedIndex].text
  if(value === 'lim-2018-03-pre-core-pw') { 
    fetch(url3)
    .then((response) => {
      return response.json();
    })
    .then((users) => {
      const filterRoles = users.filter(user => (user.role === "student"));
      let paintUsers = '';
      for (i = 0; i < filterRoles.length; i++) {
        let roleStudents = filterRoles.map (filterRole => `${filterRole.name}`);
        paintUsers += '<div>' + roleStudents[i] + '</div>';
      }
    usersList.innerHTML = paintUsers
    })   
  } else {
  console.log("No hay data")}
}) 




/*const button = document.createElement("button");

const content = document.createTextNode("Ver");

button.appendChild(content);

document.body.appendChild(button);*/

