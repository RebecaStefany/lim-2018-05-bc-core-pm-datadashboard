function go(){
  if (document.form.password.value =='ADMIN' && document.form.login.value =='ADMIN'){ 
    document.form.submit(); 
} 
else{ 
     alert("Porfavor ingrese, nombre de usuario y contraseña correctos."); 
    }
}
var btnStudents = document.getElementById('btnStudents');
var contentglobal = document.getElementById('contentglobal');
btnStudents.addEventListener('click', function(){
  contentglobal.style.display = "block";
  contentsedes.style.display = "none";
});

var btnSedes = document.getElementById('btnSedes');
var contentsedes = document.getElementById('contentsedes');
btnSedes.addEventListener('click', function(){
  contentsedes.style.display = "block";
  contentglobal.style.display = "none";
});




var users = [];
var progress = [];
var courses = [];
var cohorts = '';

//SEDES en Lista para que el Usuario seleccione
//changeSede();
function changeSede(){
  fetch('https://api.laboratoria.la/cohorts')
  .then((response) => {return response.json();})
  .then((cohorts) => {
    let selectSede = document.getElementById('seleccionaSede');
    let sedeName = selectSede.options[selectSede.selectedIndex].value;
    cohortsByCampus = [];
    cohorts.forEach(function(element){
      if((element.id).indexOf(sedeName) !==-1) {
        cohortsByCampus.push(element);
      }
    });
//COHORTS de acuerdo a la SEDE que selecciones    
    document.getElementById("cohortsOptions").innerHTML = "";
    cohortsByCampus.forEach(function(element){
      let nameOfCohort = document.createElement('option');
      nameOfCohort.innerText = element.id;
      cohortsOptions.appendChild(nameOfCohort);
    })
    onChangeCohort();
  });
}

function onChangeCohort(){
  let cohorts = document.getElementById('cohortsOptions').value;
  let resultado = document.getElementById('resultado');
  console.log(cohorts);
  getUsers(cohorts);
}

function searchGlobal(){
  let order = document.getElementById('order').value;
  let ascdesc = document.getElementById('ascdesc').value;
  let texto = document.getElementById('texto').value;
  
  if(users.length > 0) {
    let options = {
      cohort: cohorts,
      cohortData: {
        users: users.filter(usersWithNewStats => usersWithNewStats.role == 'student'),      
        progress : progress,
        courses : courses,
      },
      orderBy: order,
      orderDirection: ascdesc,
      search: texto
    };
    console.log(sortUsers);
    let data = processCohortData(options);
    let elem = "";
    data.forEach(function(element){
      elem += '<div class="col-md-4">';
      elem += '<div class="panel body-info">';
      elem += '<p>' + element.role + '   ' + element.name.toUpperCase() + ' </p>';
      elem += '<p> PERCENT:  '+ element.stats.percent + '</p></div>';
      elem += '<div class="panel body-info">EXERCISES';
      elem += '<p> Total:     ' + element.stats.exercises.total + '</p>';
      elem += '<p> Completado:' + element.stats.exercises.completed + '</p>';
      elem += '<p> Percent:   ' + element.stats.exercises.percent + '</p></div>';
      elem += '<div class="panel body-info">READS';
      elem += '<p> Total: ' + element.stats.reads.total + ' </p>';
      elem += '<p> Completed: ' + element.stats.reads.completed + ' </p>';
      elem += '<p> Percent: ' + element.stats.reads.percent + ' </p></div>';
      elem += '<div class="panel body-info">QUIZZES';
      elem += '<p> Total: ' + element.stats.quizzes.total + ' </p>';
      elem += '<p> Completed: ' + element.stats.quizzes.completed + ' </p>';
      elem += '<p> Percent: ' + element.stats.quizzes.percent + ' </p>';
      elem += '<p> ScoreSum: ' + element.stats.quizzes.scoreSum + ' </p>';
      elem += '<p> ScoreAvg: ' + element.stats.quizzes.scoreAvg + ' </p></div>';
      elem += '</div>';
    });
    const content = resultado.innerHTML;
    resultado.innerHTML = elem;
  }
}

function getUsers(cohorts){
  fetch('https://api.laboratoria.la/cohorts/'+ cohorts +'/users')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      users =  data;
      console.log(users);
      getProgress(cohorts);
    });
}

function getProgress(cohorts){
  fetch('https://api.laboratoria.la/cohorts/'+ cohorts +'/progress')
    .then((response) => {
      return response.json();
    })
    .then((data) => { 
      progress =  data;
      getCourses(cohorts);
    });
}

function getCourses(cohorts){

  fetch('https://api.laboratoria.la/cohorts/'+ cohorts +'/courses')
    .then((response) => {
      return response.json();
    })
    .then((data) => { 
        courses =  data;
        searchGlobal();
      }
  );
}

