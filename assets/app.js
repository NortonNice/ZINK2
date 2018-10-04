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
      name: "Kansas City Cheifs",
      abbr: "kc",
    },

    {
      name: "Los Angelse Chargers",
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
      name: "Tenessee Titans",
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
      name: "Baltmiore Ravens",
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
      name: "Buffalo Bils",
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
  }
  $dropdownContainer.on("click", ".dropLink", function (event) {
    console.log($(this).attr("data-name"));
    console.log($(this).attr("data-abr"));


    //console.log(teamList[1].name);

    // $(document).on("load", function () {


    //   $("#main").empty();
    //   e.preventDefault();

    // "https://api.mysportsfeeds.com/v1.0/pull/nfl/{season-name}/cumulative_player_stats.{format}"

    //var sportsUrl = "https://api.mysportsfeeds.com/v1.0/pull/nfl/current_season.json?fordate=20180929";
    //var sportsUrl = "https://api.mysportsfeeds.com/v1.0/pull/nfl/2018-regular/latest_updates.json";
    var teamAbr = $(this).attr("data-abr");
    var teamNameSearch = $(this).attr("data-name");
    $("#teamSelect").text(teamNameSearch);
    var sportsUrl = `https://api.mysportsfeeds.com/v1.0/pull/nfl/2018-regular/team_gamelogs.json?team=${teamAbr}`;//?limit=1";
    var apikey_token = "7ce560d5-0445-42eb-907b-f6575c";
    var password = "zink123";
    apiCall(sportsUrl, apikey_token, password)
    //  curl -X "GET" https://api.mysportsfeeds.com/v1.0/pull/nfl/2018-regular/cumulative_player_stats.json
    //-u 7ce560d5-0445-42eb-907b-f6575c:zink
    //--compress

    // API call
  })
  function apiCall(sportsUrl, apikey_token, password) {
    console.log("call was fired")
    return $.ajax({
      type: "GET",
      url: sportsUrl,
      //      dataType: 'json',
      //     async: false,
      headers: {
        "Authorization": "Basic " + btoa(apikey_token + ":" + password)

      }

    })

      //create vars for different data we want to input into the div
      .then(function (res) {
        //console.log(res.currentseason.season[0].details.name);
        //console.log(res);
        // console.log(res.latestupdates.feedentry[21].forDate[9]);//.details.name);


        //ALL THE VARS FOR APPENDING
        //always brings in the last game
        var week = (res.teamgamelogs.gamelogs.pop());
        console.log(week);

        //var for last game date
        var lastGameDate = (week.game.date);
        console.log(lastGameDate);

        //$("#selectTeam").text(teamNameSearch);

        $("#lastGameDate").text(lastGameDate);

        var lastGameLoc = (week.game.location);
        console.log(lastGameLoc);

        $("#main").append(" " + lastGameLoc);

        var aTeamCity = (week.game.awayTeam.City);
        console.log(aTeamCity);

        $("#main").append(" " + aTeamCity);
        var aTeamName = (week.game.awayTeam.Name);
        console.log(aTeamName);

        $("#main").append(" " + aTeamName);

        var hTeamCity = (week.game.homeTeam.City);
        console.log(hTeamCity);

        $("#main").append(" " + " @ " + hTeamCity);


        var hTeamName = (week.game.homeTeam.Name);
        console.log(hTeamName);

        $("#main").append(" " + hTeamName);

        //full name with city plus name
        var aLongName = (aTeamCity + " " + aTeamName);
        var hLongName = (hTeamCity + " " + hTeamName);

        console.log(aLongName);
        console.log(hLongName);

        var ptsFor = (week.stats.PointsFor["#text"]);
        console.log("**** ptsFor: ", ptsFor);

        $("#hScore").text(ptsFor);

        var ptsAg = (week.stats.PointsAgainst["#text"]);
        console.log(ptsAg);

        $("#aScore").text(ptsAg);

        var gameDetails = (aLongName + " @ " + hLongName);
        console.log(gameDetails);

        $("#gameDetails").text(gameDetails);

        var wins = (week.stats.Wins);
        console.log(wins);
        //var seasonName = res.currentseason.season[0].details.name;
        //console.log(seasonName); 

        var teamStats = res.currentseason.season[0].supportedTeamStats//.teamStat[159]//.name[0];
        console.log(teamStats);


        var seasonName = res.currentseason.season[0].details.name;
        console.log(seasonName);


        var seasonName = res.currentseason.season[0].details.name;
        console.log(seasonName);


        var searchTerm = teamNameSearch;
        console.log("******* TEAM NAME", teamNameSearch);
        var userSearch = teamNameSearch;
        var key = "&api_key=xn5Vzcz6J67ylLvaToFPaqTDwth1efjV";
        var limit = "&limit=1";
        var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + userSearch + limit + key;
        console.log(queryUrl);



      }).catch(function (err) {
        console.log(err, "error")
      })

  }


  apiCall()


  $dropdownContainer.on("click", ".dropLink", function (event) {
    console.log($(this).attr("data-name"));
    console.log($(this).attr("data-abr"));

    var teamAbr = $(this).attr("data-abr");
    var teamNameSearch = $(this).attr("data-name");
    var sportsUrl = `https://api.mysportsfeeds.com/v1.0/pull/nfl/2018-regular/team_gamelogs.json?team=${teamAbr}`;//?limit=1";
    var apikey_token = "7ce560d5-0445-42eb-907b-f6575c";
    var password = "zink123";
    apiCall(sportsUrl, apikey_token, password)
   
   
    // OLD CODE: curl -X "GET" https://api.mysportsfeeds.com/v1.0/pull/nfl/2018-regular/cumulative_player_stats.json
    //-u 7ce560d5-0445-42eb-907b-f6575c:zink
    //--compress

    // API call
  //console.log(teamList[1].name);

    // $(document).on("load", function () {


    //   $("#main").empty();
    //   e.preventDefault();

    // "https://api.mysportsfeeds.com/v1.0/pull/nfl/{season-name}/cumulative_player_stats.{format}"

    //var sportsUrl = "https://api.mysportsfeeds.com/v1.0/pull/nfl/current_season.json?fordate=20180929";
    //var sportsUrl = "https://api.mysportsfeeds.com/v1.0/pull/nfl/2018-regular/latest_updates.json";

    var searchTerm = teamNameSearch;
    console.log("******* TEAM NAME", teamNameSearch);
    var userSearch = teamNameSearch;
    var key = "&api_key=xn5Vzcz6J67ylLvaToFPaqTDwth1efjV";
    var limit = "&limit=1";
    var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + userSearch + limit + key;
    console.log(queryUrl);

    console.log(teamAbr);
    console.log("****IS THIS WORKING???****", teamNameSearch);
  })

  $.ajax({
    url: queryUrl,
    method: "GET"
  }).then(function (response) {
    console.log(response);

    apiCall(sportsUrl, apikey_token, password)

    //this is where the gifs go
    for (var i = 0; i < response.data.length; i++) {

      console.log("****** GIF RESPONSE:", response);
      //watched youtube tutorial for response.data[i]
      var gifOutput = $("<div>");
      gifOutput.addClass("gifOutput");
      var activeGif = response.data[i].images["fixed_height"].url;
      var stillGif = response.data[i].images["fixed_height_still"].url;

      //can't figure how to use rating in app per se, below mirrored from in-class movie assignment
      var rating = response.data[i].rating;
      console.log(rating);
      var newGif = $("<img>");
      gifOutput.append(newGif);
      newGif.attr("src", activeGif);
      newGif.attr("data-animate", activeGif);
      newGif.attr("data-still", stillGif);
      newGif.attr("data-state", "still");
      newGif.addClass("gif");
      $("#stillGif").append(newGif);

      $("#stillGif").append(stillGif);
      $("#gifCont").append(gifOutput);

      console.log(stillGif);





    }
    console.log(teamAbr);
    console.log("****IS THIS WORKING???****", teamNameSearch);
  });
  console.log(teamAbr);
  console.log("****IS THIS WORKING???****", teamNameSearch);
});