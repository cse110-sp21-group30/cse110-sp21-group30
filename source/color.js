var body = document.body;
var header = document.querySelector('header');
var curr_date = document.getElementById('dates_grid_item22');
var HP_header = document.getElementById('high_priority_header');
var LP_header = document.getElementById('low_priority_header');
var complete_header = document.getElementById('complete_header');
var editor = document.getElementById('editor');
var editor_text = document.getElementById('editor_text');

//Bean theme
document.getElementById('color1').addEventListener('click', function () {
    localStorage.setItem("color", "1");

    body.style.background = '#016CA4';
    header.style.background = '#28AEDD';
    curr_date.style.background = '#B53A27';
    curr_date.style.color = '';
    header.style.color = '#E0E0E0';
    HP_header.style.background = '#B53A27';
    HP_header.style.color = '#E0E0E0';
    LP_header.style.background = '#B53A27';
    LP_header.style.color = '#E0E0E0';
    complete_header.style.background = '#B53A27';
    complete_header.style.color = '#E0E0E0';

    body.style.setProperty('--bullet_bg', '#B53A27');
    body.style.setProperty('--bullet_border', '#9E3521');
    body.style.setProperty('--bullet_color', '#E0E0E0');
    body.style.setProperty('--entry_label_color', '#000000');

    editor.style.background = '#28AEDD';
    editor.style.borderColor = '#28AEDD';
    editor.style.color = '#E0E0E0';
    editor_text.style.background = '#A8EEF8';
    editor_text.style.borderColor = '#A8EEF8';
    editor_text.style.color = '#000000';
    document.getElementById('entry_date').style.color = '#000000';
    document.getElementById('select2').style.color = '#000000';

    document.getElementById('archive_header_text').style.color = '#E0E0E0';

    change_icon_color("white");

    update_search_modal_colors("dark", "light");
    update_faq_modal_colors("dark", "light");
    update_edit_modal_colors("dark", "light");

    document.getElementById("save_edits").style.background = '#016CA4';
    document.getElementById("save_edits").style.borderColor = '#016CA4';
    document.getElementById("search_submit").style.background = '#016CA4';
    document.getElementById("search_submit").style.borderColor = '#016CA4';
});

//Classic theme
document.getElementById('color2').addEventListener('click', function () {
    localStorage.setItem("color", "2");

    body.style.background = '';
    header.style.background = '';
    curr_date.style.background = '';
    curr_date.style.color = '';
    header.style.color = '';
    HP_header.style.background = '';
    HP_header.style.color = '';
    LP_header.style.background = '';
    LP_header.style.color = '';
    complete_header.style.background = '';
    complete_header.style.color = '';

    body.style.setProperty('--bullet_bg', '');
    body.style.setProperty('--bullet_border', '');
    body.style.setProperty('--bullet_color', '');
    body.style.setProperty('--entry_label_color', '#000000');

    editor.style.background = '';
    editor.style.borderColor = '';
    editor.style.color = '';

    editor_text.style.background = '';
    editor_text.style.borderColor = '';
    editor_text.style.color = '';
    document.getElementById('entry_date').style.color = '';
    document.getElementById('select2').style.color = '';

    document.getElementById('archive_header_text').style.color = '';

    change_icon_color("black");

    update_search_modal_colors("light", "light");
    update_faq_modal_colors("light", "light");
    update_edit_modal_colors("light", "light");
});

//UCSD theme
document.getElementById('color3').addEventListener('click', function () {
    localStorage.setItem("color", "3");

    body.style.background = '#182B49';
    header.style.background = '#C69214';
    curr_date.style.background = '#00629B';
    curr_date.style.color = '#E0E0E0';
    header.style.color = '';
    HP_header.style.background = '#FFCD00';
    HP_header.style.color = '';
    LP_header.style.background = '#FFCD00';
    LP_header.style.color = '';
    complete_header.style.background = '#FFCD00';
    complete_header.style.color = '';

    body.style.setProperty('--bullet_bg', '#00629B');
    body.style.setProperty('--bullet_border', '#00629B');
    body.style.setProperty('--bullet_color', '#E0E0E0');
    body.style.setProperty('--entry_label_color', '#000000');

    editor.style.background = '#00629B';
    editor.style.borderColor = '#00629B';
    editor.style.color = '#E0E0E0';
    editor_text.style.background = '#FFCD00';
    editor_text.style.borderColor = '#FFCD00';
    editor_text.style.color = '#000000';
    document.getElementById('entry_date').style.color = '#000000';
    document.getElementById('select2').style.color = '#000000';

    document.getElementById('archive_header_text').style.color = '#E0E0E0';

    change_icon_color("black");
    document.getElementById("close").style.filter = 'invert(90%)';
    document.getElementById("edit").style.filter = 'invert(90%)';
    document.getElementById("clear_archive").style.filter = 'invert(90%)';

    body.style.setProperty('--bullet_icon_filter', 'invert(90%)');

    update_search_modal_colors("dark", "light");
    update_faq_modal_colors("dark", "light");
    update_edit_modal_colors("dark", "light");
});

