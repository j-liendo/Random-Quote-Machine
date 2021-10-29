const projectName = 'random-quote-machine';

// Variables
// Quotes
let quotes;

// Colors by bootstrap
let colors = {
    names: ["primary", "success", "danger", "warning", "info"],
    hex: {
        // Primary
        0: "#83283",
        // Success
        1: "#41d7a7",
        // Danger
        2: "#fd7e14",
        // Warning
        3: "#ffc107",
        // Info
        4: "#39cbfb",
    }
}

// Actual color
let tnow = Math.floor(Math.random() * 5);

const getQuote = () => {
    $.getJSON('https://api.quotable.io/random', function(data) {
        // console.log(`${data.content} —${data.author}`)
        printQuote([data.content, data.author])
    })
}

const printQuote = (quote) => {
    const [content, author] = [...quote];
    console.log(quote);
    $("#text").fadeOut(function() {
        $(this).text(content).fadeIn();
    });
    $("#author").fadeOut(function() {
        $(this).text(`—${author}`).fadeIn();
    });

    $('#tweet-quote').attr(
        'href',
        'https://twitter.com/intent/tweet?hashtags=quotes&text=' +
        encodeURIComponent('"' + content + '" ' + author)
    );
}

const newColorRandom = () => {
    let randomNumber = tnow;
    while (randomNumber == tnow) {
        randomNumber = Math.floor(Math.random() * 5)
    }
    return randomNumber;
}

const changeColor = (color = newColorRandom(), time = 1000, initial = false) => {

    // Print Quote
    if (!initial) {
        getQuote();
    }

    // favicon
    $('#favicon').attr('href', `./img/favicon-${colors.names[color]}.svg`)

    // New Color in hex
    let newHex = colors.hex[color]

    console.log(newHex);

    // Text Color
    $(".t-c").animate({
        color: newHex,
    }, time);

    // Btns Color
    $(".btn-c").animate({
        backgroundColor: newHex,
    }, time);

    // Bg
    $(".bg").animate({
        backgroundColor: newHex,
    }, time);


    tnow = color;
}

// Main Function
$(document).ready(function() {

    // Preload
    $.getJSON('https://api.quotable.io/random', function() {
        console.log('Connect to quota.io')
    })

    // Initial Color
    changeColor(tnow, 0, true)

    // Button function
    $("button").on("click", () => changeColor())
})