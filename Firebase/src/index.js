function splashScreen(){
    window.location = "../../index.html";
}

function mainMenu(address){
    window.location = address;
}

function startGame(levelname){
    if (levelname === 'level1.1'){
        window.location = "Level11.html";
    }
    else if (levelname === 'level2.1'){
        window.location = "Level21.html";
    }
    else if (levelname === 'level3.1'){
        window.location = "Level31.html";
    }
    else{
        alert(levelname + " is coming soon!");
    }
}

function levelSelect(){
    window.location = "LevelSelect.html";
}

function controlsMenu(){
    window.location = "ControlsMenu.html";
}

function aboutMenu(){
    window.location = "AboutMenu.html";
}

function showStaff(staffname){
    document.getElementById(staffname).style.display ='block';
}

function hideStaff(staffname){
    document.getElementById(staffname).style.display ='none';
}