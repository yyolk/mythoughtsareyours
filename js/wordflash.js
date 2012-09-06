/* 
Joseph Chiocchi

Word Flash

Description:
    Takes some text, and flashes one word at a time to the screen.
*/

var text = $("#ccontent").text();
var countmax;
var c=0;

function wordr(){
    splt = text.split(" ");
    countmax = splt.length;
        if(c%2===0){
          $('body, #back').css('background-color','white');
          $('body, #back').css('color','black');
        }else{
            $('body, #back').css('background-color','black');
            $('body, #back').css('color','white');
        }      
    $("#wordflash").text(splt[c]);

    c=c+1;
    if (c>countmax)
        c=0;
    setTimeout("wordr()", 250);


}


wordr();
