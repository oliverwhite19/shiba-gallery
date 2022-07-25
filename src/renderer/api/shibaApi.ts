export const getShibas = () =>
    fetch('http://shibe.online/api/shibes?count=30').then((res) => res.json());
