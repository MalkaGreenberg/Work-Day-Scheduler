
$(function () {
  // saves the user input to the local storage when they click 'save'.
  $(".saveBtn").on("click", function(){

    var taskTime = $(this).parent().attr('hour');
    console.log(taskTime);
    
    var tasks = JSON.parse(localStorage.getItem("taskList"))||[];
    var input = $(this).siblings('.description').val();
    
    tasks.push(
        {
            userInput: input.trim(),
            time: taskTime
        }
    )
    localStorage.setItem("taskList", JSON.stringify(tasks));

    for(var i = 0; i< tasks.length; i++){
      if(tasks[i].userInput  !== ""){
          var newTask = tasks[i].userInput;
          for (var a = 0; a < list.length ; a++ ){
            if (list[a].attr('hour')== tasks[i].time){
              console.log("there is a task for that time.")
              list[a].children('.description').text(newTask);
            }
          }
      }
    }
  });

  var list = [
    $("#hour-9"),
    $("#hour-10"),
    $("#hour-11"),
    $("#hour-12"),
    $("#hour-13"),
    $("#hour-14"),
    $("#hour-15"),
    $("#hour-16"),
    $("#hour-17")
  ];
  
  //sets the color of each box depending on if it is past present or future.
  for (var i = 0; i < list.length ; i++ ){
    var currentTime = dayjs().format('HH');
    var hour = list[i].attr('hour');
    console.log(hour);
    if (hour < currentTime){
      console.log("past");
      list[i].removeClass("future");
      list[i].removeClass("present");
      list[i].addClass("past");
    }else if(hour > currentTime){
      console.log("future");
      list[i].removeClass("past");
      list[i].removeClass("present");
      list[i].addClass("future");
    }else {
      console.log("currentHour");
      list[i].removeClass("future");
      list[i].removeClass("past");
      list[i].addClass("present");
    }
  }

  // puts the date on top of the page 
  var date = dayjs().format("dddd, MMMM D[th], h:mma");
  console.log(date);
  $("#currentDay").text(date);
  
  // load the data saved in local storage to the page when the page is refreshed. 
  var rendering = function(){ 
    var renderList = JSON.parse(localStorage.getItem("taskList"));
    console.log(renderList);
    for(var i = 0; i< renderList.length; i++){
      if(renderList[i].userInput  !== null){
          var newTask = renderList[i].userInput;
          for (var a = 0; a < list.length ; a++ ){
            if (list[a].attr('hour')== renderList[i].time){
              console.log("there is a task for that time.")
              list[a].children('.description').text(newTask);
            }
          }
      }
    }
  }
  rendering();
});
