var periodFactor = 5;
var diameterFactor = 1e3;
var sunDiameterFactor = 100e3; //Sun has its own scaling factor, due to its size
var orbitFactor = 1e6;
var G = 6.67384e-11;

//Diameter, orbit in km; period in days
var sun = {};
sun.name = "sun";
sun.diameter = 695800 * 2;
sun.colour = "yellow";
sun.mass = 1.989e30;
var allPlanets = {};
var mercury = {};
mercury.name = "Mercury";
mercury.diameter = 2440 * 2;
mercury.colour = "brown";
mercury.period = 7603200 / 86400;
mercury.orbit = 58000000 * 2;
allPlanets.Mercury = mercury;
var venus = {};
venus.name = "Venus";
venus.diameter = 6052 * 2;
venus.colour = "darkolivegreen";
venus.period = 19414080 / 86400;
venus.orbit = 108000000 * 2;
allPlanets.Venus = venus;
var earth = {};
earth.name = "Earth";
earth.diameter = 6371 * 2;
earth.colour = "powderblue";
earth.period = 31557600 / 86400;
earth.orbit = 150000000 * 2;
allPlanets.Earth = earth;
var mars = {};
mars.name = "Mars";
mars.diameter = 3390 * 2;
mars.colour = "red";
mars.period = 59356800 / 86400;
mars.orbit = 228000000 * 2;
allPlanets.Mars = mars;

function showHideSettings(checkbox) {
    var settings = document.getElementById("settings");

    if (checkbox.checked) {
        settings.style.setProperty("display", "none");
    } else {
        settings.style.setProperty("display", "inline");
    }
}

function showHideOrbits(checkbox) {
    var orbits = document.getElementsByClassName("orbit");

    for (var i = 0; i < orbits.length; ++i) {
        if (checkbox.checked) {
            orbits[i].style.setProperty("border-width", "1px");
        } else {
            orbits[i].style.setProperty("border-width", "0px");
        }
    }
}

function updateDiameter(event) {
    var planet = allPlanets[event.target.id.replace("-diameter-input", "")];

    planet.diameter = event.target.value;
    updatePlanet(planet.name);
}

function updateOrbit(event) {
    var planet = allPlanets[event.target.id.replace("-orbit-input", "")];

    planet.orbit = event.target.value;
    // planet.period = Math.pow(4 * Math.pow(Math.PI, 2) * Math.pow((planet.orbit * 1000 / 2), 3) / (G * sun.mass), 1 / 2) / 86400;
    updatePlanet(planet.name);
    updatePlanetOptions(planet.name);
}

function updatePeriod(event) {
    var planet = allPlanets[event.target.id.replace("-period-input", "")];

    planet.period = event.target.value;
    // planet.orbit = 2 * Math.pow(G * sun.mass * Math.pow(planet.period * 86400, 2) / (4 * Math.pow(Math.PI, 2)), 1 / 3) / 1000;
    updatePlanet(planet.name);
    updatePlanetOptions(planet.name);
}

function updateFactor(event) {
    var pKey,
        planet;

    if (event.target.id == "period-factor") {
        periodFactor = event.target.value;
    } else if (event.target.id == "diameter-factor") {
        diameterFactor = event.target.value;
    } else if (event.target.id == "sun-diameter-factor") {
        sunDiameterFactor = event.target.value;
        updateSun();
    } else if (event.target.id == "orbit-factor") {
        orbitFactor = event.target.value;
    }

    for (pKey in allPlanets) {
        planet = allPlanets[pKey];
        updatePlanet(planet.name);
        updatePlanetOptions(planet.name);
    }
}

function updatePlanet(name) {
    var body = document.getElementsByTagName("body")[0],
        planet = allPlanets[name];
        orbitDiv = document.getElementById(name + "-orbit");
        planetDiv = document.getElementById(name);

    orbitDiv.style.setProperty("width", planet.orbit / orbitFactor + "px");
    orbitDiv.style.setProperty("height", planet.orbit / orbitFactor + "px");
    orbitDiv.style.setProperty("margin-top", -planet.orbit / orbitFactor / 2 + "px");
    orbitDiv.style.setProperty("margin-left", -planet.orbit / orbitFactor / 2 + "px");
    orbitDiv.style.setProperty("-webkit-animation-duration", planet.period / periodFactor + "s");
    orbitDiv.style.setProperty("-moz-animation-duration", planet.period / periodFactor + "s");
    orbitDiv.style.setProperty("animation-duration", planet.period / periodFactor + "s");

    planetDiv.style.setProperty("width", planet.diameter / diameterFactor + "px");
    planetDiv.style.setProperty("height", planet.diameter / diameterFactor + "px");
    planetDiv.style.setProperty("background-color", planet.colour);
    planetDiv.style.setProperty("margin-top", -(planet.diameter / diameterFactor / 2 + planet.orbit / orbitFactor / 2) + "px");
    planetDiv.style.setProperty("margin-left", -planet.diameter / diameterFactor / 2 + "px");
}

function updatePlanetOptions(name) {
    var planet = allPlanets[name],
        e;

    e = document.getElementById(name + "-diameter-input");
    e.setAttribute("value", Math.round(planet.diameter));
    e = document.getElementById(name + "-period-input");
    e.setAttribute("value", Math.round(planet.period));
    e = document.getElementById(name + "-orbit-input");
    e.setAttribute("value", Math.round(planet.orbit));
}

