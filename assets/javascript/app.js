$("#abbreviation").on("click", function(event) {
	event.preventDefault();
    $("#senators-view").empty();
	var abbr = $("#state").val().trim();

	$.ajax({
         url: "https://api.propublica.org/congress/v1/members/senate/"+ abbr +"/current.json",
         type: "GET",
         beforeSend: function(xhr){xhr.setRequestHeader('X-API-Key', 'pOeVTMP0uUXsG3Gn6uAQ9AT2claobUTPM0Wse53Q');},
         success: function(response){
            console.log(response);
            console.log()
            for (var i = 0; i < response.results.length; i++){
               var specialbutton = $("<button>");
               specialbutton.addClass("senators");

               specialbutton.attr("data-name", response.results[i].name);
               specialbutton.attr("data-api", response.results[i].api_uri);

               specialbutton.text(response.results[i].name);

               $("#senators-view").append(specialbutton);
            }
         }
      });
});

function displaySenatorInfo(){
   var url = $(this).attr("data-api");
   var name = $(this).attr("data-name");
   $.ajax({
         url: url,
         type: "GET",
         beforeSend: function(xhr){xhr.setRequestHeader('X-API-Key', 'pOeVTMP0uUXsG3Gn6uAQ9AT2claobUTPM0Wse53Q');},
         success: function(response){
            console.log(response);
            console.log(response.results[0].url);
            console.log(response.results[0].twitter_account);
            console.log(response.results[0].times_topics_url);


         }
   });
   var otherurl = "https://api.gettyimages.com/v3/search/images?phrase=" + name;
    $.ajax({
         url: otherurl,
         type: "GET", 
         headers: { 'api-key':'y2ahk5a6eqaj6gygccakm6hg' },
         success: function(response){
           console.log(response);

         }
   });

}
console.log("Hello");
$(document).on("click", ".senators", displaySenatorInfo);
