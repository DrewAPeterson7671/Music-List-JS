import { MusicDB, Artist, Album } from '../src/music-artist.js';

describe(MusicDB, () => {
  let testDb;

  beforeEach(() => {
    testDb = new MusicDB();
  });

  test('should create a new MusicDB object that is not null', () => {
    expect(testDb).not.toBeNull();
  });
  test('should create a new MusicDB object that is not undefined', () => {
    expect(testDb).not.toBeUndefined();
  });
  test('should create a new MusicDB with an empty artists array', () => {
    expect(testDb.artists).toEqual([]);
  });
  test('should create a new MusicDB object with an empty albums array', () => {
    expect(testDb.albums).toEqual([]);
  });
  test('should create a new MusicDB object with an initial artistId of 0', () => {
    expect(testDb.artistId).toEqual(0);
  });
  test('should create a new MusicDB object with an initial albumId of 0', () => {
    const testArtist = new MusicDB();
    expect(testArtist.albumId).toEqual(0);
  });
});

describe(MusicDB, () => {
  let testDb4;

  beforeEach(() => {
    testDb4 = new MusicDB();
  });

  test('should create a new Artist object for MusicDB and iterate the artistId by one', () => {
    expect(testDb4.artistId).toEqual(0);
    testDb4.assignArtistId();
    expect(testDb4.artistId).toEqual(1);
  });
  test('should create a new Artist and Album object for MusicDB and iterate the albumId by one', () => {
    expect(testDb4.albumId).toEqual(0);
    let testArtist4;
    let testAlbum4;
    testArtist4 = new Artist("Buddy Holly", "Rock & Roll");
    testAlbum4 = new Album("Buddy Holly", "That'll Be The Day", "1958", "Rock & Roll", "Studio");
    testDb4.addArtist(testArtist4);
    testDb4.addAlbum(testAlbum4);
    expect(testAlbum4.albumId).toEqual(1);
  });
});

