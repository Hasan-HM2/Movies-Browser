import React, { useEffect, useState } from 'react'

// Hooks
import { useParams } from 'react-router-dom'

// Lybraries
import axios from 'axios'

export default function MovieDetails() {
    const { id } = useParams()
    const [movie, setMovie] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=6131397ffac639fd94093eaee78327b0&language=ar`)
            .then((res) => {
                setMovie(res.data)
                setLoading(false)
            })
            .catch((err) => console.log(err));
    }, [id])
    console.log(movie);

    return (
        <div>
            <h1 style={{ color: 'white' }}>Movie ID is: {id}</h1>
        </div>
    )
}
