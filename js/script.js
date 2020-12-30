function MusicDB() {
  this.artists = {};
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
  this.artists[artist.artistId] = artist;
}

MusicDB.prototype.addAlbum = function(album) {
  album.albumId = this.assignAlbumId();
  let albumArtistID = newDb.findArtistByName(album.albumArtist);
  this.artists[albumArtistID].artistAlbums[album.albumId] = album;
  return this.artists[albumArtistID].artistAlbums[album.albumId];
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

function Artist(artist, artistGenre) {
  this.artist = artist;
  this.artistGenre = artistGenre;
  this.artistAlbums = {};
}

function Album(albumArtist, albumName, albumYear, albumGenre, albumType) {
  this.albumArtist = albumArtist;
  this.albumName = albumName;
  this.albumYear = albumYear;
  this.albumGenre = albumGenre;
  this.albumType = albumType;
}

//next need to find album by ID and also by Album name
//Also, probably would be better off making two DB objects instead of nesting the albums in the artist.  Duh!

let newDb = new MusicDB();
let artist = new Artist("REM", "Alternative");
let artist2 = new Artist("The Cure", "Alternative");
let artist3 = new Artist("The Damned", "Punk");
let artist4 = new Artist("Tool", "NuMetal");
newDb.addArtist(artist);
newDb.addArtist(artist2);
newDb.addArtist(artist3);
newDb.addArtist(artist4);
let album = new Album("REM", "Out of Time", 1991, "Alternative", "Studio");
let album2 = new Album("REM", "Out Eponymous", 1988, "Alternative", "Compilation");
let album3 = new Album("The Cure", "Seventeen Seconds", 1980, "Alternative", "Studio");
let album4 = new Album("The Cure", "Concert", 1984, "Alternative", "Live");
let album5 = new Album("The Cure", "The Walk", 1983, "Alternative", "EP");
let album6 = new Album("The Damned", "The Best of the Damned", 1981, "Punk", "Compilation");
let album7 = new Album("The Damned", "Live", 1990, "Punk", "Live");
let album8 = new Album("Tool", "Undertow", 1993, "NuMetal", "Studio");
newDb.addAlbum(album);
newDb.addAlbum(album2);
newDb.addAlbum(album3);
newDb.addAlbum(album4);
newDb.addAlbum(album5);
newDb.addAlbum(album6);
newDb.addAlbum(album7);
newDb.addAlbum(album8);
newDb.artists[1].artistAlbums;
newDb.artists[2].artistAlbums;
newDb.artists[3].artistAlbums;
newDb.artists[4].artistAlbums;


// newDb;
// newDb.findArtist(3);
// newDb.findArtistByName("The Cure");


// Artist.prototype.addAlbum = function(album) {
//   this.artists[this.artist.album] = album;
// }

// function Album(artist, album, albumYear, albumType) {
//   this.artist = artist;
//   this.album = album;
//   this.albumYear = albumYear;
//   this.albumType = albumType;
// }

///working above



MusicDB.prototype.assignAlbumId = function() {
  this.albumId += 1;
  return this.albumId;
}

let db1 = new MusicDB()
this.addArtist(REM);
db1;


// ///I think I need to find the artist ID first, then assign albums.

// MusicDB.prototype.addAlbum = function(artist, artistAlbum, albumYear, albumType) {
//   artistAlbum.id = this.assignAlbumId();
//   this.artists.artist.artistAlbum = artistAlbum;
//   this.artists.artist.artistAlbum.albumYear = albumYear;
//   this.artists.artist.artistAlbum.albumType = albumType;
// }



// $(document).ready(function() {
  
// })

