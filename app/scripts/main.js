var jqxhr;

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
  fetchQuoteRemote();
}

function fetchQuoteInline() {
  var quotes = [{
    quote: 'quote1',
    author: 'author1'
  }, {
    quote: 'quote2',
    author: 'author2'
  }, {
    quote: 'quote3',
    author: 'author3'
  }, {
    quote: 'quote4',
    author: 'author4'
  }];
  var r = Math.floor(Math.random() * (quotes.length + 1));
  return (quotes[r]);
}

function fetchQuoteRemote() {
  $.get('http://api.icndb.com/jokes/random?exclude=[explicit]').done(function(data) {
    // setQuoteAuthor(j.author);
    // setQuoteText(j.quote);
    if (data.type === 'success') {
      setQuoteText(data.value.joke);
      setQuoteAuthor('Chuck Norris');
    }
  });
}


// experiment to make multiple calls to fetch a specific random quote
function getChuckNorrisQuoteTwoSteps() {

  var num = 0;
  $.get('http://api.icndb.com/jokes/count').done(function(data) {
    //    debugger;
    if (data.type === 'success') {
      num = data.value;
      if (num > 0) {
        var rand = Math.floor(Math.random() * (num + 1));
        $.get('http://api.icndb.com/jokes/' + rand).done(function(data) {
          if (data.type === 'success') {
            setQuoteText(data.value.joke);
            setQuoteAuthor('Chuck Norris');
          }
        });
      }
    }
  });
  return num;
}