function createSun() {
    var body = document.getElementsByTagName("body")[0],
        sunDiv = document.createElement("div");

    sunDiv.setAttribute("class", "star");
    sunDiv.setAttribute("id", "sun");
    sunDiv.style.setProperty("width", sun.diameter / sunDiameterFactor + "px");
    sunDiv.style.setProperty("height", sun.diameter / sunDiameterFactor + "px");
    sunDiv.style.setProperty("margin-top", -sun.diameter / sunDiameterFactor / 2 + "px");
    sunDiv.style.setProperty("margin-left", -sun.diameter / sunDiameterFactor / 2 + "px");
    body.appendChild(sunDiv);
}

function createPlanet(name) {
    var body = document.getElementsByTagName("body")[0],
        orbitDiv = document.createElement("div"),
        planetDiv = document.createElement("div");

    orbitDiv.setAttribute("class", "orbit");
    orbitDiv.setAttribute("id", name+"-orbit");
    planetDiv.setAttribute("class", "planet");
    planetDiv.setAttribute("id", name);
    orbitDiv.appendChild(planetDiv);
    body.appendChild(orbitDiv);

    updatePlanet(name);
}

function createOptionPanel(name) {
    var settings = document.getElementById("settings"),
        div = document.createElement("div"),
        planet = allPlanets[name],
        e;

    div = document.createElement("div");
    div.setAttribute("class", "planet-options");
    div.setAttribute("id", planet.name + "-options");
    div.style.setProperty('background-color', planet.colour);
    settings.appendChild(div);

    //Delete button
    e = document.createElement("input");
    e.setAttribute("type", "button");
    e.setAttribute("class", "delete-button");
    e.setAttribute("id", planet.name + "-delete");
    e.setAttribute("value", "Remove");
    e.addEventListener("click", deletePlanet);
    div.appendChild(e);

    //Planet name
    e = document.createElement("b");
    e.setAttribute("id", planet.name + "-label");
    e.style.setProperty("text-align", "left");
    e.innerHTML = planet.name 
    div.appendChild(e);

    div.appendChild(document.createElement("br"));

    //Diameter
    e = document.createElement("label");
    e.setAttribute("for", planet.name + "-diameter-input");
    e.innerHTML = "Diameter (km):";
    div.appendChild(e);
    e = document.createElement("input");
    e.setAttribute("type", "number");
    e.setAttribute("id", planet.name + "-diameter-input");
    e.setAttribute("step", "1");
    e.setAttribute("min", "1");
    e.addEventListener("change", updateDiameter);
    div.appendChild(e);

    div.appendChild(document.createElement("br"));

    //Period
    e = document.createElement("label");
    e.setAttribute("for", planet.name + "-period-input");
    e.innerHTML = "Period (days):";
    div.appendChild(e);
    e = document.createElement("input");
    e.setAttribute("type", "number");
    e.setAttribute("id", planet.name + "-period-input");
    e.setAttribute("step", "1");
    e.setAttribute("min", "1");
    e.addEventListener("change", updatePeriod)
    div.appendChild(e);

    div.appendChild(document.createElement("br"));

    //Orbit
    e = document.createElement("label");
    e.setAttribute("for", planet.name + "-orbit-input");
    e.innerHTML = "Orbit diameter (km):";
    div.appendChild(e);
    e = document.createElement("input");
    e.setAttribute("type", "number");
    e.setAttribute("id", planet.name + "-orbit-input");
    e.setAttribute("step", "100000");
    e.setAttribute("min", "1");
    e.addEventListener("change", updateOrbit)
    div.appendChild(e);

    updatePlanetOptions(name);
}

function addPlanet(event) {
    var newPlanet = {}
    newPlanet.diameter = 10000;
    newPlanet.colour = document.getElementById("new-planet-colour").value;
    newPlanet.period = 100;
    newPlanet.orbit = 100000000 * 2;
    newPlanet.name = document.getElementById("new-planet-name").value;
    if (allPlanets[newPlanet.name]) {
        console.log("Planet already exists!");
        return;
    }
    allPlanets[newPlanet.name] = newPlanet;
    document.getElementById("new-planet-name").value = "";
    document.getElementById("new-planet-colour").value = "";

    createPlanet(newPlanet.name);
    createOptionPanel(newPlanet.name);
}

function deletePlanet(event) {
    var body = document.getElementsByTagName("body")[0],
        settings = document.getElementById("settings");

    body.removeChild(document.getElementById(event.target.id.replace("-delete", "-orbit")));
    settings.removeChild(document.getElementById(event.target.id.replace("-delete", "-options")));
    delete allPlanets[event.target.id.replace("-delete", "")];
}

function setup() {
    var input,
        pKey,
        planet;

    input = document.getElementById("period-factor");
    input.value = Math.round(periodFactor);
    input.addEventListener("change", updateFactor);

    input = document.getElementById("diameter-factor");
    input.value = Math.round(diameterFactor);
    input.addEventListener("change", updateFactor);

    input = document.getElementById("orbit-factor");
    input.value = Math.round(orbitFactor);
    input.addEventListener("change", updateFactor);

    input = document.getElementById("sun-diameter-factor");
    input.value = Math.round(sunDiameterFactor);
    input.addEventListener("change", updateFactor);

    input = document.getElementById("new-planet-button");
    input.addEventListener("click", addPlanet);

    createSun();

    for (pKey in allPlanets) {
        planet = allPlanets[pKey];
        createPlanet(planet.name);
        createOptionPanel(planet.name);
    }
}

//Set orbitFactor s.t. Mars' default orbit fills ~90% of screen
var orbitFactor = 228000000 * 2 / Math.min(window.innerWidth, window.innerHeight) * 1.1;
window.onload = setup