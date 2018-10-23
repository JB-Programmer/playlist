var chaim = new mainPlaylistService();


function mainPlaylistService(){
    this.getPlaylists =  function(callback){
        $.ajax({
            url: "./api/playlist",
            type:"Get",
            contentType: "application/json",
            success: function(resp, status, xhr){
                callback(resp.data);

               
            },
            complete: function(jqXHR, estado){
                console.log("Ajax getPlayLists Has been executed");
            },
            error: function(xhr, estado, error){
                console.log("Error retrieving  playlists: " + error);
            }
        });
    };

    this.getPlaylist =  function(callback, id){
        $.ajax({
            url: "./api/playlist/"+id,
            type:"Get",
            contentType: "application/json",
            success: function(resp, status, xhr){
                callback(resp.data);
            },
            complete: function(jqXHR, estado){
                console.log("Ajax getPlayList has been executed")
            },
            error: function(xhr, estado, error){
                console.log("Error retrieving one playlist: " + error);
            }
        });
    };

    this.getPlaylistSongs =  function(callback, id){
        $.ajax({
            url: "./api/playlist/"+id+"/songs",
            type:"Get",
            contentType: "application/json",
            success: function(resp, status, xhr){
                callback(resp.data);
            },
            complete: function(jqXHR, estado){
                console.log("Ajax getPlayListSongs has been executed");
            },
            error: function(xhr, estado, error){
                console.log("Error retrieving songs of this playlist: " + error);
            }
        });
    };

    this.createPlaylist =  function(playlist, callback){
        $.ajax({
            url: "./api/playlist",
            type:"Post",
            data: playlist,
            success: function(resp, status, xhr){
                callback();
            },
            complete: function(jqXHR, estado){
                console.log("Ajax addPlaylist has been executed");
                
            },
            error: function(xhr, estado, error){
                console.log("Error creating playlist" + error);
            }
        });
    };

    this.updatePlaylist = function (id, info) {
        $.ajax({
            type: "Post",
            url: "./api/playlist/" + id,
            data: info,
            success: function (result, status, xhr) {
                console.log('Playlist updated successfuly');
               
            }
        });
    }

    this.updateSongs = function (id, songs, callback) {
        $.ajax({
            url: "./api/playlist/" + id + "/songs",
            type: "Post",
            data: songs,
            success: function (resp, status, xhr) {
                callback();
            },
            complete: function(jqXHR, estado){
                console.log("Ajax updateSongs has been executed");
            },
        });
    };

    this.deletePlaylist = function (id, callback) {
        $.ajax({
            url: "./api/playlist/" + id,
            type: "Delete",
            success: function (resp, status, xhr) {
                callback();
                appendPlaylists();
           },
           complete: function(jqXHR, estado){
               console.log("Ajax deletePlaylist has been executed");
           },
        });
    };

}



//Get All The lists WORKS!
/* chaim.getPlaylists(renderData);


function renderData(playlists){
    var strplaylists = JSON.stringify(playlists);
    console.log("These are all the -playlists-:<br>" + strplaylists);
} */



/*
//Get one list WORKS!

chaim.getPlaylist(showthelist, 3);

function showthelist(thelist){
    var strthelist = JSON.stringify(thelist);
    console.log("This is -thelist- required by ID="+thelist.id+": " + strthelist);
}


//Getting the songs of playlist number three. WORKS!

chaim.getPlaylistSongs(playlistsongs, 3);

var songsOfThisId;
function playlistsongs(receivedSongs){
    songsOfThisId=receivedSongs;
    console.log("Songs id = 3");
    console.log(receivedSongs);

}


//Add Playlist WORKS!
var newPlaylist = {
    "name": "INSERTANDO PLAYLIST",
    "image": "nohay",
    "songs": [
    {
    "name": "CANCION 1 DE PRUEBA",
    "url": "theurl1"
    },
    ]}

chaim.createPlaylist(newPlaylist, reir);

function reir(){
    console.log("Funciono el agrego, jijijiji");
}


//Update playlist WORKS!

var updateddata = {
        "name": "Name updated by Ajax",
        "image": "http://crestcafeonline.com/wp-content/uploads/2016/05/SAMPLE__get-ready-for-your-espresso.jpg"
    }
chaim.updatePlaylist(2, updateddata);



//updatePlaylistSongs WORKS!!
var updatedSongs = [
        {"name":"song updated with ajax",
         "url":"newurl"
        },
        {"name":"another song updated with ajax",
         "url":"No te la digo"
        }
        ];

var dataSongs = {
    "songs":updatedSongs,
};

chaim.updateSongs(1, dataSongs, reir2);

function reir2(){
    console.log("Songs of playlist 1 has been updated");
}


//Deleting YES!!!!
chaim.deletePlaylist(2, nothing);

function nothing(){
    console.log("After deleting I have nothing to do");
}

 */


