function getVideoTweets()
{
  var getTweets = new XMLHttpRequest();
  getTweets.open("GET", "https://mobile.twitter.com/search?q=VdafjyFK3ko", true);
  getTweets.onreadystatechange = function() {
    if (getTweets.readyState == 4) {
      var doc = document.implementation.createHTMLDocument("vidlogtweets");
      doc.documentElement.innerHTML = getTweets.responseText;
      var mainDiv = doc.getElementById("main_content");
      if(mainDiv==null)
      {
        maindiv = doc.getElementsByClassName("Search");
        var tweetDivs = mainDiv.getElementsByClassName("Tweet");
      }
      else
      {
        var tweetDivs = mainDiv.getElementsByClassName("tweet");
      }
      twitterHTML = "";
      if(tweetDivs.length == 0)
      {
        twitterHTML = "<tr><td>No Tweets Available</td></tr>";
      }
      else
      {
        for(i=0;(i<tweetDivs.length)&&(i<=9);i++)
        {
          twitterHTML += '<div class="twee_table"><table cellspacing="0"><tr>';
          var img = tweetDivs[i].getElementsByTagName("img");
          var twitterProfileImgSrc = img[0].src;
          twitterHTML += '<td class="wdt3 marg bck"><img src="'+twitterProfileImgSrc+'"></td>';

          var timestamp = tweetDivs[i].getElementsByClassName("timestamp");
          var timestampAnchor = timestamp[0].getElementsByTagName("a");
          var twitterTime = timestampAnchor[0].innerHTML;
          var fullName = tweetDivs[i].getElementsByClassName("fullname");
          var twitterProfileFullName = fullName[0].innerHTML;
          twitterHTML += '<td class="wdt7 marg bck"><h5><a href="">'+twitterProfileFullName+'</a></h5><span class="dteOn">'+twitterTime+'</span><br/>';

          var userName = tweetDivs[i].getElementsByClassName("username");
          var twitterProfileUserName = userName[0].innerHTML;
          twitterHTML += '<a href="">'+twitterProfileUserName+'</a>';

          var tweetText = tweetDivs[i].getElementsByClassName("dir-ltr");
          var twitterDescription = tweetText[0].innerHTML;
          twitterHTML += '<p>'+twitterDescription+'</p>';

          twitterHTML += "</td></tr></table></div>";
        }
      }
      document.getElementById('vidlog-video-tweets-container').innerHTML = twitterHTML;
    }
  }
  getTweets.send();
}
window.onload = getVideoTweets());