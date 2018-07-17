$(document).ready(function() {
	const maxChar = 140
  	
	$('#newTweet').on('input', function() {
		let charUsed = $(this).val().length
		let charLeft = maxChar - charUsed
		let counter = $(this).siblings('.counter')
		if (charLeft < 0) {
			counter.text(charLeft)
			counter.css('color', '#ff0000')
		} else {
			counter.text(charLeft)
		}
	})
});

// console.log('Hello There')
// console.log('General Kenobi! You are a bold one')

