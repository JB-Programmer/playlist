function deletePlaylist(id){
    $('#deleteConfirmModal').modal();
    $('#confirmDelete').click(function(){
        $.modal.defaults.closeExisting==true;
        $('#wrapper').html('');
        chaim.deletePlaylist(id, appendPlaylists);
        console.log("Playlist " + id + " has been deleted");
        $.modal.close();
    });
    //$('#deleteConfirmModal').addClass(displaynone);
    
}