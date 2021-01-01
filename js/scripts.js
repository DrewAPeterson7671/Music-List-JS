function MusicDB() {
  this.artists = {};
  this.artistId = 0;
  this.albumId = 0;
  this.albums = {};
}

MusicDB.prototype.assignArtistId = function() {
  this.artistId += 1;
  return this.artistId;
}

MusicDB.prototype.assignAlbumId = function() {
  this.albumId += 1;
  return this.albumId;
}

MusicDB.prototype.addArtist = function(artist) {
  artist.artistId = this.assignArtistId();
  this.artists[artist.artistId] = artist;
}

MusicDB.prototype.addAlbum = function(album) {
  album.albumId = this.assignAlbumId();
  album.artistId = newDb.findArtistByName(album.albumArtist);
  this.albums[album.albumId] = album;
}

MusicDB.prototype.findArtist = function(id) {
  if (this.artists[id] != undefined ) {
    return this.artists[id];
  }
  return false;
}

MusicDB.prototype.findArtistByName = function(artistName) {
  for (i = 1; i <= this.artistId; i++) {
    if (this.artists[i].artist === artistName) {
      return i;
    };
  };
};

MusicDB.prototype.findAlbumList = function(artistId) {
  let albumList = [];
  for (i = 1; i <= this.albumId; i++) {
    if (this.albums[i].artistId == artistId) {
      albumList.push(this.albums[i]);
    };
  };
  return albumList;
};

MusicDB.prototype.findAlbumListByName = function(artistName) {
  let artId = newDb.findArtistByName(artistName);
  let albumList = newDb.findAlbumList(artId);
  return albumList;
};

MusicDB.prototype.deleteArtist = function(id) {
  if (this.artists[id] === undefined) {
    return false;
  }
  delete this.artists[id];
  return true;
}

function Artist(artist, artistGenre) {
  this.artist = artist;
  this.artistGenre = artistGenre;
}

function Album(albumArtist, albumName, albumYear, albumGenre, albumType) {
  this.albumArtist = albumArtist;
  this.albumName = albumName;
  this.albumYear = albumYear;
  this.albumGenre = albumGenre;
  this.albumType = albumType;
  this.albumRating = "";
}

//OK left off here, trying to display albums.  The delete button is gone again and Note I am calling it in the showArtist function (may need to be a prototype)

//its an array, not an object

function showAlbum(artistId) {
  let albumDisplay = $("ul#show-albums");
  let albumListDisplays = newDb.findAlbumList(artistId);
  let htmlForAlbums = "";
  albumListDisplays.forEach(function(albumListDisplay) {
    htmlForAlbums += "<li id=" + albumListDisplay.albumId + ">" + albumListDisplay.albumName + "</li>";
  });
  albumDisplay.html(htmlForAlbums);
}

function showArtist(artistId) {
  const artist = newDb.findArtist(artistId);
  $("#show-artist").show();
  $(".show-artist-name").html(artist.artist);
  $(".show-artist-genre").html(artist.artistGenre);
  // showAlbum(artistId);
  let buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" + + artist.artistId + ">Delete</button>");
  buttons.append("<button class='showAlbums' id=" + + artist.artistId + ">Show Albums</button>");
}


function attachArtistListeners() {
  $("ul#artists").on("click", "li", function() {
    showArtist(this.id);
    $("ul#show-albums").hide();
  });
  $("#buttons").on("click", ".deleteButton", function() {
    newDb.deleteArtist(this.id);
    $("#show-artist").hide();
    displayArtistDetails(newDb);
  });
  $("#buttons").on("click", ".showAlbums", function() {
    $("ul#show-albums").show();
    showAlbum(this.id);
  });
}

function displayArtistDetails(artistsToDisplay) {
  let artistList = $("ul#artists");
  let htmlForArtists = "";
  Object.keys(artistsToDisplay.artists).forEach(function(key) {
    const artist = artistsToDisplay.findArtist(key);
    htmlForArtists += "<li id=" + artist.artistId + ">" + artist.artist + "</li>";
  });
  artistList.html(htmlForArtists);
}

let newDb = new MusicDB();

$(document).ready(function() {
  displayArtistDetails(newDb);
  attachArtistListeners();
  $("form#new-artist").submit(function(event) {
    event.preventDefault();
    let inputArtistName = $("input#new-artist-name").val();
    let inputArtistGenre = $("input#new-artist-genre").val();
    let newArtist = new Artist(inputArtistName, inputArtistGenre);
    newDb.addArtist(newArtist);
    displayArtistDetails(newDb);
  })  
})


let artist1 = new Artist("REM", "Alternative");
let artist2 = new Artist("The Cure", "Alternative");
let artist3 = new Artist("The Damned", "Punk");
let artist4 = new Artist("Tool", "NuMetal");
newDb.addArtist(artist1);
newDb.addArtist(artist2);
newDb.addArtist(artist3);
newDb.addArtist(artist4);
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

// To Do
// Sort Artists alphabetically
// add album
// list all albume properties
// Sort albums by properties
// Delete albums with artist deletion
// Delete individual albums