//Dark theme
document.getElementById('color4').addEventListener('click', function () {
    localStorage.setItem("color", "4");

    body.style.background = '#1A1D21';
    header.style.background = '#19171D';
    curr_date.style.background = '#1D9BD1';
    curr_date.style.color = '';
    header.style.color = '#E0E0E0';
    HP_header.style.background = '#1D9BD1';
    HP_header.style.color = '#E0E0E0';
    LP_header.style.background = '#1D9BD1';
    LP_header.style.color = '#E0E0E0';
    complete_header.style.background = '#1D9BD1';
    complete_header.style.color = '#E0E0E0';

    body.style.setProperty('--bullet_bg', '#222529');
    body.style.setProperty('--bullet_border', '#4D5053');
    body.style.setProperty('--bullet_color', '#E0E0E0');
    body.style.setProperty('--entry_label_color', '#000000');

    editor.style.background = '#222529';
    editor.style.borderColor = '#4D5053';
    editor.style.color = '#E0E0E0';
    editor_text.style.background = '#222529';
    editor_text.style.borderColor = '#4D5053';
    editor_text.style.color = '#E0E0E0';
    document.getElementById('entry_date').style.color = '#000000';
    document.getElementById('select2').style.color = '#000000';

    document.getElementById('archive_header_text').style.color = '#E0E0E0';

    change_icon_color("white");

    update_search_modal_colors("dark", "dark");
    update_faq_modal_colors("dark", "dark");
    update_edit_modal_colors("dark", "dark");
});

//Surf theme
document.getElementById('color5').addEventListener('click', function () {
    localStorage.setItem("color", "5");

    body.style.background = '#46B1C9';
    header.style.background = '#9FB7B9';
    curr_date.style.background = '#46B1C9';
    curr_date.style.color = '';
    header.style.color = '';
    HP_header.style.background = '#84C0C6';
    HP_header.style.color = '';
    LP_header.style.background = '#84C0C6';
    LP_header.style.color = '';
    complete_header.style.background = '#84C0C6';
    complete_header.style.color = '';

    body.style.setProperty('--bullet_bg', '#84C0C6');
    body.style.setProperty('--bullet_border', '#84C0C6');
    body.style.setProperty('--bullet_color', '');
    body.style.setProperty('--entry_label_color', '#000000');


    editor.style.background = '#84C0C6';
    editor.style.borderColor = '#84C0C6';
    editor.style.color = '';
    editor_text.style.background = '#9FB7B9';
    editor_text.style.borderColor = '#9FB7B9';
    editor_text.style.color = '';
    document.getElementById('entry_date').style.color = '#000000';
    document.getElementById('select2').style.color = '#000000';

    document.getElementById('archive_header_text').style.color = '';

    change_icon_color("black");

    update_search_modal_colors("light", "light");
    update_faq_modal_colors("light", "light");
    update_edit_modal_colors("light", "light");
});

//Kinetic theme
document.getElementById('color6').addEventListener('click', function () {
    localStorage.setItem("color", "6");

    body.style.background = '#230969';
    header.style.background = '#282828';
    curr_date.style.background = '#745db3';
    curr_date.style.color = '';
    header.style.color = '#E0E0E0';
    HP_header.style.background = '#745db3';
    HP_header.style.color = '#E0E0E0';
    LP_header.style.background = '#745db3';
    LP_header.style.color = '#E0E0E0';
    complete_header.style.background = '#745db3';
    complete_header.style.color = '#E0E0E0';

    body.style.setProperty('--bullet_bg', '#745db3');
    body.style.setProperty('--bullet_border', '#745db3');
    body.style.setProperty('--bullet_color', '#E0E0E0');
    body.style.setProperty('--entry_label_color', '#000000');

    editor.style.background = '#745db3';
    editor.style.borderColor = '#745db3';
    editor.style.color = '#E0E0E0';
    editor_text.style.background = '#282828';
    editor_text.style.borderColor = '#282828';
    editor_text.style.color = '#E0E0E0';
    document.getElementById('entry_date').style.color = '#000000';
    document.getElementById('select2').style.color = '#000000';

    document.getElementById('archive_header_text').style.color = '#E0E0E0';

    change_icon_color("white");

    update_search_modal_colors("dark", "dark");
    update_faq_modal_colors("dark", "dark");
    update_edit_modal_colors("dark", "dark");
});

