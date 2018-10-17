var idToPlay;
var songsOfThisList;
var songsArray = [];
var playingIndex;
var songPlaying='';

//Este commentario es para esto

$(document). ready(function(){
    $('#playerContain').html(`
        <div class="col-md-8 col-md-offset-2 col-xs-12" id="theplayer">
                
            <div class="col-md-9 col-xs-12" id="playerincontrols">
            
                <div class="col-md-6 col-xs-12" id="rotatingImgContainer">
                    <i class="glyphicon glyphicon-play" title="Play" id="closeplayer"></i>
                </div>
                <div class="col-md-6 col-xs-12" id="playerbox">
                    <audio id="audio" controls>
                        <source src='' type="audio/mpeg">
                    </audio>
                    <div id="playerList">
                    </div>

                </div>
            </div>
            <div class="col-md-3 col-xs-12" id="playeroutcontrols">

                <div>                
                    <i class="glyphicon glyphicon-remove" title="Close" id="closeplayer"></i>
                </div>
                <div>
                    <i class="glyphicon glyphicon-pencil" title="Edit" id="editplaylist"></i>
                </div>
            </div>


        </div>`);


        //Click on Play Button of any of the playlists: display player, get id, get image
        $('.playnow').click(function(e){
            //Get ID AND APPEND SONGS
            idToPlay = undefined;
            idToPlay = ($(this).closest('.circle').attr('id'));
            $('#playerContain').css('display','block');
            chaim.getPlaylistSongs(appendSongs, idToPlay);
            
            //SET BACKGROUND URL
            bg_url = $(this).closest('.maincirclecontent').css('background-image');
            bg_url = /^url\((['"]?)(.*)\1\)$/.exec(bg_url);
            bg_url = bg_url ? bg_url[2] : ""; // If matched, retrieve url, otherwise ""

            $('#rotatingImgContainer').css('background-image', 'url(' + bg_url + ')');


           

           
        });

        function appendSongs(playlist){
            $('#playerList').html('');
            songsOfThisList=[];
            songsOfThisList = playlist.songs;
            console.log("Esto es songs of this list");
            console.log(songsOfThisList);
            songsArray=[];
            for(song of songsOfThisList){
                console.log(song.name);
                
                $('#playerList').append(`<p><span data-index='`+songsOfThisList.indexOf(song)+`' data-song='`+ song.url+ `'><i class="glyphicon glyphicon-play"></i>`+song.name+`</span></p>`);
                songsArray.push(song.name);
            }
            console.log("This is the songsArray");
            console.log(songsArray);
            functionalityToList();
        }


        function functionalityToList(){
            $('#playerList span').click(function(){
                console.log($(this).attr('data-index'));
                playingIndex = $(this).attr('data-index');

                console.log(songsOfThisList[playingIndex].url);
                songPlaying =songsOfThisList[playingIndex].url;
                var audio = $('source');
                //vaca = 'http://www.shemtob.org/archivos/5766/6604_051129_El_3er._Matrimonio~28_Jheshvan_5766.mp3';
                audio.attr("src", songPlaying);
                //audio.play();
            });
        }




}); /* End of document ready */



