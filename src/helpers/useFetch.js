import { useState, useEffect } from 'react';

export default function useFetch({ url }) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() =>
        fetch(url)
            .then(response => response.json())
            .then(response => setData(response))
            .catch((error) => setError(error)),
        [url]);

    return { data, error };
}