
var subjectArr = [];
var taskArr = [];
var count = 0;




// Get user input and add it to the corresponding list in the new event page
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



// Takes the list items and puts them into an array
$("#assign").on("click",function(){
    
   
  
    
    $("ul[class='peopleList'").find("li").each(function(){
    subjectArr.push(new subject($(this).text()));
    
    });
    
    $("ul[class='taskList'").find("li").each(function(){
    taskArr.push(new task($(this).text()));
    
    });
    
    
    assignTasks();
    // displayResults();
    let title = $("h1").text();
    
    $.ajax({
        type: "POST",
        url: "/events",
        data : { subjects: subjectArr, title: title},
        
       
    }).done(function(data){
        console.log(data);
        window.location.href = "/events/"+data;
    });

});


/* This was a function that displayed the list items when the website did not have 
     a backend where it could handle routes
*/
// function displayResults(){
    
//     $("#mainContainer").after("<div id ='results'></div>");
//     $("#mainContainer").css("display","none");
//     $("#reset").css("display","block");
    
   
    
//     subjectArr.forEach(function(subject){
//         let subjectName = subject.name.replace(/\s/g, '');
//         let subjectDiv = "<div class = 'subjects "+ subjectName + "'><h3>"+ subject.name + "</h3></div>";
//         $("#results").prepend(subjectDiv);
//         for(let i=0; i<subject.tasks.length; i++){
//             let currentDiv = ".subjects." + subjectName ;
//             $(currentDiv).append("<div class ='list-items'>"+ subject.tasks[i].value + "</div>");
//         }
//     });
// }

function assignTasks(){
    let terminatingFlag = taskArr.length;
    
    let randomNum;
    while(count<terminatingFlag){
        for(let i =0; i<subjectArr.length;i++){
            
            
            let taskSelected = false;
            while(!taskSelected && (count<terminatingFlag)){
              
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


// Random number generator
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