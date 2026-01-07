function lerpColor(color1, color2, amount) {
    
    const parseColor = (c) => {
        if (c.startsWith('#')) {
            
            const hex = c.slice(1);
            
            const fullHex = hex.length === 3 
                ? hex.split('').map(char => char + char).join('') 
                : hex;
            return [
                parseInt(fullHex.slice(0, 2), 16),
                parseInt(fullHex.slice(2, 4), 16),
                parseInt(fullHex.slice(4, 6), 16)
            ];
        } else {
            
            return c.match(/\d+/g).map(Number);
        }
    };
    
    const [r1, g1, b1] = parseColor(color1);
    const [r2, g2, b2] = parseColor(color2);

    
    const r = Math.round(r1 + (r2 - r1) * amount);
    const g = Math.round(g1 + (g2 - g1) * amount);
    const b = Math.round(b1 + (b2 - b1) * amount);

    return `rgb(${r}, ${g}, ${b})`;
}


var countDownDate = new Date(countdown_date).getTime();
//countDownDate = new Date("Dec 31, 2025 00:30:00").getTime();

function check() {

    const countdown = document.body.querySelector(".countdown-container");

    if (countdown == null) {
        return
    }

    var now = new Date().getTime();
    var grad_start = new Date("Dec 31, 2025 00:00:00").getTime();

    
    var distance = countDownDate - now;
    var progress = (now - grad_start) / (countDownDate - grad_start);
    if (progress > 1)
        progress = 1




    countdown.style.backgroundColor = lerpColor("rgb(0,0,0)", "#b11919", progress)
    document.getElementById("center-text").style.color = lerpColor("rgb(255,255,255)", "#ecca16", progress)
    document.getElementById("center-number").style.color = lerpColor("rgb(255,255,255)", "#ecca16", progress)



    
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    
    document.getElementById("center-text").innerHTML = days + "d " + hours + "h "
    + minutes + "m " + seconds + "s ";

    
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("center-text").innerHTML = "👀";

        if (countdown) {
            countdown.style.top = "-100vh"
            countdown.style.opacity = "0"
            document.body.style.overflow = "auto"
        }
    }
}

check()

var x = setInterval(check, 1000);