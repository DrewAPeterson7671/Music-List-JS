import { MusicDB } from '../src/music-artist.js';

describe(MusicDB, () => {

  test('should create a new MusicDB object', () => {
    const testDb = new MusicDB();
    expect(testDb).toBeNull();
    // expect(testDb).not.toBeUndefined();
    // expect(testDb.artists).toBe([]);
    // expect(testDb.albums).toBe([]);
    // expect(testDb.artistId).toBe(0);
    // expect(testDb.albumId).toBe(0);
  })
});