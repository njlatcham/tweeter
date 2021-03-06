// Wait until the document has loaded all the HTML and CSS and then begin running the JS
$(document).ready(function() {

	// Hides the new tweet form until the compose button is clicked
	$('.newTweet').slideToggle(0)

	// Gets the array containing the database of tweets and pushes it into renderTweets()
	function loadTweets() {
		$.ajax('/tweets', {method: 'GET'})
		.then(function (dbArray) {
			renderTweets(dbArray)
		})
	}

	// Iterates through database and for each item, prepend it into the HTML document
	function renderTweets(tweets) {
		$('#tweetsContainer').empty()
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
                <p class="tweets-footer_time">${escape(formatDate(tweet.created_at))}</p>
                <div class="tweets-footer_images">
                    <i class="fas fa-flag"></i>
                    <i class="fas fa-retweet"></i>
                    <i class="fas fa-heart"></i>
                </div>
            </footer>
	  	</article>`
	  	return $(tweetElement)
	}

	const formatDate = (nanoseconds) => {
		formattedDate = 'Posted '

		if (nanoseconds > 1000 * 1000 * 1000 * 60 * 60 * 24 * 30 * 365) {
			formattedDate += Math.round(nanoseconds / 1000 / 1000 / 1000 / 60 / 60 / 24 / 30 / 365)
			formattedDate += ' years '
		} else if (nanoseconds > 1000 * 1000 * 1000 * 60 * 60 * 24 * 30) {
			formattedDate += Math.round(nanoseconds / 1000 / 1000 / 1000 / 60 / 60 / 24 / 30)
			formattedDate += ' months '
		} else if (nanoseconds > 1000 * 1000 * 1000 * 60 * 60 * 24) {
			formattedDate += Math.round(nanoseconds / 1000 / 1000 / 1000 / 60 / 60 / 24)
			formattedDate += ' days '
		} else if (nanoseconds > 1000 * 1000 * 1000 * 60 * 60) {
			formattedDate += Math.round(nanoseconds / 1000 / 1000 / 1000 / 60 / 60)
			formattedDate += ' hours '
		} else if (nanoseconds > 1000 * 1000 * 1000 * 60) {
			formattedDate += Math.round(nanoseconds / 1000 / 1000 / 1000 / 60)
			formattedDate += ' minutes '
		} else {
			formattedDate += nanoseconds
			formattedDate += ' seconds '
		}

		formattedDate += 'ago'
		return formattedDate
	}

	// When the user submits their tweet, send it to the server and pull 
	//out the content as well as the name, handle, date and avatar
	$('#submit').submit(function(ev) {
		// Stops the default event from being called
		ev.preventDefault()

		const $tweetText = $(this).serialize()

		// If tweet is empty, give the user an alert and do not submit
		if ($('textarea').val() === '') {
			$('.emptyError').toggle(true)
		// If tweet is over 140 characters, give the user an alert and do not submit
		} else if ($('textarea').val().length > 140) {
			$('.charError').toggle(true)
		// If tweet meets all requirements, send contents to '/tweets', clear the section with 
		// id='tweetsContainer' and reload all tweets
		} else {
			$.post('/tweets', $tweetText, function(err, response) {
				$('textarea').val('')
				$('.counter').text('140')
				$('.emptyError').toggle(false)
				$('.charError').toggle(false)
				loadTweets()
			})
		}
	})

	// Initially loads tweets until it is cleared when the submit button is clicked
	loadTweets()

	// Creating button to show and hide the new tweet form, as well as focusing on the textarea
	// when clicked
	$('.compose').click(function(ev) {
		ev.preventDefault()
		$('.newTweet').slideToggle(100)
		$('#newTweet').focus()
	})
})