//Coffee theme
document.getElementById('color7').addEventListener('click', function () {
    localStorage.setItem("color", "7");

    body.style.background = '';
    header.style.background = 'rgb(209, 174, 143)';
    curr_date.style.background = 'rgb(238, 223, 203)';
    curr_date.style.color = '';
    header.style.color = '';
    HP_header.style.background = 'rgb(238, 223, 203)';
    HP_header.style.color = '';
    LP_header.style.background = 'rgb(238, 223, 203)';
    LP_header.style.color = '';
    complete_header.style.background = 'rgb(238, 223, 203)';
    complete_header.style.color = '';

    body.style.setProperty('--bullet_bg', 'rgb(243, 240, 235)');
    body.style.setProperty('--bullet_border', 'rgb(243, 240, 235)');
    body.style.setProperty('--bullet_color', '');
    body.style.setProperty('--entry_label_color', '');

    editor.style.background = 'rgb(238, 223, 203)';
    editor.style.borderColor = 'rgb(209, 174, 143)';
    editor.style.color = '';
    editor_text.style.background = 'rgb(255, 245, 232)';
    editor_text.style.borderColor = 'rgb(255, 245, 232)';
    editor_text.style.color = '';
    document.getElementById('entry_date').style.color = '#000000';
    document.getElementById('select2').style.color = '#000000';

    document.getElementById('archive_header_text').style.color = '';

    change_icon_color("black");

    update_search_modal_colors("light", "light");
    update_faq_modal_colors("light", "light");
    update_edit_modal_colors("light", "light");
});

/*
    Change Icon to black/white to match the color theme
*/
function change_icon_color(icon_color) {
    if (icon_color == 'white') {
        document.getElementById("clear").style.filter = 'invert(90%)';
        document.getElementById("search_on").style.filter = 'invert(90%)';
        document.getElementById("search_off").style.filter = 'invert(90%)';
        document.getElementById("archive").style.filter = 'invert(90%)';
        document.getElementById("FAQ").style.filter = 'invert(90%)';
        document.getElementById("edit").style.filter = 'invert(90%)';
        document.getElementById("close").style.filter = 'invert(90%)';

        body.style.setProperty('--bullet_icon_filter', 'invert(90%)');

        document.getElementById("clear_archive").style.filter = 'invert(90%)';
    } else {
        document.getElementById("clear").style.filter = 'none';
        document.getElementById("search_on").style.filter = 'none';
        document.getElementById("search_off").style.filter = 'none';
        document.getElementById("archive").style.filter = 'none';
        document.getElementById("FAQ").style.filter = 'none';
        document.getElementById("edit").style.filter = 'none';
        document.getElementById("close").style.filter = 'none';

        body.style.setProperty('--bullet_icon_filter', 'none');

        document.getElementById("clear_archive").style.filter = 'none';
    }
}

/*
    Changes search modal colors to match the color theme
*/
function update_search_modal_colors(background_shade, header_shade) {
    if (background_shade == "light") {
        document.getElementsByClassName("modal-body")[0].style.color = "#000000";
    } else {
        document.getElementsByClassName("modal-body")[0].style.color = "#E0E0E0";
    }

    if (header_shade == "light") {
        document.getElementsByClassName("close")[0].style.filter = "none";
    } else {
        document.getElementsByClassName("close")[0].style.filter = "invert(90%)";
    }

    document.getElementsByClassName("modal-header")[0].style.background = header.style.background;
    document.getElementsByClassName("modal-header")[0].style.color = header.style.color;

    document.getElementsByClassName("modal-body")[0].style.background = body.style.background;
    document.getElementById("start_day").style.color = "#000000";
    document.getElementById("end_day").style.color = "#000000";
    document.getElementById("select_search").style.color = "#000000";

    document.getElementsByClassName("modal-footer")[0].style.background = header.style.background;
    document.getElementById("search_submit").style.background = curr_date.style.background;
    document.getElementById("search_submit").style.borderColor = curr_date.style.background;
    
    if (header.style.color == "" && curr_date.style.color == "" && curr_date.style.background != "") {
        document.getElementById("search_submit").style.color = "#000000";
    } else {
        document.getElementById("search_submit").style.color = curr_date.style.color;
    }
}

