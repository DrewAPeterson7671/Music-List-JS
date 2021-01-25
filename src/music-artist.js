import { newDb } from './main.js';


export function MusicDB() {
  this.artists = [];
  this.albums = [];
  this.artistId = 0;
  this.albumId = 0;
}

MusicDB.prototype.assignArtistId = function() {
  this.artistId += 1;
  return this.artistId;
};

MusicDB.prototype.assignAlbumId = function() {
  this.albumId += 1;
  return this.albumId;
};

MusicDB.prototype.addArtist = function(artist) {
  artist.artistId = this.assignArtistId();
  this.artists.push(artist);
};

MusicDB.prototype.addAlbum = function(album) {
  album.albumId = this.assignAlbumId();
  album.artistId = newDb.findArtistIdByName(album.albumArtist);
  this.albums.push(album);
};

MusicDB.prototype.findArtistIndex = function(searchId) { 
  for (let i = 0; i < newDb.artists.length; i++) {
    if (newDb.artists[i] != undefined && newDb.artists[i].artistId == searchId) {
      return i;
    }
  }
  return false;
};

MusicDB.prototype.findArtistId = function(searchIndex) {
  if (newDb.artists[searchIndex] != undefined) {
    return newDb.artists[searchIndex].artistId;
  }
  return false;
};

MusicDB.prototype.findAlbum = function(searchId) { 
  for (let i = 0; i < newDb.albums.length; i++) {
    if (newDb.albums[i] != undefined && newDb.albums[i].albumId == searchId) {
      return newDb.albums[i];
    }
  }
  return false;
};

// ES15 newDb.artists.find( ({ artistId }) => artistId === 2);

MusicDB.prototype.findArtistIndexByName = function(artistName) {
  for (let i = 0; i < newDb.artists.length; i++) {
    if (this.artists[i] != undefined && this.artists[i].artist === artistName) {
      return i;
    }
  }
};

MusicDB.prototype.findArtistIdByName = function(artistName) {
  for (let i = 0; i < newDb.artists.length; i++) {
    if (this.artists[i] != undefined && this.artists[i].artist === artistName) {
      return this.artists[i].artistId;
    }
  }
};

MusicDB.prototype.findArtistByAlbumId = function(albumId) { 
  for (let i = 0; i < newDb.albums.length; i++) {
    if (newDb.albums[i].albumId != undefined && newDb.albums[i].albumId == albumId) {
      return newDb.albums[i].artistId;
    }
  }
  return false;
};

//Working here
MusicDB.prototype.sortArtistsAlpha = function() {
  newDb.artists.sort(function(a, b) {
    let myReg = /^The |^A /i;
    let indexA = a.artist.replace(myReg, "");
    let indexB = b.artist.replace(myReg, "");
    if (indexA < indexB) {
      return -1;
    }
    if (indexA > indexB) {
      return 1;
    }
  });
  return newDb.artists;
};

MusicDB.prototype.findAlbumList = function(artistId) {
  const albumList = [];
  for (let i = 0; i < newDb.albums.length; i++) {
    if (this.albums[i] != undefined && this.albums[i].artistId == artistId) {
      albumList.push(this.albums[i]);
    }
  }
  return albumList;
};

MusicDB.prototype.findAlbumListByName = function(artistName) {
  let artId = newDb.findArtistIdByName(artistName);
  let albumList = newDb.findAlbumList(artId);
  return albumList;
};

MusicDB.prototype.deleteArtist = function(searchId) {
  let artistIndex = this.findArtistIndex(searchId);
  if (this.artists[artistIndex] === undefined) {
    return false;
  }
  delete this.artists[artistIndex];
  this.deleteArtistAlbums(searchId);
  return true;
};

MusicDB.prototype.deleteArtistAlbums = function(artistId) {
  for (let i = 0; i < newDb.albums.length; i++) {
    if (this.albums[i] != undefined && this.albums[i].artistId == artistId) {
      delete this.albums[i];
    }
  }
  return true;
};

MusicDB.prototype.deleteAlbum = function(albumId) {
  for (let i = 0; i < newDb.albums.length; i++) {
    if (this.albums[i] != undefined && this.albums[i].albumId == albumId) {
      delete this.albums[i];
      return true;
    }
  }
  return false;
};

export function Artist(artist, artistGenre) {
  this.artist = artist;
  this.artistGenre = artistGenre;
}

export function Album(albumArtist, albumName, albumYear, albumGenre, albumType) {
  this.albumArtist = albumArtist;
  this.albumName = albumName;
  this.albumYear = albumYear;
  this.albumGenre = albumGenre;
  this.albumType = albumType;
  this.albumRating = "";
}