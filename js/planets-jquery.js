var periodFactor = 5;
var diameterFactor = 1e3;
var sunDiameterFactor = 100e3; //Sun has its own scaling factor, due to its size
var orbitFactor = 1e6;
var G = 6.67384e-11;

//Diameter, orbit in km; period in days
var sun = {"name": "Sun", "diameter": 695800 * 2, "colour": "yellow", "mass": 1.989e30};
var mercury = {"name": "Mercury", "diameter": 2440 * 2, "colour": "brown", "period": 7603200 / 86400, "orbit": 58000000 * 2};
var venus = {"name": "Venus", "diameter": 6052 * 2, "colour": "darkolivegreen", "period": 19414080 / 86400, "orbit": 108000000 * 2};
var earth = {"name": "Earth", "diameter": 6371 * 2, "colour": "powderblue", "period": 31557600 / 86400, "orbit": 150000000 * 2};
var mars = {"name": "Mars", "diameter": 3390 * 2, "colour": "red", "period": 59356800 / 86400, "orbit": 228000000 * 2};
var allPlanets = {"Mercury": mercury, "Venus": venus, "Mars": mars, "Earth": earth};

function createPlanet(name) {
    console.log("Creating " + name);
    $(document.body).append(
        $(document.createElement("div"))
            .addClass("orbit")
            .attr("id", name + "-orbit")
            .append(
                $(document.createElement("div"))
                    .addClass("planet")
                    .attr("id", name)));

    $("#settings").append(
        $(document.createElement("div"))
            .addClass("planet-options")
            .attr("id", name + "-options")
            .css("background-color", allPlanets[name].colour));

    $("#" + name + "-options").append( //Delete button
        $(document.createElement("input"))
            .addClass("delete-button")
            .attr({
                id: name + "-delete",
                type: "button",
                value: "Remove"
            })
            .click(function() {
                $("#" + name + "-orbit").remove();
                $("#" + name + "-options").remove();
                delete allPlanets[name];
            }))
        .append( //Planet name
        $(document.createElement("b"))
            .css("text-align", "left")
            .html(name))
        .append(
        $(document.createElement("br")))
        .append( //Diameter label
        $(document.createElement("label"))
            .attr("for", name + "-diameter-input")
            .html("Diameter (km):"))
        .append( //Diameter input
        $(document.createElement("input"))
            .attr({
                id: name + "-diameter-input",
                type: "number",
                step: 1,
                min: 1
            })
            .on("change", function() {
                allPlanets[name].diameter = $(this).val();
                updatePlanet(name);
            })
        .append(
        $(document.createElement("br")))
        .append( //Period label
        $(document.createElement("label")))
            .attr("for", name + "-period-input")
            .html("Period (days):"))
        .append( //Period input
        $(document.createElement("input"))
            .attr({
                id: name + "-period-input",
                type: "number",
                step: 1,
                min: 1
            })
            .on("change", function() {
                allPlanets[name].period = $(this).val();
                updatePlanet(name);
            }))
        .append(
        $(document.createElement("br")))
        .append( //Orbit label
        $(document.createElement("label"))
            .attr("for", name + "-orbit-input")
            .html("Orbit diameter (km):"))
        .append( //Orbit input
        $(document.createElement("input"))
            .attr({
                id: name + "-orbit-input",
                type: "number",
                step: 1,
                min: 1
            })
            .on("change", function() {
                allPlanets[name].orbit = $(this).val();
                updatePlanet(name);
            })
        )

    updatePlanet(name);
}

function updatePlanet(name) {
    //Sets all planet values based on values in allPlanets
    console.log("Updating " + name);
    var planet = allPlanets[name];

    $("#" + name + "-orbit").css({
        "width": planet.orbit / orbitFactor,
        "height": planet.orbit / orbitFactor,
        "margin-top": -planet.orbit / orbitFactor / 2,
        "margin-left": -planet.orbit / orbitFactor / 2,
        "-webkit-animation-duration": planet.period / periodFactor + "s",
        "-moz-animation-duration": planet.period / periodFactor + "s",
        "animation-duration": planet.period / periodFactor + "s"
    });

    $("#" + name).css({
        "width": planet.diameter / diameterFactor,
        "height": planet.diameter / diameterFactor,
        "margin-top": -(planet.diameter / diameterFactor / 2 + planet.orbit / orbitFactor / 2),
        "margin-left": -planet.diameter / diameterFactor / 2,
        "background-color": planet.colour
    });

    $("#" + name + "-diameter-input").val(Math.round(planet.diameter));
    $("#" + name + "-period-input").val(Math.round(planet.period));
    $("#" + name + "-orbit-input").val(Math.round(planet.orbit));
}

$(document).ready(function() {
    orbitFactor = 228000000 * 2 / Math.min(window.innerWidth, window.innerHeight) * 1.1;

    $("#period-factor").val(Math.round(periodFactor)).on("change", function() {
        periodFactor = $(this).val();
        $.each(allPlanets, updatePlanet(this.name));
    });
    $("#diameter-factor").val(Math.round(diameterFactor)).on("change", function () {
        diameterFactor = $(this).val();
        $.each(allPlanets, updatePlanet(this.name));
    });
    $("#orbit-factor").val(Math.round(orbitFactor)).on("change", function() {
        orbitFactor = $(this).val();
        $.each(allPlanets, updatePlanet(this.name));
    });
    $("#sun-diameter-factor").val(Math.round(sunDiameterFactor)).on("change", function() {
        sunDiameterFactor = $(this).val();
        $.each(allPlanets, updatePlanet(this.name));
    });

    $("#show-orbits").click(function() {
        if (this.checked) {
            $(".orbit").css("border-width", 1);
        } else {
            $(".orbit").css("border-width", 0);
        }
    });

    $("#hide-settings").click(function() {
        if (this.checked) {
            $("#settings").hide("fast");
        } else {
            $("#settings").show("fast");
        }
    });

    $("#new-planet-button").click(function() {
        var newPlanet = {
            "diameter": 10000,
            "colour": $("#new-planet-colour").val(),
            "period": 100,
            "orbit": 100000000 * 2,
            "name": $("#new-planet-name").val()
        }

        if (allPlanets[newPlanet.name]) {
            console.log("Planet already exists!");
        } else {
            allPlanets[newPlanet.name] = newPlanet
            $("#new-planet-colour").val("");
            $("#new-planet-name").val("");
            createPlanet(newPlanet.name);
        }
    });

    $(document.body).append(
        $(document.createElement("div"))
            .attr("id", "sun")
            .addClass("star")
            .css("width", sun.diameter / sunDiameterFactor)
            .css("height", sun.diameter / sunDiameterFactor)
            .css("margin-top", -sun.diameter / sunDiameterFactor / 2)
            .css("margin-left", -sun.diameter / sunDiameterFactor / 2)
        );

    $.each(allPlanets, createPlanet, this.name);
});