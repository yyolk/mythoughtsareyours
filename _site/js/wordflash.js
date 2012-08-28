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
      $("#wordflash").text(splt[c]);
        if(c%2===0){
          $('body').css('background-color','white');
          $('body').css('color','black');
        }else{
            $('body').css('background-color','black');
            $('body').css('color','white');
        }
    c=c+1;
    if (c>countmax)
        c=0;
    setTimeout("wordr()", 250);


}


wordr();
