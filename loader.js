headers = [

    {
        title: "Test Title",
        description: "Test Description",
        active: true
    }

]

// load all headers
{
    const templateSlide = document.querySelector('#carousel-template');

    headers.forEach(element => {
        if (!element.active)
            return
        const slide = templateSlide.cloneNode(true);
        slide.id = ""
        console.log(slide.querySelector("#header-title"))

        slide.querySelector("#header-title").innerText = element.title
        slide.querySelector("#header-desc").innerText = element.description


        templateSlide.parentElement.appendChild(slide)
    });

    templateSlide.remove()
}