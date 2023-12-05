var text = [
    "Now I am quietly waiting",
    "For the catastrophe of my personality",
    "to seem beautiful again,",
    "and interesting,",
    "and modern.",
    "",
    "The country is grey and brown and white in trees,",
    "snows and skies of laughter always diminishing,",
    "less funny",
    "not just darker,",
    "not just grey.",
    "",
    "It may be the coldest day of the year,",
    "what does he think of that?",
    "I mean, what do I?",
    "And if I do,",
    "perhaps I am myself again.",
    "Mayakovsky Part 4, by Frank O'Hara",
    "It's important to take time to reflect every now and then.",
    "To remind ourselves of what we're striving towards.",
    "It's so easy to get lost.",
    "Part of life is embracing that chaos.",
    "That lack of control.",
    "But it's also helpful to have some sense of direction.",
    "A purpose.",
    "So do yourself a favor and take a break.",
    "Evaluate where you are",
    "Determine your metrics of self-worth",
    "And move forward.",
];

var currentText = -1;
var textElement = document.getElementById('arrayText');

document.addEventListener('click', function (event) {
    displayNextText(event.clientX, event.clientY);
});

/* I used Stack Exchange and ChatGPT to troubleshoot this section. */

function displayNextText(x, y) {
    currentText = (currentText + 1) % text.length;

    textElement.style.transition = 'none';
    textElement.style.opacity = '0';
    void textElement.offsetWidth;

    textElement.textContent = text[currentText];
    textElement.style.top = y + 'px';
    textElement.style.left = x + 'px';
    textElement.style.display = 'block';

    setTimeout(() => {
        textElement.style.transition = 'opacity 0.5s ease-in-out';
        textElement.style.opacity = '1';
    });
}

function hideText() {
    textElement.style.opacity = '0';

    setTimeout(function () {
        textElement.style.display = 'none';
    }, 500);
}