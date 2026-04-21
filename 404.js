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

document.addEventListener('DOMContentLoaded', () => {


    console.log(window.location.pathname)
    // check pathname

    let path = window.location.pathname; // e.g., "/my-project/about/"

    if (baseurl && path.startsWith(baseurl)) {
    // Remove the baseurl prefix
        path = path.substring(baseurl.length);
    }


    school_path = path.substring(1)

    if (high_schools.includes(school_path) || middle_schools.includes(school_path)) {
        link("/repost/prompt?school="+school_path)
    }


})