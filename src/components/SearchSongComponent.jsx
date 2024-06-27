import React, { useState } from 'react';
import { searchSong, getSongDetails } from './GeniusApiComponent';

function SearchSongComponent() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [details, setDetails] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await searchSong(query);
      setResults(response.data.response.hits);
    } catch (error) {
      console.error('Error searching for song:', error);
    }
  };

  const fetchDetails = async (songId) => {
    try {
      const response = await getSongDetails(songId);
      setDetails(response.data.response.song);
    } catch (error) {
      console.error('Error fetching song details:', error);
    }
  };

  return (
    <div>
      <h1>Genius API Song Search</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a song..."
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {results.map((result) => (
          <li key={result.result.id}>
            {result.result.full_title}
            <button onClick={() => fetchDetails(result.result.id)}>Get Details</button>
          </li>
        ))}
      </ul>
      {details && (
        <div>
          <h2>{details.full_title}</h2>
          <p>{details.lyrics}</p>
        </div>
      )}
    </div>
  );
}

export default SearchSongComponent;
