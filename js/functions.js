/**
 * Created by jpass on 07.09.2015.
 */
// Scripted By Justine Paß
// http://www.youtube.com/watch?v=c_ohDPWmsM0
//Memory Karten als Array

var field = getField();
var memory_array = new Array;
for(var i=1; i<=field; i++){
    memory_array.push('../img/'+i+'.jpg');
    memory_array.push('../img/'+i+'.jpg');
}
//var memory_array = loadFromDir();
var memory_values = [];
var memory_tile_ids = [];
var tiles_flipped = 0;
Array.prototype.memory_tile_shuffle = function(){
    var i = this.length, j, temp;
    while(--i > 0){
        j = Math.floor(Math.random() * (i+1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
}

function newBoard(){
    tiles_flipped = 0;
    var output = '';
    memory_array.memory_tile_shuffle();
    for(var i = 0; i < memory_array.length; i++){
        output += '<div class="fliped" id="tile_'+i+'" onclick="memoryFlipTile(this,\''+memory_array[i]+'\')"></div>';
    }
    document.getElementById('memory_board').innerHTML = output;
}
function loadFromDir(){
    var dir = "../img/";
    var fileextension = ".jpg";
    var result = new Array();
    $(url("../img/")).each(function (index){
       alert(index)
    });
    return result;
}

function getField(){
    var Eingabe = 2;

    while(true) {
        Eingabe = window.prompt("Mit wie vielen verschiedenen Karten wollen Sie spielen?", "4");

        if(Eingabe > 12 || Eingabe < 1){
            alert("Ihre Eingabe ist fehlerhaft. Bitte versuchen Sie es erneut\n\t- Mehr als 0 und weniger als 13 Bilder\n\t- Nur Zahlen eingeben");
        }
        else{
            break;
            return parseInt(Eingabe);
        }
    }
    return Eingabe;
}

function memoryFlipTile(tile,val){
    if(tile.innerHTML == "" && memory_values.length < 2){
        tile.style.background = '#B0C4DE';
        tile.innerHTML = '<img src="'+val+'" />';
        if(memory_values.length == 0){
            memory_values.push(val);
            memory_tile_ids.push(tile.id);
        }
        else if(memory_values.length == 1){
            memory_values.push(val);
            memory_tile_ids.push(tile.id);
            if(memory_values[0] == memory_values[1]){
                tiles_flipped += 2;
                // Clear both arrays
                memory_values = [];
                memory_tile_ids = [];
                // Check to see if the whole board is cleared
                if(tiles_flipped == memory_array.length){
                    cdialog();
                    //alert("Sehr Gut! Sie haben es geschaft. Die Karten werden neu gemischt!");
                    //document.getElementById('memory_board').innerHTML = "";
                    //newBoard();
                }
            } else {
                function flip2Back(){
                    // Flip the 2 tiles back over
                    var tile_1 = document.getElementById(memory_tile_ids[0]);
                    var tile_2 = document.getElementById(memory_tile_ids[1]);
                    tile_1.style.background = 'url(../img/bg.jpg) no-repeat';
                    tile_1.innerHTML = "";
                    tile_2.style.background = 'url(../img/bg.jpg) no-repeat';
                    tile_2.innerHTML = "";
                    // Clear both arrays
                    memory_values = [];
                    memory_tile_ids = [];
                }
                //Counts the failed tries
                $('#trys').text( parseInt($('#trys').text())+1);
                setTimeout(flip2Back, 700);
            }
        }
    }
}

function cdialog(){
    alert("Purer Erfolg! Sie haben "+$('#time').text()+ " Sekunden und " + $('#trys').text() + " Fehlversuche benötigt")
    if(confirm("Wollen Sie noch einmal spielen?")){
        document.getElementById('memory_board').innerHTML = "";
        location.reload();
    }
}