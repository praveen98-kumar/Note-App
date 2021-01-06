export const getAllNote = async () => {
    const res = await fetch('/api/notes', {
        method: "GET"
    })
    const { data } = await res.json();
    return data;
}

export const getNote = async (id) => {
    const res = await fetch(`/api/notes/${id}`, {method: 'GET'});

    const { data } = await res.json();
    return data;
}