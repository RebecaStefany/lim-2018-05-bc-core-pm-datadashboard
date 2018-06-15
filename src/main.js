var enterButton = document.getElementById('enter_button');
var view1 = document.getElementById('view_1');
var view2 = document.getElementById('view_2');
var header = document.getElementById('header_1')
var id = document.getElementById("cohorts_list");

enterButton.addEventListener('click',function(){
  view1.style.display = "none";
  view2.style.display = "block";
  header.style.display = "block";

  var request1 = new XMLHttpRequest();
    request1.open('GET', 'http://127.0.0.1:8080/data/cohorts.json');
    request1.onload = function() {
      var cohortsData = JSON.parse(request1.responseText);
      document.getElementById("cohorts_list").innerHTML = data.function1(cohortsData)
    };
    request1.send();

  var request2 = new XMLHttpRequest();
    request2.open('GET', 'http://127.0.0.1:8080/data/cohorts/lim-2018-03-pre-core-pw/users.json');
    request2.onload = function() {
      var usersData = JSON.parse(request2.responseText);
      document.getElementById("users_list").innerHTML = data.function2(usersData)
    };
    request2.send();
});




