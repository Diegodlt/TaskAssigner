
var subjectArr = [];
var taskArr = [];
var count = 0;
//Function to get text from li



$("input[type='text']").keypress(function(event){
    

    if(event.which == 13){
        
        let selectedList = "ul[class = \'" + $(this).attr("class") + "\']";
        let listItem = $(this).val();
        $(this).val("");
        
         $(selectedList).prepend("<li>"+ listItem+ "</li>");
    }
});

$("#reset").on("click",function(){
    
    $("#mainContainer").css("display","block");
    $("#reset").css("display","none");
    $("#results").remove();
    
})


$("#assign").on("click",function(){
    
    
    //Reset arrays
    subjectArr = [];
    taskArr =[];
    
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
        $("#results").append("<div class = 'subjects'>"+ subject.name + "</div>");
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

function task(data){
    this.value= data;
    this.hasBeenSelected= false;
}


function subject(name){
    this.name = name;
    this.tasks =[];
}