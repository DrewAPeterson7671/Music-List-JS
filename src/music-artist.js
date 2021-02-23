
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
    for (let i = 0; i < this.artists.length; i++) {
      if (this.artists[i] != undefined && this.artists[i].artistId == searchId) {
        return i;
      }
    }
    return false;
  }

  findArtistId(searchIndex) {
    if (this.artists[searchIndex] != undefined) {
      return this.artists[searchIndex].artistId;
    }
    return false;
  }

  findAlbum(searchId) { 
    for (let i = 0; i < this.albums.length; i++) {
      if (this.albums[i] != undefined && this.albums[i].albumId == searchId) {
        return this.albums[i];
      }
    }
    return false;
  }

  // ES2015 newDb.artists.find( ({ artistId }) => artistId === 2);

  findArtistIndexByName(artistName) {
    for (let i = 0; i < this.artists.length; i++) {
      if (this.artists[i] != undefined && this.artists[i].artist === artistName) {
        return i;
      }
    }
  }

  findArtistIdByName(artistName) {
    for (let i = 0; i < this.artists.length; i++) {
      if (this.artists[i] != undefined && this.artists[i].artist === artistName) {
        return this.artists[i].artistId;
      }
    }
  }

  findArtistByAlbumId(albumId) { 
    for (let i = 0; i < this.albums.length; i++) {
      if (this.albums[i].albumId != undefined && this.albums[i].albumId == albumId) {
        return this.albums[i].artistId;
      }
    }
    return false;
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

  findAlbumList(artistId) {
    const albumList = [];
    for (let i = 0; i < this.albums.length; i++) {
      if (this.albums[i] != undefined && this.albums[i].artistId == artistId) {
        albumList.push(this.albums[i]);
      }
    }
    return albumList;
  }

  findAlbumListByName(artistName) {
    let artId = this.findArtistIdByName(artistName);
    let albumList = this.findAlbumList(artId);
    return albumList;
  }

  deleteArtist(searchId) {
    let artistIndex = this.findArtistIndex(searchId);
    if (this.artists[artistIndex] === undefined) {
      return false;
    }
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