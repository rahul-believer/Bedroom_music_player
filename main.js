

let audioPlayer = document.querySelector(".music_player");
let label = document.querySelector(".whats_playing");
let form = document.querySelector(".search-form");
let grid = document.querySelector(".grid");
let searchResults = document.getElementById("search_results");



form.onsubmit = function onSubmit() {
  event.preventDefault();
  searchSoundCloud(form.search.value);
};



function searchSoundCloud(song){
  fetch("http://api.soundcloud.com/tracks/?client_id=095fe1dcd09eb3d0e1d3d89c76f5618f&q=" + song)
  .then(function(response){
    response.json().then(function(data){
    let searchItems = data;
    let songs = "";
    let artist = form.search.value;

    console.log(searchItems);

    for(let i=0;i<searchItems.length;i++){
      //t300x300 make artwork pics bigger?
      if(searchItems[i].artwork_url !== null){
      songs += "<div class='grid-cell'>";
      songs += "<img src=" + searchItems[i].artwork_url + " class='artwork'";
      songs += "id='" + searchItems[i].id + "'><br>";
      songs += "<span class='songTitle'>";
      songs += searchItems[i].title + "</span><br>";
      songs += "<span class='artist'>";
      songs += artist.toUpperCase() + "</span></div>";
      }else{
        songs += "<div class='grid-cell'>";
        songs += "<img src='noartwork.jpg'  class='artwork'";
        songs += "id='" + searchItems[i].id + "'><br>" ;
        songs += "<span class='songTitle'>";
        songs += searchItems[i].title + "</span><br>";
        songs += "<span class='artist'>";
        songs += artist.toUpperCase() + "</span></div>";
        }
      }
      grid.innerHTML = songs;
    });
  });

}


searchResults.addEventListener('click',function(e){
  console.log(e.target.id);
  if(e.target && e.target.matches("img.artwork")){
  let str_uri = "https://api.soundcloud.com/tracks/" + e.target.id + "/stream?client_id=095fe1dcd09eb3d0e1d3d89c76f5618f";
  audioPlayer.src = str_uri;
  audioPlayer.autoplay = true;
  label.innerHTML = "<p><strong>Now playing: " + e.target.alt + "</strong></p>";
  }
});




//Widget

// SC.initialize({
//   client_id: '095fe1dcd09eb3d0e1d3d89c76f5618f'
// });

// var track_url = 'https://soundcloud.com/forss/flickermood';
// SC.oEmbed(track_url, { auto_play: true }).then(function(oEmbed) {
//   console.log('oEmbed response: ', oEmbed);
// });