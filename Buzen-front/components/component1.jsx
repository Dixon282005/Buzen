import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TrackPlayer = () => {
    const [trackData, setTrackData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const options = {
            method: 'GET',
            url: 'https://soundcloud-api3.p.rapidapi.com/get/track',
            params: { id: '979505833' },
            headers: {
                'x-rapidapi-key': 'e8fef2776cmsh05be7ef0cbf4f13p122676jsnf7317bf6c2d8',
                'x-rapidapi-host': 'soundcloud-api3.p.rapidapi.com'
            }
        };

        const fetchTrack = async () => {
            try {
                const response = await axios.request(options);
                console.log(response.data); // Verifica la respuesta completa en la consola
                setTrackData(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchTrack();
    }, []);

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h1>Reproduciendo Pista</h1>
            {trackData && (
                <div>
                    <h2>{trackData.title}</h2>
                    <img src={trackData.artworkUrl} alt={trackData.title} />
                    <p>Artista ID: {trackData.artistId}</p>
                    <p>Género: {trackData.genre}</p>
                    <p>Reproducciones: {trackData.playbackCount}</p>
                    <audio controls>
                        <source src={trackData.stream_url} type="audio/mpeg" />
                        Tu navegador no soporta el elemento de audio.
                    </audio>
                </div>
            )}
        </div>
    );
};

export default TrackPlayer;
