
document.addEventListener('DOMContentLoaded', () => {

    const high_schools = [
        "bcc",
        "blair",
        "blake",
        "churchill",
        "clarksburg",
        "damascus",
        "einstein",
        "gaithersburg-hs",
        "kennedy",
        "magruder",
        "northwest",
        "northwood",
        "paint-branch",
        "poolesville",
        "quince-orchard",
        "rm",
        "rockville",
        "seneca-valley",
        "sherwood",
        "springbrook",
        "walter-johnson",
        "watkins-mill",
        "wheaton",
        "whitman",
        "wooton"
    ]

    const display_high_schools = [
        "Bethesda-Chevy Chase",
        "Montgomery Blair",
        "James Hubert Blake",
        "Winston Churchill",
        "Clarksburg",
        "Damascus",
        "Albert Einstein",
        "Gaithersburg",
        "John F. Kennedy",
        "Col. Zadok Magruder",
        "Northwest",
        "Northwood",
        "Paint Branch",
        "Poolesville",
        "Quince Orchard",
        "Richard Montgomery",
        "Rockville",
        "Seneca Valley",
        "Sherwood",
        "Springbrook",
        "Walter Johnson",
        "Watkins Mill",
        "Wheaton",
        "Walt Whitman",
        "Thomas S. Wooton"
    ]
    
    const middle_schools = [
        "argyle",
        "baker",
        "banneker",
        "briggs-chaney",
        "cabin-john",
        "eastern",
        "farquhar",
        "forest-oak",
        "francis-scott-key",
        "frost",
        "gaithersburg-ms",
        "hoover",
        "jw",
        "kingsview",
        "lakelands",
        "loiderman",
        "mlk",
        "montgomery-village",
        "neelsville",
        "newport-mill",
        "north-bethesda",
        "odessa",
        "parkland",
        "poole",
        "pyle",
        "redland",
        "ridgeview",
        "roberto-clemente",
        "rocky-hill",
        "rosa-parks",
        "shady-grove",
        "silver-creek",
        "sligo",
        "ssi",
        "takoma-park",
        "tilden",
        "wells",
        "westland",
        "white-oak",
        "wood"
    ]

    const display_middle_schools = [
        "Argyle",
        "John T. Baker",
        "Benjamin Banneker",
        "Briggs Chaney",
        "Cabin John",
        "Eastern",
        "William H. Farquhar",
        "Forest Oak",
        "Francis Scott Key",
        "Robert Frost",
        "Gaithersburg",
        "Herbert Hoover",
        "Julius West",
        "Kingsview",
        "Lakelands Park",
        "Mario A. Loiderman",
        "Dr. Martin Luther King",
        "Montgomery Village",
        "Neelsville",
        "Newport Mill",
        "North Bethesda",
        "Odessa Shannon",
        "Parkland",
        "John Poole",
        "Thomas W. Pyle",
        "Redland",
        "Ridgeview",
        "Roberto Clemente",
        "Rocky Hill",
        "Rosa Parks",
        "Shady Grove",
        "Silver Creek",
        "Sligo",
        "Silver Spring Intl.",
        "Takoma Park",
        "Tilden",
        "Hallie Wells",
        "Westland",
        "White Oak",
        "Earle B. Wood"
    ]

    schools = middle_schools.concat(high_schools)
    display_schools = display_middle_schools.concat(display_high_schools)

    const template = document.getElementById('school-template');
    for (let index = 0; index < schools.length; index++) {
        const school_id = schools[index];

        

        const clone = template.cloneNode(true);

        clone.querySelector("img").src = "https://cdn.jsdelivr.net/gh/UntitledOutput/leul4smob-dev@main/res/school/icons/"+school_id+".png"
        clone.querySelector("img").onclick = function() {
            link('/repost/prompt/?school='+school_id)
        }

        school_sub =  " High School";
        if (index < middle_schools.length)
            school_sub = " Middle School"

        clone.querySelector("h2").innerHTML = display_schools[index] + school_sub
        template.parentElement.appendChild(clone);
    }

    template.remove()
});
