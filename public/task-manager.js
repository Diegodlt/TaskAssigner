
var subjectArr = [];
var taskArr = [];
var count = 0;
//Function to get text from li



// Get user input and add it to the corresponding list
$("input[type='text']").keypress(function(event){
    
 
    if($(this).val() != ""){

        if(event.which == 13){
            
            let selectedList = "ul[class = \'" + $(this).attr("class") + "\']";
            let listItem = $(this).val();
            $(this).val("");
            
             $(selectedList).prepend("<li>"+ listItem+ "<span class = 'delete'><i class='fas fa-times'></span></i>");
            
             $(".delete").on("click", function(){
                 $(this).parent().remove();
             });
            
        }
    }
});

$(".delete").on("click",function(){
    console.log("Hello");
    $(this).css("background-color","blue");
});



// Resets the list to it's original form, before the task were randomly assigned
$("#reset").on("click",function(){
    
    $("#mainContainer").css("display","block");
    $("#reset").css("display","none");
    $("#results").remove();
     //Reset arrays
    subjectArr = [];
    taskArr =[];
    count = 0;
    
})

// Takes the list items and puts them into an array
$("#assign").on("click",function(){
    
    
  
    
    $("ul[class='peopleList'").find("li").each(function(){
    subjectArr.push(new subject($(this).text()));
    
    });
    
    $("ul[class='taskList'").find("li").each(function(){
    taskArr.push(new task($(this).text()));
    
    });
    
    assignTasks();
    displayResults();
    
});



function displayResults(){
    
    $("#mainContainer").after("<div id ='results'></div>");
    $("#mainContainer").css("display","none");
    $("#reset").css("display","block");
    
   
    
    subjectArr.forEach(function(subject){
        let subjectName = subject.name.replace(/\s/g, '');
        let subjectDiv = "<div class = 'subjects "+ subjectName + "'><h3>"+ subject.name + "</h3></div>";
        $("#results").prepend(subjectDiv);
        for(let i=0; i<subject.tasks.length; i++){
            let currentDiv = ".subjects." + subjectName ;
            $(currentDiv).append("<div class ='list-items'>"+ subject.tasks[i].value + "</div>");
        }
    });
}

function assignTasks(){
    let terminatingFlag = taskArr.length;
    
    let randomNum;
    while(count<terminatingFlag){
        for(let i =0; i<subjectArr.length;i++){
            
            
            let taskSelected = false;
            while(!taskSelected && (count<terminatingFlag)){
                console.log("while"); 
                randomNum = rng(taskArr.length);
              
                if(!taskArr[randomNum].hasBeenSelected){
                    subjectArr[i].tasks.push(taskArr[randomNum]);
                    taskArr[randomNum].hasBeenSelected = true;
                    taskSelected = true;
                    count++;
                    
                }
            }
        }
        
    }
}



function rng(number){
    return Math.floor((Math.random()*number))
}


// Task class
function task(data){
    this.value= data;
    this.hasBeenSelected= false;
}

// Subject class
function subject(name){
    this.name = name;
    this.tasks =[];
}