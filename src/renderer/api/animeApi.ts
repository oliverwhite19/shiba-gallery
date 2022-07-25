export const getWaifus = () => {
    const params = new URLSearchParams();
    params.append('excludes', '[]');
    return fetch('https://api.waifu.pics/many/sfw/waifu', {
        method: 'POST',
        body: params,
    })
        .then((res) => res.json())
        .then((res) => res.files);
};
