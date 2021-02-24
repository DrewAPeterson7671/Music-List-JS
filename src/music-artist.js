
export class MusicDB {
  constructor() {
    this.artists = [];
    this.albums = [];
    this.artistId = 0;
    this.albumId = 0;
  }

  assignArtistId() {
    this.artistId += 1;
    return this.artistId;
  }

  assignAlbumId() {
    this.albumId += 1;
    return this.albumId;
  }

  addArtist(artist) {
    artist.artistId = this.assignArtistId();
    this.artists.push(artist);
  }

  addAlbum(album) {
    album.albumId = this.assignAlbumId();
    album.artistId = this.findArtistIdByName(album.albumArtist);
    this.albums.push(album);
  }

  findArtistIndex(searchId) { 
    if (!searchId) return false;
    return this.artists.findIndex(object => object.artistId == searchId);
  }

  findArtistId(searchIndex) {
    if (!this.artists[searchIndex]) return false;
    return this.artists[searchIndex].artistId;
  }

  findAlbum(searchId) {
    if (!searchId) return false; 
    return this.albums.find(object => object.albumId == searchId);
  }

  findArtistIndexByName(artistName) {
    if (!artistName || artistName.length == 0) return false;
    return this.artists.findIndex(object => object.artist == artistName);
  }

  findArtistIdByName(artistName) {
    if (!artistName || artistName.length == 0) return false;
    let foundIndex = this.artists.findIndex(object => object.artist == artistName);
    return this.artists[foundIndex].artistId;
  }

  findArtistByAlbumId(albumId) {
    if (!albumId) return false; 
    let foundIndex = this.albums.findIndex(object => object.albumId == albumId); 
    return this.albums[foundIndex].artistId;
  }

  sortArtistsAlpha() {
    this.artists.sort(function(a, b) {
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
    return this.artists;
  }

  // Refactor left off here  

  findAlbumList(artistId) {
    if (!artistId) return false;
    const albumList = this.albums.filter(object => object.artistId == artistId);
    return albumList;
  }

  findAlbumListByName(artistName) {
    let artId = this.findArtistIdByName(artistName);
    let albumList = this.findAlbumList(artId);
    return albumList;
  }

  deleteArtist(searchId) {
    let artistIndex = this.findArtistIndex(searchId);
    if (!this.artists[artistIndex]) return false;
    delete this.artists[artistIndex];
    this.deleteArtistAlbums(searchId);
    return true;
  }

  deleteArtistAlbums(artistId) {
    for (let i = 0; i < this.albums.length; i++) {
      if (this.albums[i] != undefined && this.albums[i].artistId == artistId) {
        delete this.albums[i];
      }
    }
    this.artists = this.artists.filter(val => val);
    this.albums = this.albums.filter(val => val);
    return true;
  }

  deleteAlbum(albumId) {
    for (let i = 0; i < this.albums.length; i++) {
      if (this.albums[i] != undefined && this.albums[i].albumId == albumId) {
        delete this.albums[i];
      }
    }
    return this.albums = this.albums.filter(val => val);
  }
}

export class Artist {
  constructor(artist, artistGenre) {
    this.artist = artist;
    this.artistGenre = artistGenre;
  }
}

export class Album {
  constructor(albumArtist, albumName, albumYear, albumGenre, albumType) {
    this.albumArtist = albumArtist;
    this.albumName = albumName;
    this.albumYear = albumYear;
    this.albumGenre = albumGenre;
    this.albumType = albumType;
    this.albumRating = "";
  }
}