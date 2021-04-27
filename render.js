/**
 * Course: COMP 426
 * Assignment: a05
 * Author: <Abigail Wingo>
 *
 * This script uses jQuery to build an HTML page with content taken from the
 * data defined in data.js.
 */



/**
 * Given a hero object (see data.js), this function generates a "card" showing
 *     the hero's name, information, and colors.
 * @param hero  A hero object (see data.js)
 */
export const renderHeroCard = function(hero) {
    // TODO: Copy your code from a04 to render the hero card
    // let colors = `<div style="color: ${hero.color}; background-color: ${hero.backgroundColor}"></div>`
    // let img = `<img src="${hero.img}" alt="hero image" width:"42" height:"42">`
    // let sname = `<h1>${hero.name}</h1>`
    // let rname = `<h1>${hero.first} ${hero.last}</h1>`
    // let description = `<p><span>${hero.description}</span><p>`
    // let firstSeen = `<h2>${hero.firstSeen}</h2>`
    // let edit = `<button type="button" class="edit">EDIT</button>`

    let card =
        `<div id="${hero.id}" style="color: ${hero.color}; background-color: ${hero.backgroundColor}">
            <img src="${hero.img}" alt="hero image" width:"42" height:"42" background-color: ${hero.backgroundColor}>
            <h1>${hero.name}</h1>
            <h1>${hero.first} ${hero.last}</h1>
            <p><span>${hero.description}</span><p>
            <h2>${hero.firstSeen}</h2>
            <button type="button" class="edit" onclick="handleEditButtonPress(event)">EDIT</button>
        </div>`

    return card
};



/**
 * Given a hero object, this function generates a <form> which allows the
 *     user to edit the fields of the hero. The form inputs should be
 *     pre-populated with the initial values of the hero.
 * @param hero  The hero object to edit (see data.js)
 */
export const renderHeroEditForm = function(hero) {
    // TODO: Copy your code from a04 to render the hero edit form
    let form = 
        `<form class="${hero.id}" style="color: ${hero.color}; background-color: ${hero.backgroundColor}">
            <label for="fname">First Name:</label>
            <input id="first" class="input" type="text" value="${hero.first}" name="firstName">
            <label for="lname">Last Name:</label>
            <input id="last" class="input" type="text" value="${hero.last}" name="lastName">
            <label for="sname">Superhero Name:</label>
            <input id="name" class="input" type="text" value="${hero.name}" name="heroName">
            <label for="seen">First Seen:</label>
            <input id="firstSeen" class="input" type="text" value="${hero.firstSeen}" name="seen">
            <label for="descrip">Description:</label>
            <textarea id="descrip" class="textarea" type="text" name="descrip">${hero.description}</textarea>
            <button type="submit" class="save">save</button>
            <button type="reset" class="cancel" onclick="handleCancelButtonPress(event)">cancel</button>
        </form>`

    return form
};



/**
 * Handles the JavaScript event representing a user clicking on the "edit"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleEditButtonPress = function(event) {
    // TODO: Render the hero edit form for the clicked hero and replace the
    //       hero's card in the DOM with their edit form instead
    // alert("starting handle edit button")
    event.preventDefault()
    const $root = $('#root');

    let hero = event.target.parentNode;
    // alert("hero: " + hero)
    let id = hero.id;
    // alert("id: " + id)
    let i = heroicData.findIndex(a => a.id==id)
    // alert("i: " + i)
    let form = renderHeroEditForm(heroicData[i])
    // alert("form is made")
    hero.remove()
    $root.append(form)
    // alert("Edit Avenger at the bottom of the page.")
    // alert("done with handle edit button")
};



/**
 * Handles the JavaScript event representing a user clicking on the "cancel"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleCancelButtonPress = function(event) {
    // TODO: Render the hero card for the clicked hero and replace the
    //       hero's edit form in the DOM with their card instead
    event.preventDefault()
    const $root = $('#root');
    
    let form = event.target.parentNode
    // alert("form: " + form)
    let c = form.className
    // alert("class: " + c)
    let i = heroicData.findIndex(a => a.id==c)
    // alert("i: " + i)
    let card = renderHeroCard(heroicData[i])
    form.remove()
    $root.append(card)
};



/**
 * Handles the JavaScript event representing a user clicking on the "cancel"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleEditFormSubmit = function(event) {
    // TODO: Render the hero card using the updated field values from the
    //       submitted form and replace the hero's edit form in the DOM with
    //       their updated card instead
    event.preventDefault()
    const $root = $('#root');
    
    let form = event.target.parentNode
    // alert("form: " + form)
    let c = form.className
    // alert("class: " + c)
    let i = heroicData.findIndex(a => a.id==c)
    // alert("i: " + i)
    let hero = heroicData[i]
    hero.first=$('#first').val()
    hero.last=$('#last').val()
    hero.name=$('#name').val()
    hero.description=$('#descrip').val()
    let date = $('#firstSeen').val()
    hero.firstSeen=new Date(date)
    let card = renderHeroCard(heroicData[i])
    form.remove()
    $root.append(card)
};



/**
 * Given an array of hero objects, this function converts the data into HTML,
 *     loads it into the DOM, and adds event handlers.
 * @param  heroes  An array of hero objects to load (see data.js)
 */
export const loadHeroesIntoDOM = function(heroes) {
    // Grab a jQuery reference to the root HTML element
    const $root = $('#root');

    // TODO: Generate the heroes using renderHeroCard()
    //       NOTE: Copy your code from a04 for this part

    // TODO: Append the hero cards to the $root element
    //       NOTE: Copy your code from a04 for this part
    for (let i=0; i<heroes.length; i++) {
        let hero = renderHeroCard(heroes[i])
        $root.append(hero)
    }

    // TODO: Use jQuery to add handleEditButtonPress() as an event handler for
    //       clicking the edit button

    $root.on("click", ".edit", (event) => handleEditButtonPress(event))

    // TODO: Use jQuery to add handleEditFormSubmit() as an event handler for
    //       submitting the form

    $root.on("click", ".cancel", (event) => handleCancelButtonPress(event))

    // TODO: Use jQuery to add handleCancelButtonPress() as an event handler for
    //       clicking the cancel button

    $root.on("click", ".save", (event) => handleEditFormSubmit(event))
};



/**
 * Use jQuery to execute the loadHeroesIntoDOM function after the page loads
 */
$(function() {
    loadHeroesIntoDOM(heroicData);
});