const fetcher = async (url) => {
    const res = await fetch(url, {
        method: 'GET',
        credentials: 'same-origin',
    });

    return res.json();
};

export default fetcher;
