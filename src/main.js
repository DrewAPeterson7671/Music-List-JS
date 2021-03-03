import { MusicDB, Artist, Album } from './music-artist.js';
import $ from 'jquery';
import './css/styles.css';

function showArtist(artistId) {
  currentDisplayArtistId = artistId;
  const artistElement = newDb.findArtistIndex(artistId);
  $(".show-artist-name").html(newDb.artists[artistElement].artist);
  $(".show-artist-genre").html(newDb.artists[artistElement].artistGenre);
  let buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" + + newDb.artists[artistElement].artistId + ">Delete Artist</button>");
  buttons.append("<button class='showAlbums' id=" + + newDb.artists[artistElement].artistId + ">Hide Albums</button>");
  buttons.append("<button class='addAlbums' id=" + + newDb.artists[artistElement].artistId + ">Add Album</button>");
}

function displayArtistList() {
  let artistList = $("ul#artists");
  let htmlForArtists = "";
  newDb.sortArtistsAlpha();
  newDb.artists.forEach(function(artist) {
    htmlForArtists += "<li id=" + artist.artistId + ">" + artist.artist + "</li>";
  });
  artistList.html(htmlForArtists);
}

function showAlbum(artistId) {
  let albumDisplay = $("ul#show-albums");
  let albumListDisplays = newDb.findAlbumList(artistId);
  let htmlForAlbums = "";
  albumListDisplays.forEach(function(albumListDisplay) {
    htmlForAlbums += "<li id=" + albumListDisplay.albumId + ">" + albumListDisplay.albumName + "</li>";
  });
  albumDisplay.html(htmlForAlbums);
}

function showAlbumDetails(albumId) {
  const albumDetail = newDb.findAlbum(albumId);
  $(".show-album-name").html(albumDetail.albumName);
  $(".show-album-year").html(albumDetail.albumYear);    
  $(".show-album-genre").html(albumDetail.albumGenre);  
  $(".show-album-type").html(albumDetail.albumType);
  let albumButtons = $("#albumButtons");
  albumButtons.empty();
  albumButtons.append("<button class='deleteAlbumButton' id=" + + albumDetail.albumId + ">Delete Album</button>");
  albumButtons.append("<button class='showAlbumDetail' id=" + + albumDetail.albumId + ">Hide Album Details</button>");
}

