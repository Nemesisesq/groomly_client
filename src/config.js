const hostUri = () => {
//eslint-disable-next-line
    if (location.host.match(/localhost/)) {
        return "http://localhost:3000/api";
    } else {
        return "https://groomly.herokuapp.com/api";
    }

}


export const h = hostUri()