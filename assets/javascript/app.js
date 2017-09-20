$("#senatorstuff").hide();

$("#abbreviation").on("click", function(event) {
	event.preventDefault();
    $("#senators-view").empty();
    $("#senator-pics").empty();
	var abbr = $("#state").val().trim();
   var checkstatement = false;

	$.ajax({
         url: "https://api.propublica.org/congress/v1/members/senate/"+ abbr +"/current.json",
         type: "GET",
         beforeSend: function(xhr){xhr.setRequestHeader('X-API-Key', 'pOeVTMP0uUXsG3Gn6uAQ9AT2claobUTPM0Wse53Q');},
         success: function(response){  
                  console.log(response);
            if (response.status === "ERROR")
            {
               $("#senators-view").html("Please select a correct abbreviation")
            }
            for (var i = 0; i < response.results.length; i++){
               var otherurl = "https://api.gettyimages.com/v3/search/images?phrase=" + response.results[i].name;

               var specialbutton = $("<button>");

               specialbutton.addClass("senators waves-effect grey darken-5 btn");
               specialbutton.attr("data-api", response.results[i].api_uri);
               specialbutton.attr("data-nextterm", response.results[i].next_election);
               specialbutton.attr("data-party", response.results[i].party);

               specialbutton.text(response.results[i].name);

                   $.ajax({
                  url: otherurl,
                  type: "GET", 
                  headers: { 'api-key':'y2ahk5a6eqaj6gygccakm6hg' },
                  customButton: specialbutton,
                  success: function(response){
                  var senatorImage = $("<img>");
                  senatorImage.attr("id", "senatorImage")
                  senatorImage.attr("src", response.images[0].display_sizes[0].uri);
                  $("#senator-pics").append(senatorImage);
                  $("#senators-view").append(this.customButton);
                  }
                  });
            }
         }
      });
});

function displaySenatorInfo(){
   var url = $(this).attr("data-api");
   var nextTerm = $(this).attr("data-nextterm")
   var party = $(this).attr("data-party")


   console.log(nextTerm);
   $("#displayelection").html("Next Election: " + nextTerm);
   $("#displayparty").html("Party: " + party);

   $("#senatorstuff").show();
   $.ajax({
         url: url,
         type: "GET",
         beforeSend: function(xhr){xhr.setRequestHeader('X-API-Key', 'pOeVTMP0uUXsG3Gn6uAQ9AT2claobUTPM0Wse53Q');},
         success: function(response){


            console.log(response);
            $("#website").attr("href", response.results[0].url);
            $("#contact").attr("href", response.results[0].roles[0].contact_form);
            $("#youtube").attr("href", "http://youtube.com/" + response.results[0].youtube_account);
            $("#recentnews").attr("href", response.results[0].times_topics_url);   

            $("#displaybirthdate").html("Birthdate: " + response.results[0].date_of_birth);
            $("#mostRecentVote").html("Most recent vote: " + response.results[0].most_recent_vote);
            $("#billsCorosponded").html("Bill corosponsed: " + response.results[0].roles[0].bills_cosponsored);
            $("#billsSponsered").html("Bill sponsered: " + response.results[0].roles[0].bills_sponsored);
            $("#phoneNumber").html("Phone: " + response.results[0].roles[0].phone);
            $("#officeAddress").html("Office: " + response.results[0].roles[0].office);



         }
   });

}
$(document).on("click", ".senators", displaySenatorInfo);
