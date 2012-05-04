/* 
Joseph Chiocchi

Word Flash

Description:
    Takes some text, and flashes one word at a time to the screen.
*/

var text = $("#ccontent").text();
var countmax;
var c=0;

wordr();

function wordr(){
    splt = text.split(" ");
    countmax = splt.length;
    $("#wordflash").text(splt[c]);
    c=c+1;
    if (c>countmax)
        c=0;
    setTimeout("wordr()", 250);
}
