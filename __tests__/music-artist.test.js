import { MusicDB, Artist, Album } from '../src/music-artist.js';

describe(MusicDB, () => {
  test('should create a new MusicDB object that is not null', () => {
    const testDb = new MusicDB();
    expect(testDb).not.toBeNull();
  });
  test('should create a new MusicDB object that is not undefined', () => {
    const testDb = new MusicDB();
    expect(testDb).not.toBeUndefined();
  });
  test('should create a new MusicDB with an empty artists array', () => {
    const testDb = new MusicDB();
    expect(testDb.artists).toEqual([]);
  });
  test('should create a new MusicDB object with an empty albums array', () => {
    const testDb = new MusicDB();
    expect(testDb.albums).toEqual([]);
  });
  test('should create a new MusicDB object with an initial artistId of 0', () => {
    const testDb = new MusicDB();
    expect(testDb.artistId).toEqual(0);
  });
  test('should create a new MusicDB object with an initial albumId of 0', () => {
    const testArtist = new MusicDB();
    expect(testArtist.albumId).toEqual(0);
  });
});

describe(Artist, () => {
  test('should create a new Artist object that is not null', () => {
    const testArtist = new Artist("Yes", "Classic Rock");
    expect(testArtist).not.toBeNull();
  });
  test('should create a new Artist object that is not undefined', () => {
    const testArtist = new Artist("Yes", "Classic Rock");
    expect(testArtist).not.toBeUndefined();
  });
  test('should create a new Artist object with 2 arguments passed in', () => {
    const testArtist = new Artist("Yes", "Classic Rock");
    expect(testArtist.artist).toEqual("Yes");
    expect(testArtist.artistGenre).toEqual("Classic Rock");
  });    
});

describe(Album, () => {
  test('should create a new Album object that is not null', () => {
    const testAlbum = new Album("Yes", "90125", "1983", "Classic Rock", "Studio");
    expect(testAlbum).not.toBeNull();
  });
  test('should create a new Album object that is not undefined', () => {
    const testAlbum = new Album("Yes", "90125", "1983", "Classic Rock", "Studio");
    expect(testAlbum).not.toBeUndefined();
  });
  test('should create a new Album object with 5 arguments passed in', () => {
    const testAlbum = new Album("Yes", "90125", "1983", "Classic Rock", "Studio");
    expect(testAlbum.albumArtist).toEqual("Yes");
    expect(testAlbum.albumName).toEqual("90125");
    expect(testAlbum.albumYear).toEqual("1983");
    expect(testAlbum.albumGenre).toEqual("Classic Rock");
    expect(testAlbum.albumType).toEqual("Studio");
    expect(testAlbum.albumRating).toEqual("");
  });
});

describe(MusicDB, () => {
  test('should create a new Artist object for MusicDB and iterate the artistId by one', () => {
    const testDb1 = new MusicDB();
    expect(testDb1.artistId).toEqual(0);
    const testArtist = new Artist("Yes", "Classic Rock");
    testDb1.addArtist(testArtist);
    expect(testDb1.artistId).toEqual(1);
  });
  test('should create a new Artist and Album object for MusicDB and iterate the albumId by one', () => {
    const testDb1 = new MusicDB();
    expect(testDb1.albumId).toEqual(0);
    const testArtist = new Artist("Yes", "Classic Rock");
    testDb1.addArtist(testArtist);
    const testAlbum1 = new Album("Yes", "90125", "1983", "Classic Rock", "Studio");
    testDb1.addAlbum(testAlbum1);
    expect(testAlbum1.albumId).toEqual(1);
  });
  test('Test that the addArtist prototype to add an artist to a new db', () => {
    const testDb2 = new MusicDB();
    const testArtist1 = new Artist("Buddy Holly", "Rock & Roll");
    testDb2.addArtist(testArtist1);
    expect(testDb2.artists[0].artist).toEqual
    ("Buddy Holly");
    expect(testDb2.artists[0].artistGenre).toEqual
    ("Rock & Roll");
  });
  test('Test that the addAlbum prototype to add an album to a new db', () => {
    const testDb3 = new MusicDB();
    const testArtist2 = new Artist("Buddy Holly", "Rock & Roll");
    testDb3.addArtist(testArtist2);
    const testAlbum2 = new Album("Buddy Holly", "That'll Be The Day", "1958", "Rock & Roll", "Studio");
    testDb3.addAlbum(testAlbum2);
    expect(testDb3.albums[0].albumArtist).toEqual
    ("Buddy Holly");
    expect(testDb3.albums[0].albumName).toEqual("That'll Be The Day");
    expect(testDb3.albums[0].albumYear).toEqual("1958");
    expect(testDb3.albums[0].albumGenre).toEqual("Rock & Roll");
    expect(testDb3.albums[0].albumType).toEqual("Studio");
    expect(testDb3.albums[0].albumRating).toEqual("")
  });
});