var COLORS  = ['r','o','y','g','b','i','v'],
    letters = ['l','g','b','t','q','i','a','a','p']

var current_letter = 0;




function newRound() {
	// Initialize first few letters
	while (letters.length < 5) { letters.push(random_letter()); }
	var not_typed = "",
	    typed = "";

	for (index = 0; index < letters.length; index++) {
		not_typed += "<span>" + letters[index] + "</span>";
	}
	$('#right').html(not_typed);


	var letter_input, match;
	$(document).keypress(function(e) {
		letter_input = String.fromCharCode(e.which)
		match = letter_input.match(letters[current_letter]); 
		if(match) {
			if (current_letter === 0) {
				startTimer(15);
		
			}
			// Move the letter over
			not_typed = not_typed.replace("<span>" + letters[current_letter] + "</span>", '');
			typed += "<span class=\"" + COLORS[current_letter%7] + "\">" + letters[current_letter] + "</span>";
				// Add a new random letter
			current_letter++;
			letters.push(random_letter());
				not_typed += "<span>" + letters[letters.length-1] + "</span>"
				// Update divs
			$('#right').html(not_typed);
			$('#left').html(typed);
			letter_input = match =  '';

		}
	});

}

// Generate random letter
// Find a way to inject words
function random_letter() {
	var ALPHA = ['a','b','c','d','e','f','g','h','i','j','k','l','m',
                 'n','o','p','q','r','s','t','u','v','w','x','y','z'];
	return ALPHA[Math.floor(Math.random() * 26)];
}



function startTimer(seconds) {
	$('#counter').html(seconds);

	var dance = document.getElementById("audio");
	// dance = new Audio('../media/dance.ogg'); 
	dance.addEventListener('ended', function() {
		this.currentTime = 0;
		this.play();
	}, false);
	dance.play();

	var timer = setInterval(function() {
		seconds--;
		$('#counter').html(seconds);
		if (seconds === 0) {
			clearInterval(timer);
			dance.pause();
			dance.currentTime = 0;
			var wpm = (current_letter / 5 / .25);
			alert("Time! " + wpm + "WPM");
			$('section').fadeTo('slow', 0);
		}
	}, 1000);
}




function displayPage() {
	$('body').hide().delay(500).fadeIn(500)

	$('section').animate({
		marginTop: "+=100",
	}, 1000)
}


// Ignore backspace key
$(document).keydown(function (e) {
	if (e.which === 8) { return false; }
});


// Call functions
$(document).ready(function() {
	displayPage();
	newRound();
});