//Back-End

function MusicDB() {
  this.artists = [];
  this.albums = [];
  this.artistId = 0;
  this.albumId = 0;
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
  this.artists.push(artist);
}

MusicDB.prototype.addAlbum = function(album) {
  album.albumId = this.assignAlbumId();
  album.artistId = newDb.findArtistIdByName(album.albumArtist);
  this.albums.push(album);
}

MusicDB.prototype.findArtistIndex = function(searchId) { 
  for (i = 0; i < newDb.artists.length; i++) {
    if (newDb.artists[i] != undefined && newDb.artists[i].artistId == searchId) {
      return i;
    }
  }
  return false;
}

MusicDB.prototype.findArtistId = function(searchIndex) {
  if (newDb.artists[searchIndex] != undefined) {
    return newDb.artists[searchIndex].artistId;
  }
  return false;
}

MusicDB.prototype.findAlbum = function(searchId) { 
  for (i = 0; i < newDb.albums.length; i++) {
    if (newDb.albums[i].albumId != undefined && newDb.albums[i].albumId == searchId) {
      return newDb.albums[i];
    }
  }
  return false;
}

// ES15 newDb.artists.find( ({ artistId }) => artistId === 2);


MusicDB.prototype.findArtistIndexByName = function(artistName) {
  for (i = 0; i < newDb.artists.length; i++) {
    if (this.artists[i] != undefined && this.artists[i].artist === artistName) {
      return i;
    };
  };
};

MusicDB.prototype.findArtistIdByName = function(artistName) {
  for (i = 0; i < newDb.artists.length; i++) {
    if (this.artists[i] != undefined && this.artists[i].artist === artistName) {
      return this.artists[i].artistId;
    };
  };
};

MusicDB.prototype.findArtistByAlbumId = function(albumId) { 
  for (i = 0; i < newDb.albums.length; i++) {
    if (newDb.albums[i].albumId != undefined && newDb.albums[i].albumId == albumId) {
      return newDb.albums[i].artistId;
    }
  }
  return false;
}

MusicDB.prototype.findAlbumList = function(artistId) {
  const albumList = [];
  for (i = 0; i < newDb.albums.length; i++) {
    if (this.albums[i] != undefined && this.albums[i].artistId == artistId) {
      albumList.push(this.albums[i]);
    };
  };
  return albumList;
};

MusicDB.prototype.findAlbumListByName = function(artistName) {
  let artId = newDb.findArtistIdByName(artistName);
  let albumList = newDb.findAlbumList(artId);
  return albumList;
};

MusicDB.prototype.deleteArtist = function(searchId) {
  artistIndex = this.findArtistIndex(searchId);
  if (this.artists[artistIndex] === undefined) {
    return false;
  }
  delete this.artists[artistIndex];
  this.deleteArtistAlbums(searchId);
  return true;
}

MusicDB.prototype.deleteArtistAlbums = function(artistId) {
  for (i = 0; i < newDb.albums.length; i++) {
    if (this.albums[i] != undefined && this.albums[i].artistId == artistId) {
      delete this.albums[i];
    };
  };
  return true;
}

//Testing Here - after delete, album details gets stuck
MusicDB.prototype.deleteAlbum = function(albumId) {
  for (i = 0; i < newDb.albums.length; i++) {
    if (this.albums[i] != undefined && this.albums[i].albumId == albumId) {
      delete this.albums[i];
      return true;
    };
  };
  return false;
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


//Front End


function showArtist(artistId) {
  currentDisplayArtistId = artistId;
  const artistElement = newDb.findArtistIndex(artistId);
  $("#show-artist").show();
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
  newDb.artists.forEach(function(artist) {
    htmlForArtists += "<li id=" + artist.artistId + ">" + artist.artist + "</li>";
  })
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
  $("show-album-details").show();
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
  $("ul#artists").on("click", "li", function() {
    showArtist(this.id);
    $("#show-albums").show();
    showAlbum(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    $("#show-artist").hide();
    $("#show-albums").hide();
    $("#show-add-albums").hide();
    newDb.deleteArtist(this.id);
    displayArtistList();
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
    $("#show-album-details").show();
  });
  $("#albumButtons").on("click", ".showAlbumDetail", function() {
    $("#show-album-details").hide();
  });
  $("#albumButtons").on("click", ".deleteAlbumButton", function() {
    $("#show-album-details").hide();
    $("#show-albums").hide();
    newDb.deleteAlbum(this.id);
    console.log(this.id + " This is the handler Id");
    albumArtistId = newDb.findArtistByAlbumId(this.id);
    showAlbumDetails(albumArtistId);
  });
}


let newDb = new MusicDB();
let currentDisplayArtistId = "";

$(document).ready(function() {
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
  })

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
// Try adding artist, test all
// Delete artist, test all
// add album, test all
// delete albume, test all
// Sort Artists alphabetically
// need to refactor for an array of objects for easier sorting.  
// list all album properties
// Sort albums by properties

