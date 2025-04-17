// Import data from data.js
// import { data_sec1, data_sec2 } from '../data.js';

function set_inactive(btn) {
    btn.classList.remove('on');
}
function set_active(btn) {
    btn.classList.add('on');
}

function showSelected() {
    // var video_btns = document.getElementsByClassName('btn-video');
    // for(var i = 0; i < video_btns.length; i++) {
    //     set_inactive(video_btns[i]);
    // }
    // selected_index = Object.keys(fg_options).indexOf(selected_video);
    // set_active(video_btns[selected_index]);

    // var fg_btns = document.getElementsByClassName('btn-fg');
    // for(var i = 0; i < fg_btns.length; i++) {
    //     set_inactive(fg_btns[i]);
    // }
    // selected_index = fg_options[selected_video].indexOf(selected_fg);
    // set_active(fg_btns[selected_index]);

    // var bg_btns = document.getElementsByClassName('btn-bg');
    // for(var i = 0; i < bg_btns.length; i++) {
    //     set_inactive(bg_btns[i]);
    // }
    // selected_index = bg_options[selected_video].indexOf(selected_bg);
    // set_active(bg_btns[selected_index]);

    // section 1: sample
    // var sample_video_btns = document.getElementsByClassName('btn-sample-video');
    // for(var i = 0; i < sample_video_btns.length; i++) {
    //     set_inactive(sample_video_btns[i]);
    // }
    // selected_index = ['sample-easy', 'sample-medium', 'sample-hard'].indexOf(selected_sample_video);
    // set_active(sample_video_btns[selected_index]);

    // // section 2: comparison

    // var comp_video_btns = document.getElementsByClassName('btn-comp-video');
    // for(var i = 0; i < comp_video_btns.length; i++) {
    //     set_inactive(comp_video_btns[i]);
    // }
    // selected_index = ['two-people', 'three-people', 'three-people-family', 'four-people'].indexOf(selected_compare_image);
    // set_active(comp_video_btns[selected_index]);

    // var comp_method_btns = document.getElementsByClassName('btn-comp-method');
    // for(var i = 0; i < comp_method_btns.length; i++) {
    //     set_inactive(comp_method_btns[i]);
    // }
    // selected_index = ['input', 'instmatt', 'sparsemat_hr', 'gm_single_tcvom', 'mgm_stacked_tcvom'].indexOf(selected_compare_method);
    // set_active(comp_method_btns[selected_index]);

    var comparison_sec1_btns = document.getElementsByClassName('btn-sec1');
    for(var i = 0; i < comparison_sec1_btns.length; i++) {
        set_inactive(comparison_sec1_btns[i]);
    }
    selected_index = ['1prompt1story', 'consistory', 'storydiff', 'iclora'].indexOf(selected_compare_method);
    set_active(comparison_sec1_btns[selected_index]);

    // section 3: interpolation
    // var app_btns = document.getElementsByClassName('btn-app-video');
    // for(var i = 0; i < app_btns.length; i++) {
    //     set_inactive(app_btns[i]);
    // }
    // selected_index = ['duck', 'whiteswan', 'sports', 'motorbike'].indexOf(selected_app_video);
    // set_active(app_btns[selected_index]);
}

/* Section 2: Visual comparison with baseline methods and SOTA */

var selected_compare_image = data_sec1[0];
var selected_compare_method = '1prompt1story';
var comp1_path = '';
var comp2_path = '';

function selectExampleSec1(image_id) {
    selected_compare_image = data_sec1[parseInt(image_id)];
    loadComparison('sec1', selected_compare_image, selected_compare_method);
    showSelected();
}

function selectComparedMethod(method) {
    selected_compare_method = method;
    loadComparison('sec1', selected_compare_image, selected_compare_method);
    showSelected();
}

function selectComparisonSec2(image_id) {
    loadComparison('sec2', data_sec2[parseInt(image_id)], 'videostudio');
    showSelected();
}

var selected_compare_method_sec3 = 'instruct';
var selected_compare_image_sec3 = data_sec3[0];
function selectComparisonSec3(image_id) {
    selected_compare_image_sec3 = data_sec3[parseInt(image_id)];
    loadComparisonTable(data_sec3[parseInt(image_id)], selected_compare_method_sec3);
    showSelectedSec3();
}

function selectComparedMethodSec3(method) {
    selected_compare_method_sec3 = method;
    loadComparisonTable(selected_compare_image_sec3, selected_compare_method_sec3);
    showSelectedSec3();
}

