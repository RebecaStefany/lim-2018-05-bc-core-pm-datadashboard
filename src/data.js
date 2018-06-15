window.data = {
  function1: function (cohorts) {
    var htmlString = ''
    for (i = 0; i < cohorts.length; i++) {
      if(cohorts[i].id === "lim-2018-03-pre-core-pw") {
        htmlString += '<option value =' + i + '>' + cohorts[i].id + '.</option>';
      }
    }
  return htmlString;
  },
  function2: function (users) {
    var htmlString1 = '' 
    for (i = 0; i < users.length; i++) {
      htmlString1 += '<option value =' + i + '>' + users[i].name + '.</option>';
    }
   return htmlString1;    
  },


}



     