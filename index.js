---
---

document.documentElement.classList.add('js');

function fetchInto(selector, url) {
  var target = document.querySelector(selector);
  if (!target) {
    return Promise.resolve();
  }

  return fetch(url)
    .then(function(response) {
      if (!response.ok) {
        throw new Error('Failed to load ' + url + ': ' + response.status);
      }
      return response.text();
    })
    .then(function(html) {
      target.outerHTML = html;
    })
    .catch(function(error) {
      console.warn(error);
    });
}

var countdown_date = "Apr 22, 2026 07:00:00";

//countdown_date = new Date(new Date().getTime() + 3000)

// Function to dynamically load a CSS file
function loadCSS(filename) {

    filename = "{{ site.baseurl }}" + filename;

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

var seconds = distance / 1000;
var days = Math.floor(distance / (1000 * 60 * 60 * 24));

if (seconds > 0) {

    document.addEventListener("DOMContentLoaded", function() {
        fetch('{{ site.baseurl }}/countdown.html')
            .then(function(response) {
                return response.text();
            })
            .then(function(html) {
                document.body.insertAdjacentHTML('afterbegin', html);

                var script = document.createElement('script');
                script.src = "{{ '/countdown.js?' | absolute_url }}";
                document.body.appendChild(script);
            });
    });

    // Call the function to load your CSS file
    loadCSS('/countdown.css');
} else if (days > -3) {
        document.addEventListener("DOMContentLoaded", function() {

            setTimeout(() => {
                confetti({
                    particleCount: 2500,
                    spread: 360,
                    ticks: 100,
                    gravity: 0,
                    decay: 0.94,
                    colors: ["#b11919", "#ecca16"],
                });
            }, 1000);

    });
}




document.addEventListener('DOMContentLoaded', function() {
  document.body.classList.add('is-transitioning');

  fetchInto('#navbar-container', '{{ site.baseurl }}/navbar.html');
  fetchInto('#footer-container', '{{ site.baseurl }}/footer.html');
  fetchInto('#head-container', '{{ site.baseurl }}/head.html');
});

window.addEventListener('pageshow', function() {
  document.body.classList.add('is-loaded');
  document.body.classList.remove('is-transitioning');
});





function logo_btn_click() {
  var fullscreen_wrapper = document.querySelector('.fullscreen-container');
  if (!fullscreen_wrapper) {
    return;
  }

  if (window.innerWidth <= 900) {
    fullscreen_wrapper.className = "fullscreen-container open";
  } else {
    link("/");
  }
}

function close_fullscreen() {
  var fullscreen_wrapper = document.querySelector('.fullscreen-container');
  if (!fullscreen_wrapper) {
    return;
  }

  fullscreen_wrapper.className = "fullscreen-container";
}

function isExternalLink(url) {
  return /^https?:\/\//i.test(url) || url.indexOf('mailto:') === 0 || url.indexOf('sms:') === 0 || url.indexOf('tel:') === 0;
}

function link(url) {
  var targetUrl = url;
  if (!isExternalLink(url)) {
    targetUrl = "{{ site.baseurl }}" + url;
  }
  transitionToPage(targetUrl);
}

async function shareImage() {
  if (navigator.share) {
    try {
      const queryString = window.location.search;

      // 2. Initialize URLSearchParams
      const urlParams = new URLSearchParams(queryString);

      const school = urlParams.get('school') || '';

      const url = "https://cdn.jsdelivr.net/gh/UntitledOutput/leul4smob-dev@main/res/school/posts/" + school + ".png";

      console.log(url)

      // Fetch the image as a blob
      const response = await fetch( url );
      const blob = await response.blob();
      const file = new File([blob], school + ".png", { tye: "image/png" });

      // Share using native mechanism
      await navigator.share({
        files: [file],
        title: 'Share to Story',
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  } else {
    alert('Share API not supported in this browser.');
  }
}

window.transitionToPage = function(href) {
  close_fullscreen();
  document.body.classList.remove('is-loaded');
  document.body.classList.add('is-transitioning');
  setTimeout(function() {
    window.location.href = href; /* Redirect after the animation */
  }, 500); /* Must match the CSS transition duration */
};

document.addEventListener('keydown', function(event) {
  var target = event.target;
  if (!target || target.getAttribute('role') !== 'button') {
    return;
  }

  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    target.click();
  }
});
