var object;
$.ajax({
         url: "https://api.propublica.org/congress/v1/members/senate/ny/current.json",
         type: "GET",
         beforeSend: function(xhr){xhr.setRequestHeader('X-API-Key', 'pOeVTMP0uUXsG3Gn6uAQ9AT2claobUTPM0Wse53Q');},
         success: function(response){
             console.log(response);
             $(".twitter-timeline").text(response.results[0].twitter_id);
             object = response;
         }
      });

$(".twitter-timeline").on("click",function() {
        for (var i = 0; i <object.results.length; i++) {
        var url = "https://twitter.com/" + object.results[i].twitter_id
        var nlink = $("<a target='_blank'>")
        nlink.attr("href", url)
        nlink.text("tweets")
        $("#div").append(nlink)
        }
        console.log(url)
    })
