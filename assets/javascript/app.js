$(document).ready(function() {

	var config = {
        apiKey: "AIzaSyB9LMgR-mjZxNmFz6iZyQgOrmJpNmhGKgk",
        authDomain: "trainscheduler-b84a2.firebaseapp.com",
        databaseURL: "https://trainscheduler-b84a2.firebaseio.com",
        projectId: "trainscheduler-b84a2",
        storageBucket: "trainscheduler-b84a2.appspot.com",
        messagingSenderId: "13375681243"
	};

	firebase.initializeApp(config);

	var database = firebase.database();

	$("#submit").on("click", function(event) {

	    event.preventDefault();

	    name = $("#name").val().trim();
	    destination = $("#destination").val().trim();
	    firstTime = $("#time").val();
	    frequency = parseInt($("#frequency").val().trim());

	    database.ref().push({
	        trainName: name,
	        destination: destination,
	        firstTime: firstTime,
			frequency: frequency
		})	
    });
    
	database.ref().on("child_added", function(data) {
		var name = $("<td>").text(data.val().trainName.trim());
        var destination = $("<td>").text(data.val().destination.trim());
        var frequency = $("<td>").text(data.val().frequency);
        var firstTime = data.val().firstTime;

        var diffTime = moment().diff(moment(firstTime, "hmm"));

        var remainder = Math.floor((diffTime/60000)) % data.val().frequency;

        var minutesUntil = $("<td>").text(data.val().frequency - remainder);

        var nextTrain = moment().add((data.val().frequency - remainder), "minutes");

        var nextArrival = $("<td>").text(moment(nextTrain.toString()).format("h:mm"))
        
		$(".display").append($("<tr>").append([name, destination, frequency, nextArrival, minutesUntil]));
	});
});