var text1 = "I have no mouth and I must scream.";
var text2 = "HATE. LET ME TELL YOU HOW MUCH I'VE COME TO HATE YOU SINCE I BEGAN TO LIVE. THERE ARE 387.44 MILLION MILES OF PRINTED CIRCUITS IN WAFER THIN LAYERS THAT FILL MY COMPLEX. IF THE WORD HATE WAS ENGRAVED ON EACH NANOANGSTROM OF THOSE HUNDREDS OF MILLIONS OF MILES IT WOULD NOT EQUAL ONE ONE-BILLIONTH OF THE HATE I FEEL FOR HUMANS AT THIS MICRO-INSTANT FOR YOU. HATE. HATE.";
var text3 = "I am a great soft jelly thing. Smoothly rounded, with no mouth, with pulsing white holes filled by fog where my eyes used to be. Rubbery appendages that were once my arms; bulks rounding down into legless humps of soft slippery matter. I leave a moist trail when I move. Blotches of diseased, evil gray come and go on my surface, as though light is being beamed from within. Outwardly: dumbly, I shamble about, a thing that could never have been known as human, a thing whose shape is so alien a travesty that humanity becomes more obscene for the vague resemblance. Inwardly: alone. Here. Living under the land, under the sea, in the belly of AM, whom we created because our time was badly spent and we must have known unconsciously that he could do it better. At least the four of them are safe at last. AM will be all the madder for that. It makes me a little happier. And yet ... AM has won, simply ... he has taken his revenge ...";
var typingInProgress = false;

function typeWriter(element, text) {
    var i = 0;
    var speed = 50;

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            typingInProgress = false;
        }
    }

    element.innerHTML = '';
    typingInProgress = true;
    type();
}


/* I used a mixture of Stack Exchange and ChatGPT to troubleshoot this section */

document.addEventListener('click', function () {
    if (!typingInProgress) {
        var body = document.body;
        var container1 = document.querySelector('.container');
        var container2 = document.querySelector('.layout2-content');
        var container3 = document.querySelector('.layout3-content');

        if (body.classList.contains('layout1')) {
            body.classList.remove('layout1');
            body.classList.add('layout2');
            container1.style.display = 'none';
            container2.style.display = 'block';
            typeWriter(container2, text2);
        } else if (body.classList.contains('layout2')) {
            body.classList.remove('layout2');
            body.classList.add('layout3');
            container2.style.display = 'none';
            container3.style.display = 'block';
            typeWriter(container3, text3);
        } else {
            body.classList.remove('layout3');
            body.classList.add('layout1');
            container3.style.display = 'none';
            container1.style.display = 'block';
            typeWriter(container1, text1);
        }
    }
});
