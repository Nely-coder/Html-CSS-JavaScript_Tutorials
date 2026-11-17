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
  let utterance = new SpeechSynthesisUtterance(`${quoteText.innerText}`);
  //   speak method of SpeechSynthesis speaks the utterance
  speechSynthesis.speak(utterance);
});

quoteBtn.addEventListener("click", randomQuote);
