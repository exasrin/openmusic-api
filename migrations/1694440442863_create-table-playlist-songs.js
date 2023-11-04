exports.up = (pgm) => {
  pgm.createTable('playlist_songs', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    playlist_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    song_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
  });

  pgm.addConstraint('playlist_songs', 'unique_playlist_id_song_id', 'UNIQUE(playlist_id, song_id)');

  pgm.addConstraint('playlist_songs', 'fk_playlist.playlist_id_playlist.id', 'FOREIGN KEY(playlist_id) REFERENCES playlists(id) ON DELETE CASCADE');
  pgm.addConstraint('playlist_songs', 'fk_playlist.song_id_songs.id', 'FOREIGN KEY(song_id) REFERENCES songs(id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
  pgm.dropTable('playlist_songs');
  pgm.dropConstraint('playlist_songs', 'fk_playlist.playlist_id_playlist.id');
  pgm.dropConstraint('playlist_songs', 'fk_playlist.song_id_songs.id');
};
