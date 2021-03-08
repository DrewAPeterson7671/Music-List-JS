import { MusicDB, Artist, Album } from './music-artist.js';
import $ from 'jquery';
import './css/styles.css';

function showAlphabetIndex() {
  let alphabetIndex = $("ul#alphabet-index");
  let htmlForAlphabetIndex = "";
  const alphabetIndexArray = ["#", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
  alphabetIndexArray.forEach( (a) => {
    htmlForAlphabetIndex += "<li id=" + a + ">" + a + "</li>";
  });
  alphabetIndex.html(htmlForAlphabetIndex);
}

function showArtist(artistId) {
  currentDisplayArtistId = artistId;
  const artistElement = newDb.findArtistIndex(artistId);
  $(".show-artist-name").html(newDb.artists[artistElement].artist);
  $(".show-artist-genre").html(newDb.artists[artistElement].artistGenre);
  let buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='editArtist' id=" + + newDb.artists[artistElement].artistId + ">Edit Artist</button>");
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

let alphabetCharacterFilter = (alphabetSortCharacter) => {
  let artistList = $("ul#artists");
  let htmlForArtists = "";
  let alphaLetterOnly = newDb.alphabetIndexSortByChar(alphabetSortCharacter);
  alphaLetterOnly.forEach(function(artist) {
    htmlForArtists += "<li id=" + artist.artistId + ">" + artist.artist + "</li>";
  });
  artistList.html(htmlForArtists);
};

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
  albumButtons.append("<button class='editAlbumButton' id=" + + albumDetail.albumId + ">Edit Album</button>");
  albumButtons.append("<button class='deleteAlbumButton' id=" + + albumDetail.albumId + ">Delete Album</button>");
  albumButtons.append("<button class='showAlbumDetail' id=" + + albumDetail.albumId + ">Hide Album Details</button>");
}

function attachArtistListeners() {
  $("#home-nav").on("click", () => {
    $(".alphabet-index").hide();
    $(".artists-list").hide();
    $(".add-artist").hide();
    $(".edit-artist").hide();
    $("#show-artist").hide();
    $(".artist-detail").hide();
    $("#show-album-details").hide();
    $("#show-add-albums").hide();
  });
  $("#artists-nav").on("click", () => {
    $(".alphabet-index").show();
    $(".edit-artist").hide();
    $(".artists-list").show();
    $(".add-artist").show();
    $(".artist-detail").hide();
    $("#show-album-details").hide();
    $("#show-add-albums").hide();
    displayArtistList();
  });
  $("#artist-nav").on("click", () => {
    $(".add-artist").hide();
    $(".edit-artist").hide();
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
    $(".edit-artist").hide();
    $("#show-album-details").hide();
    showAlbumDetails(this.id);
    showArtist(currentDisplayArtistId);
    showAlbum(currentDisplayArtistId);
  });
  $("ul#alphabet-index").on("click", "li", function(e) {
    let alphabetSortCharacter = e.target.id;
    alphabetCharacterFilter(alphabetSortCharacter);
    $(".artists-list").show();
  });
  $("ul#artists").on("click", "li", function() {
    $(".add-artist").hide();
    $(".artists-list").hide();
    $(".edit-artist").hide();
    $(".alphabet-index").hide();
    $(".artist-detail").show();
    $("#show-albums").show();
    showArtist(this.id);
    showAlbum(this.id);
  });
  $("#buttons").on("click", ".editArtist", () => {
    $(".edit-artist").toggle();
    let editArtistId = parseInt(currentDisplayArtistId);
    let artistEditFind = newDb.findArtistIndex(editArtistId);
    let artistToEdit = newDb.artists[artistEditFind];
    $("input#edit-artist-name").val(artistToEdit.artist);
    $("input#edit-artist-genre").val(artistToEdit.artistGenre);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    newDb.deleteArtist(this.id);
    $(".artist-detail").hide();
    $(".edit-artist").hide();
    $("#show-albums").hide();
    $("#show-album-details").hide();
    $(".artists-list").show();
    $("#show-add-albums").hide();
    displayArtistList();
    currentDisplayArtistId = "";
  });
  $("#buttons").on("click", ".showAlbums", function() {
    $("#show-albums").toggle();
    showAlbum(this.id);
  });
  $("#buttons").on("click", ".addAlbums", () => {
    $("#show-add-albums").toggle();
  });
  $("ul#show-albums").on("click", "li", function() {
    showAlbumDetails(this.id);
    currentAlbumDisplay = true;
    $("#show-album-details").show();
  });
  $("#albumButtons").on("click", ".showAlbumDetail", () => {
    $("#show-album-details").hide();
    currentAlbumDisplay = false;
  });  $("#albumButtons").on("click", ".editAlbumButton", function() {
    $("#show-album-details").hide();
    newDb.editAlbum(this.id);
    showAlbum(currentDisplayArtistId);
  });
  $("#albumButtons").on("click", ".deleteAlbumButton", function() {
    $("#show-album-details").hide();
    newDb.deleteAlbum(this.id);
    showAlbum(currentDisplayArtistId);
    currentAlbumDisplay = false;
  });
}


export let newDb = new MusicDB();
let currentDisplayArtistId = "";
let currentAlbumDisplay = false;



$(document).ready(function() {
  $("body").show();
  showAlphabetIndex();
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

  $("form#edit-artist").submit(function(event) {
    event.preventDefault();
    let editArtistName = $("input#edit-artist-name").val();
    let editArtistGenre = $("input#edit-artist-genre").val();
    newDb.editArtist(currentDisplayArtistId,editArtistName, editArtistGenre);
    $("input#edit-artist-name").val("");
    $("input#edit-artist-genre").val("");
    showArtist(currentDisplayArtistId);
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
  $("form#edit-album").submit(function(event) {
    event.preventDefault();
    let artistId = parseInt(currentDisplayArtistId);
    let indexElement = newDb.findArtistIndex(artistId);
    let albumArtist = newDb.artists[indexElement].artist;
    let inputAlbumName = $("input#edit-album-name").val();
    let inputAlbumYear = $("input#edit-album-year").val();
    let inputAlbumGenre = $("input#edit-album-genre").val();
    let inputAlbumType = $("input#edit-album-type").val();
    $("input#edit-album-name").val("");
    $("input#edit-album-year").val("");
    $("input#edit-album-genre").val("");
    $("input#edit-album-type").val("");    
    let newAlbum = new Album(albumArtist, inputAlbumName, inputAlbumYear, inputAlbumGenre, inputAlbumType);
    newDb.addAlbum(newAlbum);
    showAlbum(currentDisplayArtistId);
  });  
  
});

// For testing until the database is added
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
let artist15 = new Artist("!!!", "Alternative");
let artist16 = new Artist("3 Dog Night", "Classic Rock");
let artist17 = new Artist("The The", "Alternative");
let artist20 = new Artist("2 Brothers On The 4th Floor", "House");
let artist21 = new Artist("The 4 Skins", "Punk");

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
newDb.addArtist(artist15);
newDb.addArtist(artist16);
newDb.addArtist(artist17);
newDb.addArtist(artist20);
newDb.addArtist(artist21);

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



