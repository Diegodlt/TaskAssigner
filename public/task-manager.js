



$("input[type='text']").keypress(function(event){
    

    if(event.which == 13){
        
        let selectedList = "ul[class = \'" + $(this).attr("class") + "\']";
        let listItem = $(this).val();
        $(this).val("");
        
         $(selectedList).prepend("<li>"+ listItem+ "</li>");
    }
});
