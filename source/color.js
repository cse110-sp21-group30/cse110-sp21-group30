var body = document.body;
var header = document.querySelector('header');
var curr_date = document.getElementById('dates_grid_item22');
var HP_header = document.getElementById('high_priority_header');
var LP_header = document.getElementById('low_priority_header');
var complete_header = document.getElementById('complete_header');
var editor = document.getElementById('editor');
var editor_text = document.getElementById('editor_text');

document.getElementById('color1').addEventListener('click', function() {
    //default

    //body
    body.style.background = '';

    //header
    header.style.background = '';
    curr_date.style.background = '';
    curr_date.style.color = '';
    header.style.color = '';

    //HP,LP,C headers
    HP_header.style.background = '';
    HP_header.style.color = '';
    LP_header.style.background = '';
    LP_header.style.color = '';
    complete_header.style.background = '';
    complete_header.style.color = '';

    //bullets
    body.style.setProperty('--bullet_bg', '');
    body.style.setProperty('--bullet_border', '');
    body.style.setProperty('--bullet_color', '');
    body.style.setProperty('--entry_label_color', '#000000');

    //editor
    editor.style.background = '';
    editor.style.borderColor = '';
    editor.style.color = '';

    //editor text
    editor_text.style.background = '';
    editor_text.style.borderColor = '';
    editor_text.style.color = '';
    document.getElementById('entry_date').style.color = '';
    document.getElementById('select2').style.color = '';

    //archive
    document.getElementById('archive_header_text').style.color = '';

    //icons ("white" or "black")
    change_icon_color("black");
});

document.getElementById('color2').addEventListener('click', function() {
    //ucsd colors
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
});

document.getElementById('color3').addEventListener('click', function() {
    //slack_dark
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
});

document.getElementById('color4').addEventListener('click', function() {
    //blue
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
});

document.getElementById('color5').addEventListener('click', function() {
    //purple
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
});

document.getElementById('color6').addEventListener('click', function() {
    //bean
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
});

//changes colors of icons
function change_icon_color(icon_color){
    if(icon_color == 'white'){
        document.getElementById("clear").style.filter = 'invert(90%)';
        document.getElementById("search_on").style.filter = 'invert(90%)';
        document.getElementById("search_off").style.filter = 'invert(90%)';
        document.getElementById("archive").style.filter = 'invert(90%)';
        document.getElementById("FAQ").style.filter = 'invert(90%)';
        document.getElementById("edit").style.filter = 'invert(90%)';
        document.getElementById("close").style.filter = 'invert(90%)';

        body.style.setProperty('--bullet_icon_filter', 'invert(90%)');

        document.getElementById("clear_archive").style.filter = 'invert(90%)';
    }else{
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

//changes modal colors
function update_modal_colors(){
    //will do after modals are finished
}
