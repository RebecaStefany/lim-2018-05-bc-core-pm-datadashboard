//json
const url1 = 'http://127.0.0.1:8080/data/cohorts.json'
const url2 =  'http://127.0.0.1:8080/data/cohorts/lim-2018-03-pre-core-pw/users.json'
const url3 = 'http://127.0.0.1:8080/data/cohorts/lim-2018-03-pre-core-pw/progress.json'

let selectCohorts = document.getElementById('select_cohorts');
let filterButton = document.getElementById('filter_button');
let usersList = document.getElementById('users_list');
//let usersButton = document.getElementById('users_button')

//Pintando cohorts
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


 //Pintando Nombres y Porcentajes
filterButton.addEventListener("click", function () {
  let value = selectCohorts.options[selectCohorts.selectedIndex].text
  if(value === 'lim-2018-03-pre-core-pw') { 
    fetch(url2)
    .then((response) => {
      return response.json();
    })
    .then((users) => {
      let paintTable = ''
      paintTable += '<tr>';
      paintTable += '<th>Name</th>';
      paintTable += '<th>%Exercises</th>';
      paintTable += '<th>%Reads</th>';
      paintTable += '<th>%Quizzes</th>';
      paintTable += '</tr>';
      paintTable += '<tr>';
      const filterRoles = users.filter(user => (user.role === "student"));
        for (i = 0; i < filterRoles.length; i++) {
          let roleStudents = filterRoles.map (filterRole => `${filterRole.name}`);
          paintTable += '<td>' + roleStudents[i] + '</td>';
          paintTable += '</tr>';
        }
      fetch(url3)
      .then((response) => {
        return response.json();
      })
      .then((progress) => {
        for (i = 0; i < filterRoles.length; i++){
          if (progress.hasOwnProperty(filterRoles[i].id)){
          console.log(progress[filterRoles[i].id].intro)
        
        }}

        
        
      })

        //paintTable += '<td>' + exercises[i] + '</td>';
        
    usersList.innerHTML = paintTable
    })   
  } else {
  console.log("No hay data")}
}) 


  
