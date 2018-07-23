const hostUri = () => {
    if (window.location.host.match(/localhost/)) {
        return "http://localhost:3000/api";
    } else {
        return "https://groomly-server.herokuapp.com/api";
    }

}


export const h = hostUri()