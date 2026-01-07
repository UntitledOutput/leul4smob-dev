---
---


document.addEventListener('DOMContentLoaded', function(event) {
  document.querySelector('body').style.opacity = 0; /* Fade in on load */

  
  fetch('{{ site.baseurl }}/navbar.html')
      .then(response => response.text())
      .then(html => {
        document.getElementById('navbar-container').outerHTML = html;
      })

  fetch('{{ site.baseurl }}/footer.html')
      .then(response => response.text())
      .then(html => {
        document.getElementById('footer-container').outerHTML = html;
      })

  fetch('{{ site.baseurl }}/head.html')
      .then(response => response.text())
      .then(html => {
        document.getElementById('head-container').outerHTML = html;
      })


});

window.addEventListener("load", function(event) {
  document.querySelector('body').style.opacity = 1; /* Fade in on load */

});






function logo_btn_click() {
  const fullscreen_wrapper = document.querySelector('.fullscreen-container');
  if (window.innerWidth <= 900) {
    fullscreen_wrapper.className = "fullscreen-container open"
  } else {
    link("/")
  }
}

function close_fullscreen() {
  const fullscreen_wrapper = document.querySelector('.fullscreen-container');

  fullscreen_wrapper.className = "fullscreen-container"
}

function link(url) {
  url = "{{ site.baseurl }}"+url+"?bypass-ctd"
  transitionToPage(url)
}


window.transitionToPage = function(href) {
  document.querySelector('body').style.opacity = 0;
  setTimeout(function() {
    window.location.href = href; /* Redirect after the animation */
  }, 500); /* Must match the CSS transition duration */
}

if (window.performance && window.performance.getEntriesByType("navigation")[0].type === "back_forward") {
  document.querySelector('body').style.opacity = 1; /* Fade in on load */
}