// MIT License
// Copyright (c) 2020 Luis Espino

let visitedStates = [
	"ADIRTYCLEAN",
	"ACLEANDIRTY",
	"ADIRTYDIRTY",
	"ACLEANCLEAN",
	"BDIRTYCLEAN",
	"BCLEANDIRTY",
	"BDIRTYDIRTY",
	"BCLEANCLEAN"
]

function reflex_agent(location, state) {
	if (state == "DIRTY") return "CLEAN";
	else if (location == "A") return "RIGHT";
	else if (location == "B") return "LEFT";
}

/**
 * This function predicts the next room that 
 * will get dirty in next simulation step
 */
function stainer(states) {
	var random = Math.random()*13+1
	if (random < 5) {
		// Does nothing
	}else if(random < 7){
		// A gest dirty
		states[1] = "DIRTY"
	} else if(random < 11){
		// B gest dirty
		states[2] = "DIRTY"
	}else{
		// Both get dirty
		states[1] = "DIRTY"
		states[2] = "DIRTY"
	}
}

function test(states) {

	const statesCount = visitedStates.length
	visitedStates = visitedStates.filter(s => s !== states.join(""))
	
	if(statesCount !== visitedStates.length && document.getElementById("log").children.length > 0){
		const log = document.getElementById("log")
		const last = log.children[log.children.length-1]
		if(visitedStates.length === 0){
			last.innerHTML = last.innerHTML+" * :: Shutdown"
			return
		}else{
			last.innerHTML = last.innerHTML+" *"
		}
	}

	var location = states[0];
	var state = states[0] == "A" ? states[1] : states[2];
	var action_result = reflex_agent(location, state);

	document.getElementById("log").innerHTML += "<p>Location: ".concat(location).concat(" | Action: ").concat(action_result)+"</p>";

	if (action_result == "CLEAN") {
		if (location == "A") states[1] = "CLEAN";
		else if (location == "B") states[2] = "CLEAN";
	}
	else if (action_result == "RIGHT") states[0] = "B";
	else if (action_result == "LEFT") states[0] = "A";
	
	setTimeout(function () { test(states); }, 50);
	stainer(states);
}

var states = ["A", "DIRTY", "DIRTY"];
test(states);

