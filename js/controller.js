
var app = angular.module("RetroBoard", []);

app.controller("Controller", function($scope) { // This is where the server will read and write to the database and store the information
	$scope.myHashMap = {"Ideas":[], "Retro":[], "Blockers":[], "Solutions":[], "Completed":[]};
	$scope.records = ["Ideas", "Retro", "Blockers", "Solutions", "Completed"];
	
	$scope.removeCard = function(column, id) { // Pretty much done
		var index = $scope.myHashMap[column].indexOf(id);
		$scope.myHashMap[column].splice(index, 1);
	};
	
	$scope.addCard = function(column, id) { // Need to make it so you must enter a STRING larger than 1 character and add more bypass cases
		var title = prompt('Enter new card title:');
		while(title.length < 1) {
			title = prompt('Attention: You must enter a string.');
		}
		$scope.myHashMap[column].push(title);
	};
	
	$scope.editCard = function(column, id) { // Lazy way of implementing full functionality, find a better way if possible
		var newName;
		var oldName = $scope.myHashMap[column].indexOf(id);
		newName = prompt("Enter the new name of the card:");
		$scope.myHashMap[column].pop(oldName);
		$scope.myHashMap[column].push(newName);
	};
	
	$scope.clearBoard = function(column, id) { // Need to itereate through keymap() to find all possible notecards and then remove them with splice()
		var isTrue = confirm("Are you sure you want to proceed?");
		if(isTrue == true) {
			alert("Board successfully cleared.");
			return true;
			// drop and re-add the table
			// use for server-side
		} else {
			return false;
		}
	};
	
	$scope.swapColumn = function(column, id) {
		// use ajax
		// refresh the board
	};
});

// Drag and drop solution, can be done better
// Card needs to change column names after transfer
$('document').ready(init);
function init(){
	var i, index;
	$('#Ideas, #Retro, #Blockers, #Solutions, #Completed').bind('dragstart', function(event) {
		event.originalEvent.dataTransfer.setData("text/plain", event.target.getAttribute('id'));
		event.target.getAttribute('id');
	});
		 
	$('#Ideas, #Retro, #Blockers, #Solutions, #Completed').bind('dragover', function(event) {
		event.preventDefault();
	});
		
	$('#Ideas, #Retro, #Blockers, #Solutions, #Completed').bind('drop', function(event) {
		var notecard = event.originalEvent.dataTransfer.getData("text/plain");
		event.target.appendChild(document.getElementById(notecard));
		event.preventDefault();
		
	});
}