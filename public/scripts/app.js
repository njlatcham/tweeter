// Wait until the document has loaded all the HTML and CSS and then begin running the JS
$(document).ready(function() {

	// Gets the array containing the database of tweets and pushes it into renderTweets()
	function loadTweets() {
		$.ajax('/tweets', {method: 'GET'})
		.then(function (dbArray) {
			renderTweets(dbArray)
		})
	}

	// Iterates through database and for each item, prepend it into the HTML document
	function renderTweets(tweets) {
		for (let item of tweets) {
			const tweetElement = createTweetElement(item)
			$('#tweetsContainer').prepend(tweetElement)
		}
	}

	// Using the escape function to protect my user inputs from being able to change what goes on in the site
	function escape(str) {
	  	var div = document.createElement('div')
	  	div.appendChild(document.createTextNode(str))
	  	return div.innerHTML
	}

	function createTweetElement(tweet) {
		// Takes template from index.html and data from the tweetData base to create a dynamic tweet
	  	let tweetElement = `<article class="tweets">
			<header class="tweets-header">
				<img class="tweets-header_img" src="${escape(tweet.user.avatars.small)}" alt="Profile Picture">
				<div class="tweets-header_title">
					<div class="tweets-header_title__name">${escape(tweet.user.name)}</div>
                    <div class="tweets-header_title__username">${escape(tweet.user.handle)}</div>
				</div>
			</header>

			<div class="tweets-text">
                <p class="tweets-text_tweet">${escape(tweet.content.text)}</p>
            </div>

            <footer class="tweets-footer">
                <p class="tweets-footer_time">${escape(tweet.created_at)}</p>
                <div class="tweets-footer_images">
                    <img class="tweets-footer_images__flag" src="/images/flag-solid.svg" alt="Flag">
                    <img class="tweets-footer_images__retweet" src="/images/retweet-solid.svg" alt="Retweet">
                    <img class="tweets-footer_images__heart" src="/images/heart-solid.svg" alt="Heart">
                </div>
            </footer>
	  	</article>`
	  	return $(tweetElement);
	}

	// When the user submits their tweet, send it to the server and pull 
	//out the content as well as the name, handle, date and avatar
	$('#submit').submit(function(ev) {
		// Stops the default event from being called
		ev.preventDefault()

		const $tweetText = $(this).serialize()

		// If tweet is empty, give the user an alert and do not submit
		if ($('textarea').val() === '') {
			window.alert('Tweet cannot be empty')
		// If tweet is over 140 characters, give the user an alert and do not submit
		} else if ($('textarea').val().length > 140) {
			window.alert('Tweet must be less than 140 characters')
		// If tweet meets all requirements, send contents to '/tweets', clear the section with 
		// id='tweetsContainer' and reload all tweets
		} else {
			$.post('/tweets', $tweetText, function(err, response) {
				$('#tweetsContainer').empty()
				$('textarea').val('')
				loadTweets()
			})
		}
	})

	// Initially loads tweets until it is cleared when the submit button is clicked
	loadTweets()
})



