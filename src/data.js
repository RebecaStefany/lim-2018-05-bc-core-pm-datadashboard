//FUNCTION 1 computeUserStats(users, progress, courses)
window.computeUsersStats = (users, progress, courses) => {
  let usersWithStats = users.map((user) => {
      courses = progress[user.id]
      if (courses.hasOwnProperty('intro')) {
        let intro = courses.intro;
        let exerciseTotal = 0;
        let exercisesCompleted = 0;
        let readsTotal = 0;
        let readsCompleted = 0;
        let quizzesTotal = 0;
        let quizzesCompleted = 0;
        let quizzesScoreSum = 0;
        Object.values(intro.units).forEach(unit => {
          Object.values(unit.parts).forEach(part => {

            if (part.hasOwnProperty('exercises')) {
              Object.values(part.exercises).forEach(exercise => {
                exerciseTotal += 1;
                if (part.completed == 1) {
                  exercisesCompleted ++;
                }
                exercisesPercent = Math.round((exercisesCompleted / exerciseTotal) * 100);
              })
            } else if (part.type === 'read') {
              readsTotal += 1;
              if (part.completed == 1) {
                readsCompleted ++;
              }
                readsPercent = Math.round((readsCompleted / readsTotal) * 100);

            } else if (part.type === 'quiz') {
              quizzesTotal += 1;
              if (part.completed == 1) {
                quizzesCompleted ++;
                quizzesScoreSum += part.score;
              }
              quizzesPercent = Math.round((quizzesCompleted / quizzesTotal) * 100);
              scoreAVG = Math.round(quizzesScoreSum / quizzesCompleted);
            }
          });
        });

        let stats = {
          percent: courses.intro.percent,
          exercises: {
            total: exerciseTotal,
            completed: exercisesCompleted,
            percent: exercisesPercent
          },
          reads: {
            total: readsTotal,
            completed: readsCompleted,
            percent: readsPercent
          },
          quizzes: {
            total: quizzesTotal,
            completed: quizzesCompleted,
            percent: quizzesPercent,
            scoreSum: quizzesScoreSum,
            scoreAvg: scoreAVG
          }
        };
        user.stats = stats;
        return user;
      } else {
        let stats = {
          percent: 0,
          exercises: {
            total: 0,
            completed: 0,
            percent: 0
          },
          reads: {
            total: 0,
            completed: 0,
            percent: 0
          },
          quizzes: {
            total: 0,
            completed: 0,
            percent: 0,
            scoreSum: 0,
            scoreAvg: 0
          }
        }
        user.stats = stats;
        return user;
      }

    }
  );
  return usersWithStats;
}


//FUNCTION 2 SortUsers(users, orderBy, orderDirection)
window.sortUsers = (users, orderBy, orderDirection) => {
  //Ordenando por name
  if (orderBy === "name") {
    return users.sort((a,b) => {
      if (orderDirection == "ASC") {
        return a.name.localeCompare(b.name);
      } if (orderDirection == "DESC") {
        return a.name.localeCompare(b.name)* -1;
      } else {
        return users;
      }
    });
  }
  //Ordenando por Percent
  if(orderBy === "percent"){
    return users.sort((a,b) => {
      if(orderDirection == "ASC"){
        return a.stats.percent - b.stats.percent;
      }else{
        return (a.stats.percent - b.stats.percent)*-1;
      }
    });
  } 

  if(orderBy === "exercisesPercent"){
    return users.sort((a,b)=>{
      if(orderDirection == "ASC"){
        return a.stats.exercises.percent - b.stats.exercises.percent;
      }else{
        return (a.stats.exercises.percent - b.stats.exercises.percent)*-1;
      }
    });
  }

  if(orderBy === "readsPercent"){
    return users.sort((a,b)=>{
      if(orderDirection == "ASC"){
        return a.stats.reads.percent - b.stats.reads.percent;
      }else{
        return (a.stats.reads.percent - b.stats.reads.percent)*-1;
      }
    });
  }

  if(orderBy === "quizzesPercent"){
    return users.sort((a,b)=>{
      if(orderDirection == "ASC"){
        return a.stats.quizzes.percent - b.stats.quizzes.percent;
      }else{
        return (a.stats.quizzes.percent - b.stats.quizzes.percent)*-1;
      }
    });
  }

  if(orderBy === "scoreAVG"){
    return users.sort((a,b)=>{
      if(orderDirection == "ASC"){
        return a.stats.quizzes.scoreAvg - b.stats.quizzes.scoreAvg;
      }else{
        return (a.stats.quizzes.scoreAvg - b.stats.quizzes.scoreAvg)*-1;
      }
    });
  }
}

//FUNCTION 3 FilterUser(user, search)
window.filterUsers = (users, search) => {
    if(users){
      search = search.toLowerCase();
      return users.filter(users => users && users.name && users.name.toLowerCase().indexOf(search)>= 0);
    };
}
  
//FUNCTION 4 ProcessCohortData(options)
window.processCohortData = (options)  => {
  let computedData  = computeUsersStats(options.cohortData.users, options.cohortData.progress, options.cohortData.courses);
  let filteredData = filterUsers(computedData, options.search);
  let sortedData = sortUsers(filteredData, options.orderBy, options.orderDirection);
  //let sortedData   = sortUsers(computeData, options.orderBy, options.orderDirection);
  //let filteredData = filterUsers(sortedData, options.search);
  return sortedData;
}


