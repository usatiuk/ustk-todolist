export const API_ROOT = "/__";

let token = null;

export function setToken(_token) {
    token = _token;
}

export function getToken() {
    return token;
}

export function mongoObjectId() {
    // eslint-disable-next-line
    const timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
    return (
        timestamp +
        "xxxxxxxxxxxxxxxx"
            // eslint-disable-next-line
            .replace(/[x]/g, () => ((Math.random() * 16) | 0).toString(16))
            .toLowerCase()
    );
}