function attachArtistListeners() {
  $("#home-nav").on("click", function() {
    $(".alphabet-index").hide();
    $(".artists-list").hide();
    $(".add-artist").hide();
    $("#show-artist").hide();
    $(".artist-detail").hide();
    $("#show-album-details").hide();
  });
  $("#artists-nav").on("click", function() {
    $(".alphabet-index").show();
    $(".artists-list").show();
    $(".add-artist").show();
    $(".artist-detail").hide();
    $("#show-album-details").hide();
  });
  $("#artist-nav").on("click", function() {
    $(".add-artist").hide();
    $(".alphabet-index").hide();
    if (!currentDisplayArtistId) {
      $(".artists-list").show();
      return;
    }
    $(".artists-list").hide();
    $(".artist-detail").show();
    currentAlbumDisplay? $("#show-album-details").show() : $("#show-album-details").hide();
    showArtist(currentDisplayArtistId);
    showAlbum(currentDisplayArtistId);
  });
  $("#artist-album-nav").on("click", function() {
    $(".add-artist").hide();
    if (!currentDisplayArtistId) {
      $(".artists-list").show();
      $(".artist-detail").hide();
      $("#show-album-details").hide();
      return;
    }
    $(".alphabet-index").hide();
    $(".artists-list").hide();
    $(".artist-detail").hide();
    $("#show-album-details").hide();
    showAlbumDetails(this.id);
    showArtist(currentDisplayArtistId);
    showAlbum(currentDisplayArtistId);
  });
  $("ul#artists").on("click", "li", function() {
    $(".add-artist").hide();
    $(".artists-list").hide();
    $(".alphabet-index").hide();
    $(".artist-detail").show();
    $("#show-albums").show();
    showArtist(this.id);
    showAlbum(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    newDb.deleteArtist(this.id);
    $(".artist-detail").hide();
    $("#show-albums").hide();
    $("#show-album-details").hide();
    $(".artists-list").show();
    displayArtistList();
    currentDisplayArtistId = "";
  });
  $("#buttons").on("click", ".showAlbums", function() {
    $("#show-albums").toggle();
    showAlbum(this.id);
  });
  $("#buttons").on("click", ".addAlbums", function() {
    $("#show-add-albums").toggle();
  });
  $("ul#show-albums").on("click", "li", function() {
    showAlbumDetails(this.id);
    currentAlbumDisplay = true;
    $("#show-album-details").show();
  });
  $("#albumButtons").on("click", ".showAlbumDetail", function() {
    $("#show-album-details").hide();
    currentAlbumDisplay = false;
  });
  $("#albumButtons").on("click", ".deleteAlbumButton", function() {
    $("#show-album-details").hide();
    newDb.deleteAlbum(this.id);
    // showAlbum(currentDisplayArtistId);
    currentAlbumDisplay = false;
  });
}


export let newDb = new MusicDB();
let currentDisplayArtistId = "";
let currentAlbumDisplay = false;

$(document).ready(function() {
  $("body").show();
  displayArtistList();
  attachArtistListeners();
  $("form#new-artist").submit(function(event) {
    event.preventDefault();
    let inputArtistName = $("input#new-artist-name").val();
    let inputArtistGenre = $("input#new-artist-genre").val();
    $("input#new-artist-name").val("");
    $("input#new-artist-genre").val("");
    let newArtist = new Artist(inputArtistName, inputArtistGenre);
    newDb.addArtist(newArtist);
    displayArtistList();
  });

  $("form#new-album").submit(function(event) {
    event.preventDefault();
    let artistId = parseInt(currentDisplayArtistId);
    let indexElement = newDb.findArtistIndex(artistId);
    let albumArtist = newDb.artists[indexElement].artist;
    let inputAlbumName = $("input#new-album-name").val();
    let inputAlbumYear = $("input#new-album-year").val();
    let inputAlbumGenre = $("input#new-album-genre").val();
    let inputAlbumType = $("input#new-album-type").val();
    $("input#new-album-name").val("");
    $("input#new-album-year").val("");
    $("input#new-album-genre").val("");
    $("input#new-album-type").val("");    
    let newAlbum = new Album(albumArtist, inputAlbumName, inputAlbumYear, inputAlbumGenre, inputAlbumType);
    newDb.addAlbum(newAlbum);
    showAlbum(currentDisplayArtistId);
  });    
});


let artist1 = new Artist("The Damned", "Punk");
let artist2 = new Artist("Tool", "NuMetal");
let artist3 = new Artist("REM", "Alternative");
let artist4 = new Artist("The Cure", "Alternative");
let artist5 = new Artist("Metallica", "Heavey Metal");
let artist6 = new Artist("The Clash", "Punk");
let artist7 = new Artist("Pink Floyd", "Classic Rock");
let artist8 = new Artist("Otis Redding", "R&B");
let artist9 = new Artist("Ghostland Observatory", "Alternative");
let artist10 = new Artist("Sound Tribe Sector 9", "Jam Band");
let artist11 = new Artist("A Perfect Circle", "Alternative");
let artist12 = new Artist("Rage Against The Machine", "Alternative");
let artist13 = new Artist("Cage The Elephant", "Alternative");
let artist14 = new Artist("A Silent Film", "Alternative");
newDb.addArtist(artist1);
newDb.addArtist(artist2);
newDb.addArtist(artist3);
newDb.addArtist(artist4);
newDb.addArtist(artist5);
newDb.addArtist(artist6);
newDb.addArtist(artist7);
newDb.addArtist(artist8);
newDb.addArtist(artist9);
newDb.addArtist(artist10);
newDb.addArtist(artist11);
newDb.addArtist(artist12);
newDb.addArtist(artist13);
newDb.addArtist(artist14);
let album1 = new Album("REM", "Out of Time", 1991, "Alternative", "Studio");
let album2 = new Album("REM", "Eponymous", 1988, "Alternative", "Compilation");
let album3 = new Album("The Cure", "Seventeen Seconds", 1980, "Alternative", "Studio");
let album4 = new Album("The Cure", "Concert", 1984, "Alternative", "Live");
let album5 = new Album("The Cure", "The Walk", 1983, "Alternative", "EP");
let album6 = new Album("The Damned", "The Best of the Damned", 1981, "Punk", "Compilation");
let album7 = new Album("The Damned", "Live", 1990, "Punk", "Live");
let album8 = new Album("Tool", "Undertow", 1993, "NuMetal", "Studio");
newDb.addAlbum(album1);
newDb.addAlbum(album2);
newDb.addAlbum(album3);
newDb.addAlbum(album4);
newDb.addAlbum(album5);
newDb.addAlbum(album6);
newDb.addAlbum(album7);
newDb.addAlbum(album8);



