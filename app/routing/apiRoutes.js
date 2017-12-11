
//link to data source
var friends = require("../data/friends");

module.exports = function(app) {

	//function to display friends data as JSON
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });


  //function to add user data to friends array and return best match
  app.post("/api/friends", function(req, res) {
      
      var userData = req.body;
      
      //initialize at max score
      var matchScore = 50;

      //loop through friends array
      for(i = 0; i < friends.length; i++) {
      	var totalDifference = 0;
      	var difference = 0;
      	//loop through scores array by friend
      	for(j = 0; j < friends[i].scores.length; j++) {
      		difference = userData.scores[j] - friends[i].scores[j];
      		totalDifference += Math.abs(difference);
      	}
      	//first time through loop do not compare score values
      	if(i === 0) {
      		matchScore = totalDifference;
      		var matchID = 0;
      	}
      	//subsequent times through loop, compare score to previous friends to find best match
      	else if(i > 0 && totalDifference < matchScore) {
      		matchScore = totalDifference;
      		matchID = i;
      	}

      }

      //return best match
      res.json(friends[matchID]);

      //adding after compare, so user not matched with self
      friends.push(req.body);

      console.log(matchScore);


  });

  //function to clear out friends array
  app.post("/api/clear", function() {
    friends = [];

    console.log(friends);
  });
};
