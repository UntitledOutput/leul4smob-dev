// At the top of your script
const basePath = window.location.pathname.match(/^\/[^\/]+\//)?.[0] || '/';

fetch(`${basePath}navbar.html`)
    .then(response => response.text())
    .then(html => {
      document.getElementById('navbar-container').outerHTML = html;
    })

fetch(`${basePath}footer.html`)
    .then(response => response.text())
    .then(html => {
      document.getElementById('footer-container').outerHTML = html;
    })

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
  // If already a full URL, use as-is
  if (url.startsWith('http')) {
    transitionToPage(url);
    return;
  }
  
  // For GitHub Pages project sites, detect base path
  const basePath = window.location.pathname.split('/')[1];
  const isProjectSite = basePath && !url.includes(basePath);
  
  const absoluteUrl = isProjectSite ? `/${basePath}${url}` : url;
  transitionToPage(absoluteUrl);
}

window.transitionToPage = function(href) {
  document.querySelector('body').style.opacity = 0;
  setTimeout(function() {
    window.location.href = href; /* Redirect after the animation */
  }, 500); /* Must match the CSS transition duration */
}

document.addEventListener('DOMContentLoaded', function(event) {
  document.querySelector('body').style.opacity = 1; /* Fade in on load */
});

