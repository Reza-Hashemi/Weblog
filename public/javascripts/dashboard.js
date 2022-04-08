$(document).ready(function () {
   $("#signin").click(function (e) { 
       e.preventDefault();
       $.get("/signin", 
           function (data, textStatus, jqXHR) {
               
           },
           "dataType"
       );
   });
});