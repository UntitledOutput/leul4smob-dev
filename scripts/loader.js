
/*
const section = document.querySelector(".video-section");
const video = document.querySelector(".video-content");

const startMarginH = -50; // horizontal
const endMarginH = 0;
const startMarginV = 0; // vertical (keeps video visible)
const endMarginV = 0;

const animationScroll = window.innerHeight * 1.5; // increased for smoother effect

function lerp(start, end, progress) {
    return start + (end - start) * progress;
}

// Optional: easing function for smoother animation
function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
}

window.addEventListener("scroll", () => {
    const rect = section.getBoundingClientRect();
    const sectionTop = -rect.top; // how far we've scrolled into the section

    const clamped = Math.min(Math.max(sectionTop, 0), animationScroll);
    const progress = clamped / animationScroll;
    
    // Apply easing (optional - remove if you want linear)
    const easedProgress = easeOutCubic(progress);

    // Animate both horizontal and vertical margins
    const marginH = lerp(startMarginH, endMarginH, easedProgress);
    const marginV = lerp(startMarginV, endMarginV, easedProgress);

    video.style.marginLeft = `${marginH}vh`;
    video.style.marginRight = `${marginH}vh`;
});

*/

// Get a reference to the player by its ID
var player = videojs('main-video', {
    // Optional: Pass options as a JavaScript object (e.g., autoplay, plugins)
    autoplay: true,
    controls: true,
    fluid: true,
    loop: true,
    aspectRatio: '16:9',
    muted: false
}, function onPlayerReady() {
    // This function runs once the player is fully set up and ready to use the API
    console.log('Your player is ready!');

    // In this context, `this` refers to the player instance
    var myPlayer = this;

    // Example API usage: log when the video ends
    myPlayer.on('ended', function() {
        console.log('Awww... over so soon?!');
    });
});

document.addEventListener("mousemove", () => {
  player.muted(false)
})