/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-first-prop-new-line */
/* eslint-disable no-unused-vars */
/* eslint-disable keyword-spacing */
/* eslint-disable indent */
/* eslint-disable jsx-quotes */
/* eslint-disable react/jsx-indent */
import { useDispatch, useSelector } from 'react-redux';

import { Error, Loader, SongCard } from '../components';
import { genres } from '../assets/constants';

import { selectGenreListId } from '../redux/features/playerSlice';
import { useGetSongsByGenreQuery } from '../redux/services/shazamCore';

const Discover = () => {
    const dispatch = useDispatch();
    const { activeSong, isPlaying, genreListId } = useSelector((state) => state.player);
    const { data, isFetching, error } = useGetSongsByGenreQuery(genreListId || 'POP');
    
    if(isFetching) return <Loader title="Loading songs..." />;
    if(error) return <Error />;
    
    const genreTitle = genres.find(({ value }) => value === genreListId)?.title;
    
    return(
        <div className='flex flex-col'>
            <div className='w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10'>
                <h2 className='font-bold text-3xl text-white text-left'>Discover {genreTitle}</h2>
                <select
                  onChange={(e) => dispatch(selectGenreListId(e.target.value))}
                  value={genreListId || 'pop'}
                  className='bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5'
                >
                    {genres.map((genre) => <option key={genre.value} 
                    value={genre.value}>{genre.title}</option>)}
                </select>
            </div>

            <div className='flex flex-wrap sm:justify-start justify-center gap-8'>
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

export default Discover;
