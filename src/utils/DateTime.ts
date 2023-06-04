const DateFormattedPrimary = (value:string) => {
    const d = new Date(value);
    const date = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
    const month = d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1;
    return `${date}/${month}/${d.getFullYear()}`;
};

export {
    DateFormattedPrimary
};
