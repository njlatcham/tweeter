/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//Tweet Database
const Data = [
	{
	  	"user": {
		    "name": "Newton",
		    "handle": "@SirIsaac",
		    "avatars": {
		      	"small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
		      	"regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
		     	"large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
		    }
	  	},
	  	"content": {
		    "text": "If I have seen further it is by standing on the shoulders of giants"
	  	},
	  	"created_at": 1461116232227
	},
	{
	    "user": {
	      "name": "Descartes",
	      "avatars": {
	        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
	        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
	        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
	      },
	      "handle": "@rd" },
	    "content": {
	      "text": "Je pense , donc je suis"
	    },
	    "created_at": 1461113959088
	},
	{
	    "user": {
	      "name": "Johann von Goethe",
	      "avatars": {
	        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
	        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
	        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
	      },
	      "handle": "@johann49"
	    },
	    "content": {
	      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
	    },
	    "created_at": 1461113796368
	}
]

$(document).ready(function() {
	function renderTweets(tweets) {
		for (let item of tweets) {
			const tweetElement = createTweetElement(item)
			$('#tweetsContainer').append(tweetElement)
		}
	}

	function createTweetElement(tweet) {
		// Takes template from index.html and data from the tweetData base to create a dynamic tweet
	  	let tweetElement = `<article class="tweets">
			<header class="tweets-header">
				<img class="tweets-header_img" src="${tweet.user.avatars.small}" alt="Profile Picture">
				<div class="tweets-header_title">
					<div class="tweets-header_title__name">${tweet.user.name}</div>
                    <div class="tweets-header_title__username">${tweet.user.handle}</div>
				</div>
			</header>

			<div class="tweets-text">
                <p class="tweets-text_tweet">${tweet.content.text}</p>
            </div>

            <footer class="tweets-footer">
                <p class="tweets-footer_time">${tweet.created_at}</p>
                <div class="tweets-footer_images">
                    <img class="tweets-footer_images__flag" src="/images/flag-solid.svg" alt="Flag">
                    <img class="tweets-footer_images__retweet" src="/images/retweet-solid.svg" alt="Retweet">
                    <img class="tweets-footer_images__heart" src="/images/heart-solid.svg" alt="Heart">
                </div>
            </footer>
	  	</article>`
	  	return $(tweetElement);
	}
	renderTweets(Data)
})