describe(MusicDB, () => {
  let testDb3;
  let testArtist3;
  let testAlbum3;

  beforeEach(() => {
    testDb3 = new MusicDB();
    testArtist3 = new Artist("Buddy Holly", "Rock & Roll");
    testAlbum3 = new Album("Buddy Holly", "That'll Be The Day", "1958", "Rock & Roll", "Studio");
    testDb3.addArtist(testArtist3);
    testDb3.addAlbum(testAlbum3);
  });

  test('Test that the addArtist prototype to add an artist to a new db', () => {
    expect(testDb3.artists[0].artist).toEqual
    ("Buddy Holly");
    expect(testDb3.artists[0].artistGenre).toEqual
    ("Rock & Roll");
  });
  test('Test that the addAlbum prototype to add an album to a new db', () => {
    expect(testDb3.albums[0].albumArtist).toEqual
    ("Buddy Holly");
    expect(testDb3.albums[0].albumName).toEqual("That'll Be The Day");
    expect(testDb3.albums[0].albumYear).toEqual("1958");
    expect(testDb3.albums[0].albumGenre).toEqual("Rock & Roll");
    expect(testDb3.albums[0].albumType).toEqual("Studio");
    expect(testDb3.albums[0].albumRating).toEqual("")
  });
  test('should create a new Artist and Artist and verify findArtistIndex finds the artists index in the artists array', () => {
    expect(testDb3.findArtistIndex(1)).toEqual(0);
  });
  test('should create a new Artist verify findArtistId finds the artistsId artists array position', () => {
    expect(testDb3.findArtistId(0)).toEqual(1);
  });
  test('should find an album by albumId', () => {
    expect(testDb3.findAlbum(1).albumId).toEqual(1);
  });
  test('should find the arist array index of an artist by findArtistIndexByName', () => {
    expect(testDb3.findArtistIndexByName("Buddy Holly")).toEqual(0);
  });
  test('should find an artistId by name with findArtistIdByName', () => {
    expect(testDb3.findArtistIdByName("Buddy Holly")).toEqual(1);
  });
  test('should find an artistId by albumId with findArtistByAlbumId', () => {
    expect(testDb3.findArtistByAlbumId(1)).toEqual(1);
  });

  beforeEach(() => {
    let testArtist4 = new Artist("ABBA", "Disco");
    testDb3.addArtist(testArtist4);
    let testAlbum4 = new Album("Buddy Holly", "The Chirping Crickets", "1957", "Rock & Roll", "Studio");
    let testAlbum5 = new Album("ABBA", "Gold Greatest Hits", "1992", "Disco", "Compilation")
    testDb3.addAlbum(testAlbum4);
    testDb3.addAlbum(testAlbum5);
  });


  test('should sort the artists alphabetically with sortArtistsAlpha', () => {
    expect(testDb3.sortArtistsAlpha()).toEqual([{"artist": "ABBA", "artistGenre": "Disco", "artistId": 2}, {"artist": "Buddy Holly", "artistGenre": "Rock & Roll", "artistId": 1}]);
  });
  test('should sort the artists alphabetically and handling the word the correctly', () => {
    let testArtist5 = new Artist("Yes", "Classic Rock");
    testDb3.addArtist(testArtist5);
    let testArtist6 = new Artist("The Cure", "Alternative");
    testDb3.addArtist(testArtist6);
    expect(testDb3.sortArtistsAlpha()).toEqual([{"artist": "ABBA", "artistGenre": "Disco", "artistId": 2}, {"artist": "Buddy Holly", "artistGenre": "Rock & Roll", "artistId": 1}, {"artist": "The Cure", "artistGenre": "Alternative", "artistId": 4}, {"artist": "Yes", "artistGenre": "Classic Rock", "artistId": 3}]);
  });
  test('should sort the artists alphabetically and handling the word a correctly', () => {
    let testArtist5 = new Artist("Yes", "Classic Rock");
    testDb3.addArtist(testArtist5);
    let testArtist6 = new Artist("A Perfect Circle", "Alternative");
    testDb3.addArtist(testArtist6);
    expect(testDb3.sortArtistsAlpha()).toEqual([{"artist": "ABBA", "artistGenre": "Disco", "artistId": 2}, {"artist": "Buddy Holly", "artistGenre": "Rock & Roll", "artistId": 1}, {"artist": "A Perfect Circle", "artistGenre": "Alternative", "artistId": 4}, {"artist": "Yes", "artistGenre": "Classic Rock", "artistId": 3}]);
  });
  test('should find all the albums of an artist by artistId and put them in an array', () => {
    expect(testDb3.findAlbumList(1)[0].albumName).toEqual("That'll Be The Day");
    expect(testDb3.findAlbumList(1)[1].albumName).toEqual('The Chirping Crickets');
  });
  test('should find all the albums of an artist and put them in an array and not add any other artists albums', () => {
    expect(testDb3.albums.length).toEqual(3);
    expect(testDb3.findAlbumList(1).length).toEqual(2);
  });
  test('should find all the albums of an artist by Artist name and put them in an array', () => {
    expect(testDb3.findAlbumListByName("Buddy Holly").length).toEqual(2);
  });
  test('should find all the albums of an artist by Artist name and put them in an array and verify album names', () => {
    expect(testDb3.findAlbumList(1)[0].albumName).toEqual("That'll Be The Day");
    expect(testDb3.findAlbumList(1)[1].albumName).toEqual('The Chirping Crickets');
  });
  test('should delete the artist by artist index in the array', () => {
    testDb3.deleteArtist(2);
    expect(testDb3.artists).toEqual([{"artist": "Buddy Holly", "artistGenre": "Rock & Roll", "artistId": 1}]);
  });
  test('should delete the artist and also all their albums', () => {
    testDb3.deleteArtist(1);
    expect(testDb3.albums.length).toEqual(1);
    expect(testDb3.albums[0].albumName).toEqual("Gold Greatest Hits");
  });
  test('should delete an album and only one album', () => {
    testDb3.deleteAlbum(1);
    expect(testDb3.albums.length).toEqual(2);
    expect(testDb3.albums[0].albumName).toEqual("The Chirping Crickets");
    expect(testDb3.albums[1].albumName).toEqual("Gold Greatest Hits");
  });
});

describe(Artist, () => {
  let testDb1;
  let testArtist1;

  beforeEach(() => {
    testDb1 = new MusicDB();
    testArtist1 = new Artist("Yes", "Classic Rock");
  });

  test('should create a new Artist object that is not null', () => {
    expect(testArtist1).not.toBeNull();
  });
  test('should create a new Artist object that is not undefined', () => {
    expect(testArtist1).not.toBeUndefined();
  });
  test('should create a new Artist object with 2 arguments passed in', () => {
    expect(testArtist1.artist).toEqual("Yes");
    expect(testArtist1.artistGenre).toEqual("Classic Rock");
  });    
});

describe(Album, () => {
  let testDb2;
  let testArtist2;
  let testAlbum;

  beforeEach(() => {
    testDb2 = new MusicDB();
    testArtist2 = new Artist("Yes", "Classic Rock");
    testAlbum = new Album("Yes", "90125", "1983", "Classic Rock", "Studio");
  });

  test('should create a new Album object that is not null', () => {
    expect(testAlbum).not.toBeNull();
  });
  test('should create a new Album object that is not undefined', () => {
    expect(testAlbum).not.toBeUndefined();
  });
  test('should create a new Album object with 5 arguments passed in', () => {
    expect(testAlbum.albumArtist).toEqual("Yes");
    expect(testAlbum.albumName).toEqual("90125");
    expect(testAlbum.albumYear).toEqual("1983");
    expect(testAlbum.albumGenre).toEqual("Classic Rock");
    expect(testAlbum.albumType).toEqual("Studio");
    expect(testAlbum.albumRating).toEqual("");
  });
});