function showSelectedSec3() {

    var comparison_sec3_btns = document.getElementsByClassName('btn-sec3');
    for(var i = 0; i < comparison_sec3_btns.length; i++) {
        set_inactive(comparison_sec3_btns[i]);
    }
    selected_index = ['instruct', 'retrieval'].indexOf(selected_compare_method_sec3);
    set_active(comparison_sec3_btns[selected_index]);
}

let method_full_names = {
    '1prompt1story': 'One-Prompt-One-Story (Liu et al., ICLR 2025)',
    'instruct': 'Instruction only',
    'retrieval': 'Instruction + Dynamic exampler',
    'videostudio': 'Video Studio (Long et al., ECCV 2024)',
    'consistory': 'ConsiStory (Tewel et al., TOG 2025)',
    'storydiff': 'StoryDiff (Zhou et al., NeurIPS 2024)',
    'iclora': 'IC-LoRA (Huang et al., arxiv 2024)',
}

function loadComparison(section, selected_data, selected_method) {
    comp1_path = 'images/ours/' + selected_data.image_path + '_concat.jpg';
    comp2_path = 'images/' + selected_method + "/" + selected_data.image_path + '_concat.jpg';

    var img1 = document.getElementById('comparison-img1-' + section);
    var img2 = document.getElementById('comparison-img2-' + section);
    img1.src = comp1_path;
    img2.src = comp2_path;
    img1.style.height = 300 * selected_data.num_frames + 'px';
    img2.style.height = 300 * selected_data.num_frames + 'px';
    var shot_text = document.getElementById('comparison-shot-text-' + section);
    shot_text.style.height = 300 * selected_data.num_frames + 'px';
    shot_text.style.gridTemplateRows = 'repeat(' + selected_data.num_frames + ', 1fr)';
    shot_text.innerHTML = selected_data.shot_text;

    var scene_description = document.getElementById('scene-description-' + section);
    scene_description.innerHTML = selected_data.scene;

    var location_description = document.getElementById('location-description-' + section);
    location_description.innerHTML = selected_data.location;
    
    var character_description = document.getElementById('character-description-' + section);
    character_description.innerHTML = selected_data.character;

    var comparison_caption = document.getElementById('comparison-caption-' + section);
    comparison_caption.innerHTML = method_full_names[selected_method];
}

function loadComparisonTable(selected_data, selected_method) {
    var scene_description = document.getElementById('scene-description-sec3');
    scene_description.innerHTML = selected_data.scene;

    var location_description = document.getElementById('location-description-sec3');
    location_description.innerHTML = selected_data.location_ours;

    var location_description_compared = document.getElementById('location-description-compared-sec3');
    location_description_compared.innerHTML = selected_data["location_" + selected_method];
    
    var character_description = document.getElementById('character-description-sec3');
    character_description.innerHTML = selected_data.character_ours;

    var character_description_compared = document.getElementById('character-description-compared-sec3');
    character_description_compared.innerHTML = selected_data["character_" + selected_method];
    
    var shot_text = document.getElementById('comparison-shot-text-sec3');
    shot_text.style.height = 250 * selected_data.num_frames + 'px';
    shot_text.style.gridTemplateRows = 'repeat(' + selected_data.num_frames + ', 1fr)';
    shot_text.innerHTML = selected_data.shot_text_ours;

    var shot_text_compared = document.getElementById('comparison-shot-text-compared-sec3');
    shot_text_compared.style.height = 250 * selected_data.num_frames + 'px';
    shot_text_compared.style.gridTemplateRows = 'repeat(' + selected_data.num_frames + ', 1fr)';
    shot_text_compared.innerHTML = selected_data["shot_text_" + selected_method];

    let comp1_path = 'images/ours/' + selected_data.image_path + '_concat.jpg';
    let comp2_path = 'images/' + selected_method + "/" + selected_data.image_path + '_concat.jpg';
    var img1 = document.getElementById('comparison-img1-sec3');
    var img2 = document.getElementById('comparison-img2-sec3');
    img1.src = comp1_path;
    img2.src = comp2_path;
    img1.style.height = 250 * selected_data.num_frames + 'px';
    img2.style.height = 250 * selected_data.num_frames + 'px';

    var comparison_caption = document.getElementById('comparison-caption-sec3');
    comparison_caption.innerHTML = method_full_names[selected_method];
}

function toggleCollapse(id) {
    var content = document.getElementById(id);
    var icon = document.getElementById('collapse-icon-' + id);
    
    if (content.style.display === "block") {
      content.style.display = "none";
      icon.className = "fa fa-chevron-right";
    } else {
      content.style.display = "block";
      icon.className = "fa fa-chevron-down";
    }
  }