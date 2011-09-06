$(function(){
    spectrum();

    function spectrum(){
        var colr = Math.floor(Math.random()*256);
        var icolr = colr % 256;
        var hue = 'rgb(' + colr + ',' + colr + ',' + colr + ')';
            var ihue = 'rgb(' + icolr + ',' + icolr + ',' + icolr +  ')';
            $('body').animate( { backgroundColor: hue }, 3000);
            $('header').animate( { color: ihue } , 1000);
            $('post').animate( { color: ihue }, 1000);
            spectrum(); 
            }
            });
