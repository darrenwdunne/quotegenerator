$(document).ready(function() {
  console.log('jquery ready');
  // setQuoteAuthor("No Author");
  // setQuoteText("No quote text.");
  newQuote();
  $('#quote-button').click(newQuote);
});

function setQuoteAuthor(author) {
  //document.getElementById('quote-author').innerHTML=author;
  $('#quote-author').html(author);
}

function setQuoteText(text) {
  $('#quote-text').html(text);
}

function newQuote() {
  // can't make remote calls in CodePen
  fetchQuoteRemote();
  // fetchQuoteInline();
}

function fetchQuoteInline() {
  var quotes = [{
    quote: 'Chuck Norris programs occupy 150% of CPU, even when they are not executing.',
    author: 'Chuck Norris'
  }, {
    quote: 'Chuck Norris writes code that optimizes itself.',
    author: 'Chuck Norris'
  }, {
    quote: 'Chuck Norris is the only man to ever defeat a brick wall in a game of tennis.',
    author: 'Chuck Norris'
  }, {
    quote: 'Chuck Norris\'s log statements are always at the FATAL level.',
    author: 'Chuck Norris'
  }];
  var r = Math.floor(Math.random() * (quotes.length));
  setQuoteText(quotes[r].quote);
  setQuoteAuthor(quotes[r].author);
}


function fetchQuoteRemote() {
  $.get('http://api.icndb.com/jokes/random?exclude=[explicit]').done(function(data) {
    if (data.type === 'success') {
      setQuoteText(data.value.joke);
      setQuoteAuthor('Chuck Norris');
    } else {
      fetchQuoteInline();
    }
  }).fail(function(jqXHR, textStatus, errorThrown) { 
    fetchQuoteInline();
  });
}


// experiment to make multiple calls to fetch a specific random quote
function getChuckNorrisQuoteTwoSteps() {

  var num = 0;
  var quoteText = '';
  $.get('http://api.icndb.com/jokes/count').done(function(data) {
    //    debugger;
    if (data.type === 'success') {
      num = data.value;
      if (num > 0) {
        var rand = Math.floor(Math.random() * (num + 1));
        $.get('http://api.icndb.com/jokes/' + rand).done(function(data) {
          if (data.type === 'success') {
            quoteText = data.value.joke;
            setQuoteAuthor('Chuck Norris');
          }
        });
      }
    }
  });
  return num;
}
