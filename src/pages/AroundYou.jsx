/* eslint-disable indent */
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

import { Error, Loader, SongCard } from '../components';
import { useGetSongsByCountryQuery } from '../redux/services/shazamCore';

const AroundYou = () => {
  const [country, setCountry] = useState('');
  const [loading, setLoading] = useState('');
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetSongsByCountryQuery(country);
  useEffect(() => {
    axios
      .get('https://geo.ipify.org/api/v2/country?apiKey=at_Dw4QSicpLrN4cE6qBFmQEoXxOYF15')
    //   .get('http://api.ipstack.com/1.187.249.107?access_key=b0710e0bb90ca0b290b027746400c5bf')
      .then((res) => {
        setCountry(res?.data?.location?.country);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
    }, [country]);

  if (isFetching && loading) return <Loader title="Loading songs around you" />;
  if (error && country !== '') return <Error />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold sm:text-3xl text-xl text-white text-left mt-4 mb-10">Around you <span className="font-black">{country}</span></h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default AroundYou;
