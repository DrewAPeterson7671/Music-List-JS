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
});