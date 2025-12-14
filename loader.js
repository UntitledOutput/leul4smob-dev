headers = [



    {
        title: "My Policy",
        description: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Sit amet consectetur adipiscing elit quisque faucibus ex. Adipiscing elit quisque faucibus ex sapien vitae pellentesque.",
        image: "res/photos/posterfront01.png",
        active: true
    },
    
    {
        title: "Welcome",
        description: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Sit amet consectetur adipiscing elit quisque faucibus ex. Adipiscing elit quisque faucibus ex sapien vitae pellentesque.",
        image: "res/photos/posterfront00.jpg",
        active: true
    },

]

// load all headers
{
    const templateSlide = document.querySelector('#carousel-template');

    headers.forEach(element => {
        if (!element.active)
            return
        const slide = templateSlide.cloneNode(true);
        slide.id = ""

        slide.querySelector("#header-title").innerText = element.title
        slide.querySelector("#header-desc").innerText = element.description
        slide.querySelector("#center-img").src = element.image


        templateSlide.parentElement.appendChild(slide)
    });

    templateSlide.remove()
}