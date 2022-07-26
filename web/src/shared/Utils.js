const basicFormatTime =
    { hour: 'numeric', hour12: true, minute: 'numeric' };
const basicFormatDate = { day: '2-digit', month: '2-digit', year: 'numeric' };

export const getDisplayedDate = (date) => {
    let dateObj = new Date(date);
    let today = new Date().getDay();
    let day = dateObj.getDay();
    let res = "";
    switch (today - day) {
        case 0:
            res = dateObj.toLocaleString('en-US', { ...basicFormatTime });
            break;
        case 1:
            res = "yesterday";
            break;
        default:
            res = dateObj.toLocaleDateString('en-US', basicFormatDate);
    }
    return res;

}

export const formatTimeFromDate = (date) => {
    let dateObj = new Date(date);
    return dateObj.toLocaleString('en-US', { ...basicFormatTime });
}

export const getCurrentDate = () => {
    return new Date().toLocaleString('en-US', {
        // day: 'numeric', month: 'numeric', year: 'numeric',
        ...basicFormatDate,
        ...basicFormatTime, second: 'numeric'
    });
}

export const getYesterdayDate = () => {
    return new Date(new Date().getTime() - 24 * 60 * 60 * 1000).toLocaleString('en-US', {
        // day: 'numeric', month: 'numeric', year: 'numeric',
        ...basicFormatDate,
        ...basicFormatTime
    });
}