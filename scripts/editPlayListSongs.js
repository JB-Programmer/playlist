$(document).ready(function(){
            //Clicking on update Playlist Songs Button
            //Clicking on update Playlist Songs Button
            $('#editPlaylistSongsNow').click(function(){ 
                //$.modal.close();
                    $('.playlistNewSongs').each(function(){
                        var values = $(this).serializeArray();
                        //console.log(values);
                        var songsPackage = {};
                                     
                        for(var i = 0; i<values.length; i++){
                            songsPackage[values[i]['name']] = values[i]['value'];
                        }
                
                        if(songsPackage.name!=='' && songsPackage.url !==''){
                            songsNewList.push(songsPackage);
                        }

                        //console.log(songsNewList);
                
                    });

            });
})