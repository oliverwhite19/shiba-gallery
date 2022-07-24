export const getShibas = () => fetch('http://shibe.online/api/shibes?count=10').then((res) => res.json());
