var idToPlay;
var songsOfThisList;
var songsArray = [];
var playingIndex;
var songPlaying='';
var songsNewList=[];

//Este commentario es para esto
$(document). ready(function(){
    $('#playerContain').html(`
        <div class="col-md-10 col-md-offset-2 col-xs-12 startHidden" id="theplayer">
                
            <div class="col-md-7 col-xs-12" id="playerincontrols">

                <div class="col-md-6 col-xs-12" id="rotatingImgContainer">
                    <i style="" class="glyphicon glyphicon-music" title="Play" id="playFullList"></i>
                </div>

                <div class="col-md-6 col-xs-12" id="playerbox">
                    <audio src="" id="myAudio" controls preload="none">
                        <!--<source id="myAudioSource" src='' type="audio/mpeg">--> <!-- After searching in lots of websites I discovered that there is a promise issue with audios when the src is here, so i used the posibility of inserting into <audio> tag. -->
                    </audio>
                    <div id="now">
                        <span class="glyphicon glyphicon-music"></span><span id="listeningNow"></span>
                    </div>
                    
                    <div id="playerList">
                    </div>
                </div>

            </div>

            <div class="col-md-5 col-xs-12" id="playeroutcontrols">

                <div>                
                    <i class="glyphicon glyphicon-trash" title="Close" id="deletePL" data-idplaying=''></i>
                </div>
                
                <div>
                <a href="#editTheSongs" rel="modal:open"><i class="glyphicon glyphicon-pencil" title="Edit songs of this list" id="editplaylistsongs"></i></a>
                
                </div>
                
            </div>


        </div>`);

        //Click on Play Button of any of the playlists: display player, get id, get image
        $('.playnow').click(function(e){
            //Get ID AND APPEND SONGS
            idToPlay = undefined;
            idToPlay = ($(this).closest('.circle').attr('id'));
            $('.maincirclecontent').removeClass('currentCircle');
            $(this).closest('.maincirclecontent').addClass('currentCircle');
            $('#playerContain').css('display','block');
            chaim.getPlaylistSongs(appendSongs, idToPlay);
            if ( $( "#theplayer:first" ).is( ":hidden" ) ) {
                $( "#theplayer" ).slideDown( "slow" );
              } else {
               console.log("It is already out");
            }
            $('#rotatingImgContainer').removeClass('spinMode');
            setTimeout(function(){
                $('#rotatingImgContainer').addClass('spinMode');
            }, 1000);

            
            
            //SET BACKGROUND URL
            bg_url = $(this).closest('.maincirclecontent').css('background-image');
            bg_url = /^url\((['"]?)(.*)\1\)$/.exec(bg_url);
            bg_url = bg_url ? bg_url[2] : ""; // If matched, retrieve url, otherwise ""

            $('#deletePL').attr('data-idplaying', idToPlay);
            $('#rotatingImgContainer').css('background-image', 'url(' + bg_url + ')');


        });


        //Append song names with icon to the player list song
        function appendSongs(playlist){
            $('#playerList').html('');
            songsOfThisList=[];
            songsOfThisList = playlist.songs;
            //console.log("Esto es songs of this list" + songsOfThisList);
            songsArray=[];
            for(song of songsOfThisList){
                console.log(song.name);
                
                $('#playerList').append(`<p><span data-index='`+songsOfThisList.indexOf(song)+`' data-song='`+ song.url+ `'><i class="glyphicon glyphicon-play"></i>`+song.name+`</span></p>`);
                songsArray.push(song.name);
            }

            //Start playing  the first one
            songPlaying =songsOfThisList[0].url;
            var audio = document.getElementById('myAudio');
            audio.src= songPlaying;
            audio.play();
            $('#listeningNow').html(songsOfThisList[0].name);
            //console.log("This is the songsArray: " + songsArray);
            functionalityToList();
        }
        
        

        function functionalityToList(){
            $('#playerList span').click(function(){
                playingIndex = $(this).attr('data-index');
                playingIndex = parseInt(playingIndex);
                //console.log(songsOfThisList[playingIndex].url);
                songPlaying =songsOfThisList[playingIndex].url;
                $('#listeningNow').text(songsOfThisList[playingIndex].name);
                var audio = document.getElementById('myAudio');
                audio.src= songPlaying;
                audio.play();
            });

            var audio = document.getElementById('myAudio');
            
           //Middle big play button functionality
            $('#playFullList').click(changeStatus);

            function changeStatus(){
                if(!audio.paused){
                    console.log('Audio was playing');
                    audio.pause();
                    $("#playFullList").removeClass('glyphicon-pause');
                    $("#playFullList").addClass('glyphicon-play');
                    $('#rotatingImgContainer').removeClass('spinMode');
                    
                }else{            
                    console.log('Audio was paused');
                    audio.play();

                    $("#playFullList").removeClass('glyphicon-play');
                    $("#playFullList").addClass('glyphicon-pause');
                    $('#rotatingImgContainer').addClass('spinMode');


                }
            }

            audio.onended = function(){


                //Play next song (if exists)
                if(playingIndex < songsOfThisList.length - 1){
                    //console.log('Audio Ended');
                    var audio = document.getElementById('myAudio');
                    playingIndex++;
                    //console.log(songPlaying);
                    //console.log("Next playIndex: " + playingIndex);
                    songPlaying =songsOfThisList[playingIndex].url;
                    audio.src= songPlaying;
                    audio.load();
                    audio.play();
                    $('#listeningNow').text(songsOfThisList[playingIndex].name);
            
                }else{
                    playingIndex = 0;

                }


           }


            
            $('#deletePL').click(function(){
                deletePlaylist(idToPlay);
            });

            //Edit Playlist Songs Button Functionality
            $('#editplaylistsongs').click(function(){
                //console.log("Edit list has been clicked");
                //console.table(songsOfThisList);
                $('#editTheSongs').html('');
                $('#editTheSongs').append('<h2>Edit Playlist Songs</h2><div id="songsContainer">')

                for(song of songsOfThisList){
                    //console.log(song.name);
                    $('#editTheSongs').append(`

                    <form action="" class="playlistNewSongs">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group form-group-sm">
                                    <label for="name" class="control-label">Song Name</label>
                                    <input type="text" class="form-control" name="name" value="`+song.name+`">
                                </div>
                            </div>
                            <div class="col-md-6">
                                    <div class="form-group form-group-sm">
                                        <label for="url" class="control-label">Song Url (mp3 format)</label>
                                        <input type="text" class="form-control" name="url" value="`+song.url+`">
                                    </div>
                            </div>
                        </div>
                     </form>
   
                    `);
                                  
                }

                $('#editTheSongs').append(`
                <div id="newSongs">
                </div>
                <div class="row">
                    <div class="col-xs-5">
                        <button type="submit" id="addSongRow" class="btn btn-info">Add Song</button>
                    </div>
                    <div class="col-xs-5">
                        <button type="submit" id="editPlaylistSongsNow" class="btn btn-success">Update playlist info</button>
                    </div>

                </div>
                </div>

                `);

                $('#addSongRow').click(function(){
                    if($('.playlistNewSongs:last-child input[name="name"]').val()==''|| $('.playlistNewSongs:last-child input[name="url"]').val()==''){
                        //console.log('Los Ultimos estan Vacios');
                        $('.playlistNewSongs:last-child input').css('border', '1px solid red');
                       
                    }else{
                        $('#newSongs').append(`
            
                        <form action="" class="playlistNewSongs">
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



                $('#editPlaylistSongsNow').click(function(){ 
                    $.modal.close();
                    
                        $('.playlistNewSongs').each(function(){
                            var values = $(this).serializeArray();
                            console.log(values);
                            var songsPackage = {};
                           
                    
                            for(var i = 0; i<values.length; i++){
                                songsPackage[values[i]['name']] = values[i]['value'];
                            }
                    
                            if(songsPackage.name!=='' && songsPackage.url !==''){
                                songsNewList.push(songsPackage);
                            }
    
                            console.log(songsNewList);
                    
                            var dataSongs = {
                                "songs":songsNewList,
                            };

                            chaim.updateSongs(idToPlay, dataSongs, funcExample);

                        });

                        function funcExample(){
                            alert('Hello');

                        };


    
                });




            });




        }


        

        



}); /* End of document ready */



