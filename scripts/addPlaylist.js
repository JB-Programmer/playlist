$(document).ready(function(){
    


    $('#nextStepAdd').click(function(){
        firstStepValidation();
    });

    $('#newPlaylistName, #newPlaylistImage').blur(function(){
       firstStepValidation();
       if(authorized == 0){
            $('#nextStepAdd').click(function(){
                $('#addPlaylist2').modal();
            });

       }
       
    });

    var authorized;

    function firstStepValidation(){
        authorized = 0;
        //PlayListName
        if ($('#newPlaylistName').val().length >= 3) {
            $('#newPlaylistName').removeClass('redBorder');
        } else {
            $('#newPlaylistName').addClass('redBorder');
            authorized++;
        } 
        //Image format
        var regex = new RegExp('([/|.|\w|\s|-])*\.(?:jpg|gif|png)');
    
        if(regex.test($('#newPlaylistImage').val())) {
            $('#newPlaylistImage').removeClass('redBorder');
            previewImage();

        }else{
            console.log('Regex approved');

            $('#newPlaylistImage').addClass('redBorder');
            authorized++;
        }

        //
    }

    function addPlaylist(){
        $.modal.close();
        var songsNewList=[];
        $('.secondCreateZone').each(function(){
            var values = $(this).serializeArray();
            //console.log(values);
            var package = {};
            for(var i = 0; i<values.length; i++){
                package[values[i]['name']] = values[i]['value'];
            }
            if(package.name!=='' && package.url !==''){
                songsNewList.push(package);
            }
        }); 

        //console.log("This is the Array of songs");
        //console.log(songsNewList);
       
        var playlistInfo = {
            "name":$('#newPlaylistName').val(),
            "image":$('#newPlaylistImage').val(),
            "songs": songsNewList
            
        }

        //console.log("This is the package");
        //console.log(playlistInfo);
        chaim.createPlaylist(playlistInfo, appendPlaylists);
        clearModal();     
    
    }

    function validation(){
        return true;
    }

    $('#createListNow').blur(addPlaylist);

    function clearModal(){
        $('.secondCreateZone input[type="text"]').val('');
        $('#addPlaylist input[type="text"]').val('');
        $('#imageView').css('background', '');
    }
    
/*     $('#newPlaylistImage').focus(previewImage);
 */
    $('#addSongRowOnCreateList').click(function(){
        if($('.secondCreateZone:last-child input[name="name"]').val()==''|| $('.secondCreateZone:last-child input[name="url"]').val()==''){
            console.log('Los Ultimos estan Vacios');
            $('.secondCreateZone:last-child input').css('border', '1px solid red');
           
        }else{
            $('#creationSongsZone').append(`

            <form action="" class="secondCreateZone">
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group form-group-sm">
                            <label for="name" class="control-label">Song Name</label>
                            <input type="text" class="form-control" name="name" >
                        </div>
                    </div>
                    <div class="col-md-6">
                            <div class="form-group form-group-sm">
                                <label for="url" class="control-label">Song Url (mp3 format)</label>
                                <input type="text" class="form-control" name="url">
                            </div>
                    </div>
                </div>
             </form>
             `);
        }
       

    });

    $('#cleanForm').click(clearModal);

})


function previewImage(){
    $('#imageView').css('background-image', 'url(' + $('#newPlaylistImage').val() + ')');
}

