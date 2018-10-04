$(document).ready(function () {


    var teamList = [
        {
            name: "Arizona Cardinals",
            abbr: "ari",
        },
        {
            name: "Seattle Seahawks",
            abbr: "sea",
        },

        {
            name: "Los Angeles Rams",
            abbr: "lar",
        },

        {
            name: "San Francisco 49ers",
            abbr: "Saf",
        },

        {
            name: "Denver Broncos",
            abbr: "den",
        },

        {
            name: "Kansas City Chiefs",
            abbr: "kc",
        },

        {
            name: "Los Angeles Chargers",
            abbr: "lac",
        },

        {
            name: "Oakland Raiders",
            abbr: "oak",
        },

        {
            name: "Atlanta Falcons",
            abbr: "atl",
        },

        {
            name: "New Orleans Saints",
            abbr: "no",
        },

        {
            name: "Tampa Bay Buccaneers",
            abbr: "tb",
        },

        {
            name: "Houston Texans",
            abbr: "hou",
        },

        {
            name: "Indianapolis Colts",
            abbr: "ind",
        },

        {
            name: "Jacksonville Jaguars",
            abbr: "jax",
        },

        {
            name: "Tennessee Titans",
            abbr: "ten",
        },

        {
            name: "Chicago Bears",
            abbr: "chi",
        },

        {
            name: "Minnesota Vikings",
            abbr: "min",
        },

        {
            name: "Green Bay Packers",
            abbr: "gb",
        },

        {
            name: "Detroit Lions",
            abbr: "det",
        },

        {
            name: "Baltimore Ravens",
            abbr: "bal",
        },

        {
            name: "Cincinnati Bengals",
            abbr: "cin",
        },

        {
            name: "Cleveland Browns",
            abbr: "cle",
        },

        {
            name: "Pittsburgh Steelers",
            abbr: "pit",
        },

        {
            name: "Buffalo Bills",
            abbr: "buf",
        },

        {
            name: "New York Jets",
            abbr: "nyj",
        },

        {
            name: "New England Patriots",
            abbr: "ne",
        },

        {
            name: "Miami Dolphins",
            abbr: "mia",
        },

        {
            name: "Dallas Cowboys",
            abbr: "dal",
        },

        {
            name: "New York Giants",
            abbr: "nyg",
        },

        {
            name: "Philadelphia Eagles",
            abbr: "phi",
        },

        {
            name: "Washington Redskins",
            abbr: "was",
        },

        {
            name: "Carolina Panthers",
            abbr: "car",

        }];

    $dropdownContainer = $(".dropdown-menu")

    for (var i = 0; i < teamList.length; i++) {
        var dropDownLink = $("<div>")
        dropDownLink.addClass("dropLink");
        dropDownLink.attr("data-name", teamList[i].name);
        dropDownLink.attr("data-abr", teamList[i].abbr);
        $dropdownContainer.append(dropDownLink.text(teamList[i].name))
        //<a class="dropdown-item" href="#">Action</a>  what i'm making 
        // var newTeamLink = $("<a>");
        // newTeamLink
        // console.log(newTeamLink[0]);
        // $(".dropdown-item").append(newTeamLink) ;


    };




    //$(".dropLink").on("click", function(){


    $dropdownContainer.on("click", ".dropLink", function (event) {
        $("#event-table").empty();
        console.log($(this).attr("data-name"));
        console.log($(this).attr("data-abr"));



        var team = $(this).attr("data-name");

        

        var queryURL = "https://api.seatgeek.com/2/events?q=" + team + "&client_id=MTMzMzkzNDV8MTUzODAxNTg1MC43OA&client_secret=5dfdb6782fea77557fbde3d42ac129fffd58b1d8ad9752261c0646724aaa7cce";

        console.log(team);
        
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            console.log(response.events[0].short_title);

            for (var i = 0; i < 3; i++) {

                var teamsPlaying = $("<td>").text(response.events[i].short_title);
                var tickets = $("<td>").text("$" + response.events[i].stats.lowest_price);
                console.log(response.events[i].stats.lowest_price);
                var tableButton = $("<button>").text("Go!");
                tableButton.addClass("link-button");
                var ticketLink = $("<a href=" + response.events[i].url + ">");
                ticketLink.html(tableButton);
                //tableButton.append(ticketLink);
                console.log(response.events[i].url);

                //var linkTd = $("<td>").append(tableButton);
                var linkTd = $("<td>").append(ticketLink);
                var newRow = $("<tr>").append(teamsPlaying, tickets, linkTd)

                $("#event-table").append(newRow);

            }

            $(".card-1").text(team);
            $(".card-3").text("");
         console.log(team);   
        });


        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + team + "&api_key=TxAYO7DBs1rQn5cG173MESy9G7MtLztf&limit=3";

                console.log(team);
                //$(".card-img-top").empty();

                $.ajax({
                    url: queryURL,
                    method: "GET"
                }).then(function (response) {
                    console.log(response);

                    var results = response.data;

                    
                        
                        $(".giphy-1").attr("src", results[0].images.original.url);
                        $(".giphy-2").attr("src", results[1].images.original.url);
                        $(".giphy-3").attr("src", results[2].images.original.url);
                        

                    





                });
    
    
    
    
    
    
    });
});


