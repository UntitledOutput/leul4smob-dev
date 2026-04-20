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

async function test_insta() {
  if (navigator.share) {
    try {
      // Fetch the image as a blob
      const response = await fetch( "{{ '/res/posts/northwood.png?' | absolute_url }}" );
      const blob = await response.blob();
      const file = new File([blob], "story.png", { type: "image/png" });

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
