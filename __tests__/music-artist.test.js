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