//Get all the playlists
function appendPlaylists(){
    $('#wrapper').html('');
    chaim.getPlaylists(renderData);
}


//Show the playlists in main container
function renderData(playlists){
    for(var item of playlists){
        let id = item.id;
        let name = item.name;
        let imageurl = item.image; 
            $('#wrapper').append(`
                <div class='col-md-2 circle' id='` + id + `'>
                    <span id="circletiteContainer"><h2 class='circletitle'>`+name+`</h2></span>
                    <div class='maincirclecontent' style="background-image: url('`+ imageurl +`'); background-repeat: no-repeat">
                        <div class='circlecontrol'>
                            <i class="glyphicon glyphicon-trash deletelisticon isHidden" title="Delete ` + name + ` from database"></i>
                            <i class="glyphicon glyphicon-pencil editlisticon isHidden" title="Edit ` + name + `"></i>
                        </div>
                        <div class='circlecontrol play'>
                            <span class="playnow"><i class="glyphicon glyphicon-play isHidden" title="Play ` + name + `" id="playlisticon"></i><span>
                        </div>
                        
                   
                     </div><!--Closing maincirclecontent -->

                </div><!--Closing circle -->
            
            
            `);

            //Activate delete list from playlists
            $('.deletelisticon').click(function(){
                   let id = $(this).closest('.circle').attr('id');
                   //console.log("ESte es el id: "+id);
                   deletePlaylist(id);
            });


            //Activate Edit List from playlists
            $('.editlisticon').click(function(){
                var id = $(this).closest('.circle').attr('id');
                var image = $(this).closest('.maincirclecontent').css('background-image');
                console.log("PlaylistData is this: ID" + id + ". NAme: " + name + ". Image: " + image + ".")
                editPlaylist(id);
            });

            $('.circletitle').arctext({radius:110});


            
    }

    $( ".maincirclecontent" ).mouseover(function() {
        $( 'i', this ).removeClass('isHidden');

    });

    $( ".maincirclecontent" ).mouseout(function() {
        $( 'i', this ).addClass('isHidden');

    });


    var strplaylists = JSON.stringify(playlists);
    console.log("These are all the -playlists-:<br>" + strplaylists);
    console.log("Ahora sin stringify");
    console.log(strplaylists);

   

}

appendPlaylists();