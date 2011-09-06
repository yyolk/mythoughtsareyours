$(function(){
    spectrum();

    function spectrum(){
        var colr = Math.floor(Math.random()*256);
        var icolr = 255 - colr >> 0;
        var hue = 'rgb(' + colr + ',' + colr + ',' + colr + ')';
            var ihue = 'rgb(' + icolr + ',' + icolr + ',' + icolr +  ')';
            $('body').animate( { backgroundColor: hue }, 3000);
            $('header').animate( { color: ihue } , 3000);
            $('.post').animate( { color: ihue }, 3000);
            $('#YOLK').animate({color: ihue, borderBottomColor: ihue}, 3000);
            setTimeout("",1000);
            spectrum();
            }
            
            });


