$(document).ready(function(){
    

    $('#textToFind').keyup(()=>{
        if($('#textToFind').val().length > 1){
            $('#wrapper').html('');
            $('#textToFind').css('border', '1px solid black');
            chaim.getPlaylists(search);
            
            console.log('Two or bigger')

        }else{
            //Pequeno
            $('#textToFind').css('border', '1px solid red');
            appendPlaylists();
        }
    });


/*     $('#textToFind').blur(()=>{
        $('#textToFind').css('border', '1px solid black');
        $('#textToFind').val('');
    }); */

    function search(textShot){
        console.table(textShot);
        var desiredList = $('#textToFind').val();
        $.each(textShot, function (key, value){
            if(value.name.search(desiredList) !=-1){
                var thePlaylistToFind = [];
                thePlaylistToFind.push(value);
                renderData(thePlaylistToFind);
                console.log("Value.name"+value.name);
                
            }
            console.log(thePlaylistToFind);
        });

    }
















});