/*
    Changes faq modal colors to match the color theme
*/
function update_faq_modal_colors(background_shade, header_shade) {
    if (background_shade == "light") {
        document.getElementsByClassName("modal-body")[1].style.color = "#000000";
        for (var i = 0; i < 11; i++) {
            if (i != 9) {
                document.getElementsByClassName("faq_image")[i].style.filter = "none";
            }
        }
    } else {
        document.getElementsByClassName("modal-body")[1].style.color = "#E0E0E0";
        for (var i = 0; i < 11; i++) {
            if (i != 9) {
                document.getElementsByClassName("faq_image")[i].style.filter = "invert(90%)";
            }
        }
    }

    if (header_shade == "light") {
        document.getElementsByClassName("close")[1].style.filter = "none";
    } else {
        document.getElementsByClassName("close")[1].style.filter = "invert(90%)";
    }

    document.getElementsByClassName("modal-header")[1].style.background = header.style.background;
    document.getElementsByClassName("modal-body")[1].style.background = body.style.background;
    document.getElementsByClassName("modal-footer")[1].style.background = header.style.background;

    document.getElementById('clear_message').style.color = 'red';
}

/*
    Changes edit modal colors to match the color theme
*/
function update_edit_modal_colors(background_shade, header_shade) {
    if (header_shade == "light") {
        document.getElementsByClassName("close")[2].style.filter = "none";
    } else {
        document.getElementsByClassName("close")[2].style.filter = "invert(90%)";
    }

    document.getElementsByClassName("modal-header")[2].style.background = header.style.background;
    document.getElementsByClassName("modal-header")[2].style.color = header.style.color;

    document.getElementsByClassName("modal-body")[2].style.background = body.style.background;
    document.getElementById("textarea").style.background = body.style.getPropertyValue('--bullet_bg');
    document.getElementById("textarea").style.borderColor = body.style.getPropertyValue('--bullet_border');
    document.getElementById("textarea").style.color = body.style.getPropertyValue('--bullet_color');

    document.getElementsByClassName("modal-footer")[2].style.background = header.style.background;
    document.getElementById("save_edits").style.background = curr_date.style.background;
    document.getElementById("save_edits").style.borderColor = curr_date.style.background;
    if (header.style.color == "" && curr_date.style.color == "" && curr_date.style.background != "") {
        document.getElementById("save_edits").style.color = "#000000";
    } else {
        document.getElementById("save_edits").style.color = curr_date.style.color;
    }
}

/*
    Loads user's saved color theme upon reloading the page
*/
document.addEventListener('DOMContentLoaded', function () {
    let color_scheme = localStorage.getItem("color");
    const event = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true
    });

    let theme_button;
    let first_time = localStorage.getItem("first_time");
    
    if (!first_time) {
        localStorage.setItem("first_time", "1");
        theme_button = document.getElementById('color1');
        theme_button.dispatchEvent(event);
    } else {
        if (color_scheme == "1") {
            theme_button = document.getElementById('color1');
            theme_button.dispatchEvent(event);
        } else if (color_scheme == "2") {
            theme_button = document.getElementById('color2');
            theme_button.dispatchEvent(event);
        } else if (color_scheme == "3") {
            theme_button = document.getElementById('color3');
            theme_button.dispatchEvent(event);
        } else if (color_scheme == "4") {
            theme_button = document.getElementById('color4');
            theme_button.dispatchEvent(event);
        } else if (color_scheme == "5") {
            theme_button = document.getElementById('color5');
            theme_button.dispatchEvent(event);
        } else if (color_scheme == "6") {
            theme_button = document.getElementById('color6');
            theme_button.dispatchEvent(event);
        } else if (color_scheme == "7") {
            theme_button = document.getElementById('color7');
            theme_button.dispatchEvent(event);
        }
    }

    document.getElementById('clear').addEventListener('click', function() {
        theme_button = document.getElementById('color1');
        theme_button.dispatchEvent(event);
    });
});
