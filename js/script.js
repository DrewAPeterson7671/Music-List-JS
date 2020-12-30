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
  // this.artists[artist[artist.id]]
  // this.artists[artist] = artist
}

// MusicDB.prototype.addAlbum = function(album) {
//   album.albumId = this.assignAlbumId();
//   this.artists[this.findArtistByName(artist)]artist.artistId.artistAlbums.albumId = album;
// }

MusicDB.prototype.findArtist = function(id) {
  if (this.artists[id] != undefined ) {
    return this.artists[id];
  }
  return false;
}

//WHERE I LEFT OFF - Im trying to find by name.  Finding the Artist name in the object

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

let newDb = new MusicDB();
let artist = new Artist("REM", "Alternative");
let artist2 = new Artist("The Cure", "Alternative");
let artist3 = new Artist("The Damned", "Punk");
let artist4 = new Artist("Tool", "NuMetal");
newDb.addArtist(artist);
newDb.addArtist(artist2);
newDb.addArtist(artist3);
newDb.addArtist(artist4);
let album = new Album("REM","Out of Time", 1991, "Alternative", "Studio");
album;
// newDb;
// newDb.findArtist(3);
newDb.findArtistByName("The Cure");


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

