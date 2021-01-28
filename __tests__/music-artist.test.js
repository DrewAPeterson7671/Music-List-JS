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
    const testDb = new MusicDB();
    expect(testDb.albumId).toEqual(0);
  });
});