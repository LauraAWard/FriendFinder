
//link to data source
var friends = require("../data/friends");

module.exports = function(app) {

	//function to display friends data as JSON
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });


  //function to add user data to friends array
  app.post("/api/friends", function(req, res) {
      
      var userData = req.body;
      var matchScore = 50;
      for(i = 0; i < friends.length; i++) {
      	var totalDifference = 0;
      	var difference = 0;
      	for(j = 0; j < friends[i].scores.length; j++) {
      		difference = userData.scores[j] - friends[i].scores[j];
      		totalDifference += Math.abs(difference);
      	}
      	if(i === 0) {
      		matchScore = totalDifference;
      		var matchID = 0;
      	}
      	else if(i > 0 && totalDifference < matchScore) {
      		matchScore = totalDifference;
      		matchID = i;
      	}

      }

      res.json(friends[matchID]);

      friends.push(req.body);

      console.log(matchScore);


  });

  //function to clear out friends array
  app.post("/api/clear", function() {
    friends = [];

    console.log(friends);
  });
};
