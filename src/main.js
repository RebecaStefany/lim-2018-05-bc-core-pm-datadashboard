var loginButton = document.getElementById('login_button');
var studentsButton = document.getElementById('students_button');

var view1 = document.getElementById('view_1');
var view2 = document.getElementById('view_2');
var view3 = document.getElementById('view_3');

loginButton.addEventListener('click',function(){
  view1.style.display = "none";
  view2.style.display = "block";
  view3.style.display = "none";
});

studentsButton.addEventListener('click',function(){
  view1.style.display = "none";
  view2.style.display = "block";
  view3.style.display = "block";
});



/*
var filterButton = document.getElementById('filter_button')
var view1 = document.getElementById('view_1');
var view2 = document.getElementById('view_2');
var view3 = document.getElementById('view_3');
var header = document.getElementById('header_1')
var id = document.getElementById("cohorts_list");
var info1 = document.getElementById("info_1");








studentsButton.addEventListener('click',function(){
  view1.style.display = "none";
  view2.style.display = "none";
  header.style.display = "block";
  view3.style.display = "block";
  document.getElementById("cohorts_list").innerHTML = data.function1
})


filterButton.addEventListener('click',function(){
  view1.style.display = "none";
  view2.style.display = "none";
  header.style.display = "block";
  view3.style.display = "block";
  var request2 = new XMLHttpRequest();
    request2.open('GET', 'http://127.0.0.1:8080/data/cohorts/lim-2018-03-pre-core-pw/users.json');
    request2.onload = function() {
      var usersData = JSON.parse(request2.responseText);
      document.getElementById("users_list").innerHTML = data.function2(usersData)
    };
    request2.send();

})*/










