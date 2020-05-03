// set function to change time to 12 hour format. source: https://stackoverflow.com/questions/8888491/how-do-you-display-javascript-datetime-in-12-hour-am-pm-format
function hour(time) {
    var hour = time >= 12 ? 'PM' : 'AM';
    time = time % 12;
    time = time ? time : 12;
    return time + hour;
}
// created function to determine date & time of user. Source: https://momentjs.com/
$(document).ready(function () {
    $("#currentDay").text(moment().format("dddd, MMMM Do, h:mm a"));
    $("#currentDay").css("text-decoration", "underline");
    for (var i = 9; i < 18; i++) {

        // rows created below (9 rows)
        var row = $(`<div data-time=${i} id='${i}' class="row">`);

        // hour column created below (9AM-5PM)
        var hourCol = $('<div class="col-lg-1"> <p class="hour">' + hour(i) + '</p>');

        //create column 2 for event info
        var eventCol = $(`<div class="col-lg-10 past"><textarea id=text${i} class="event" placeholder="Plave your tasks here"></textarea>`);

        //create column 3 for the save button w/ fontAwsome logo 
        var saveBtnCol = $(`<div class="col-lg-1"><button class="saveBtn" id=${i}><i class="fas fa-save"></i></button>`)


        // appended columns to the row above
        row.append(hourCol);
        row.append(eventCol);
        row.append(saveBtnCol);
        // appen the rows to our container class on HTML file
        $(".container").append(row);
        // store all information inputted to our localStorage 
        getLocalStorage(i);
    }
    hour();

    // function to change colors for past & future || sources: https://www.w3schools.com/js/js_dates.asp, https://www.w3schools.com/jsref/jsref_gethours.asp
    function updateColors() {
        var currentTime = new Date().getHours();
        for (var i = 9; i < 18; i++) {
            if ($(`#${i}`).data("time") == currentTime) {
                $(`#text${i}`).addClass("present");
            } else if (currentTime < $(`#${i}`).data("time")) {
                $(`#text${i}`).addClass("future");
            }
        }
    }
    // set interval to check for updates on colors as time passes
    setInterval(function () {
        updateColors();
    }, 1000);

    // function to store LocalStorage is here
    function getLocalStorage(key) {
        var value = localStorage.getItem(key);
        if (value) {
            $(`#text${key}`).text(value);
        }
    }
    // created on click for save button. Once clicked info is submitted to localStorage
    var saveBtn = $('.saveBtn');
    saveBtn.on('click', function () {
        var eventId = $(this).attr('id');
        var eventText = $(this).parent().siblings().children('.event').val();
        localStorage.setItem(eventId, eventText);
    });
});