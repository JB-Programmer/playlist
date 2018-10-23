//Show the modal
function editPlaylist(id){
    $('#editPlaylistModal').modal();
    chaim.getPlaylist(fillEditModal, id);
    

       
}


//Fill the modal with actual values and add functionality to button
function fillEditModal(thelist){
    idWorkingNow = thelist.id;
    $('#editPlaylistModal #playlistName').val(thelist.name);
    $('#editPlaylistModal #newImage').val(thelist.image);
    $('#editPlaylistNow').click(function(){
        console.log("New object to update");
        console.log(newPlaylistData);
        let newName = $('#playlistName').val();
        let newImage = $('#newImage').val();
        var newPlaylistData = {
            "name":  newName,
            "image": newImage,
        }
        chaim.updatePlaylist(idWorkingNow, newPlaylistData);
       
    });

    setTimeout(appendPlaylists, 1000);

    
   
   
}





