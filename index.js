const quoteText = document.querySelector('.quote'),
    authorName = document.querySelector('.name'),
    quoteBtn = document.querySelector('button'),
    speechBtn = document.querySelector('.speech'),
    copyBtn = document.querySelector('.copy'),
    twitterBtn = document.querySelector('.twitter'),
    synth = speechSynthesis;

function randomQuote(){
    quoteBtn.classList.add("loading");
    quoteBtn.innerText = "Loading Quote...";
    fetch("http://api.quotable.io/random")
    .then(response => response.json())
    .then(result => {
        quoteText.innerText = result.content;
        authorName.innerText = result.author;
        quoteBtn.classList.remove("loading");
        quoteBtn.innerText = "New Quote";
    });
}

speechBtn.addEventListener("click", ()=>{
    if(!quoteBtn.classList.contains("loading")){
        let utterance = new SpeechSynthesisUtterance(`${quoteText.innerText} by ${authorName.innerText}`);
        utterance.lang='en-US';
        synth.speak(utterance);
        setInterval(()=>{
            synth.speaking? speechBtn.classList.add("active"):speechBtn.classList.remove("active");
        }, 10);
    }
});

copyBtn.addEventListener("click", ()=> {
    navigator.clipboard.writeText(quoteText.innerText);
});

twitterBtn.addEventListener("click", ()=>{
    let tweetUrl = `https://twitter.com/intent/tweet?url=${quoteText.innerText}`;
    window.open(tweetUrl, "_blank");
});

quoteBtn.addEventListener("click", randomQuote);
