const quoteText = document.querySelector(".quote");
const quoteBtn = document.querySelector("button");
const authorName = document.querySelector(".author .name");
const soundBtn = document.querySelector(".sound");
const copyBtn = document.querySelector(".copy");
const twitterXBtn = document.querySelector(".twitter-x");

// random quote function
async function randomQuote() {
  // fetching random quotes/data from the API and parsing it into JavaScript object
  //   fetch("https://v2.jokeapi.dev/joke/Any")
  //     .then((res) => res.json())
  //     .then((result) => {
  //       console.log(result);
  //       if (result.joke) {
  //         quoteText.innerText = result.joke;
  //       } else {
  //         randomQuote();
  //       }
  //     });
  quoteBtn.classList.add("loading");
  quoteBtn.innerText = "Loading Quote...";
  const response = await fetch("./quotes.json");
  const data = await response.json();
  console.log(data);

  const randomIndex = Math.floor(Math.random() * data.length);

  quoteText.innerText = data[randomIndex].text;
  authorName.innerText = data[randomIndex].author;
  quoteBtn.innerText = "New Quote";
  quoteBtn.classList.remove("loading");
}

soundBtn.addEventListener("click", () => {
  // the SpeechSynthesisUtterance is a web speech api that represents a speech request
  let utterance = new SpeechSynthesisUtterance(
    `${quoteText.innerText} by ${authorName.innerText}`,
  );
  //   speak method of SpeechSynthesis speaks the utterance
  speechSynthesis.speak(utterance);
});

copyBtn.addEventListener("click", () => {
  // copying the quote text on copyBtn click
  // writeText() property writes the specified text string to the system clipboard.
  navigator.clipboard.writeText(quoteText.innerText);
});

twitterXBtn.addEventListener("click", () => {
  let tweetUrl = `https://x.com/intent/tweet?url=${quoteText.innerText}`;
  window.open(tweetUrl, "_blank"); // opening a new x tab with passing quote in the url
});

quoteBtn.addEventListener("click", randomQuote);
