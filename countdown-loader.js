---
---


countdown_date = "Jan 7, 2026 19:30:00"

//countdown_date = new Date(new Date().getTime() + 3000)

// Function to dynamically load a CSS file
function loadCSS(filename) {

    filename = "{{ site.baseurl }}"+filename

    // Create a new link element
    var link = document.createElement('link');
    
    // Set the attributes for the link element
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = filename;
    
    // Append the link element to the HTML head
    document.head.appendChild(link);
}



var countDownDate = new Date(countdown_date).getTime();
var now = new Date().getTime();

var distance = countDownDate - now;

var seconds = distance / 1000
var days = Math.floor(distance / (1000 * 60 * 60 * 24))

const urlParams = new URLSearchParams(window.location.search);

if (seconds > 0 && !urlParams.has("bypass-ctd")) {

    document.addEventListener("DOMContentLoaded", function(event) {
    fetch('{{ site.baseurl }}/countdown.html')
        .then(response => response.text())
        .then(html => {
            document.body.insertAdjacentHTML('afterbegin', html);
            
            var script = document.createElement('script');
            script.src = "{{ '/countdown.js?' | absolute_url }}";
            document.body.appendChild(script)


        })
    })

    // Call the function to load your CSS file
    loadCSS('/countdown.css'); 
} else if (days > -3) {
        document.addEventListener("DOMContentLoaded", function(event) {

            setTimeout(() => {
                confetti({
                    particleCount: 2500,
                    spread: 360,
                    ticks: 100,
                    gravity: 0,
                    decay: 0.94,
                    colors: ["b11919", "ecca16"],
                });
            }, 1000);

    })
}


