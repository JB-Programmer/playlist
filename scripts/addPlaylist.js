$(document).ready(function(){

    function addPlaylist(){
        $.modal.close();

        var songsNewList=[];
        
        $('.secondCreateZone').each(function(){
            var values = $(this).serializeArray();
            console.log(values);
            var package = {};
    
            for(var i = 0; i<values.length; i++){
                package[values[i]['name']] = values[i]['value'];
            }
    
            if(package.name!=='' && package.url !==''){
                songsNewList.push(package);
            }
    
    
        }); 


        console.log("This is the Array of songs");
        console.log(songsNewList);
       

        var playlistInfo = {
            "name":$('#newPlaylistName').val(),
            "image":$('#newPlaylistImage').val(),
            "songs": songsNewList
            
        }

        console.log("This is the package");
        console.log(playlistInfo);
        
    
        chaim.createPlaylist(playlistInfo, appendPlaylists);
        clearModal();
/*         function listing(){
            console.log("PLAYLIST SUCCESSFULLY ADDED");
        }
    
        appendPlaylists(); */
        
    
    }

    function validation(){
        return true;
    }

    $('#createListNow').click(addPlaylist);

/*     $('#createListNow').click(function(){
        if(validation()){
            $('#formatError').html('');
            addplaylist();

        }else {
            $('#formatError').html('<div class="error">Please insert a valid mp3 url</div>')
        }


    }); */

        function clearModal(){
            $('.secondCreateZone input').val('');
            $('#addPlaylist input').val('');
            $('#imageView').css('background', '');
        }
    
    
    $('#newPlaylistImage').blur(previewImage);





})

function previewImage(){
    $('#imageView').css('background-image', 'url(' + $('#newPlaylistImage').val() + ')');

}

