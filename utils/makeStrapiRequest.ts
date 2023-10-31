import axios from "axios";

export const makeStrapiRequest = axios.create({
    baseURL: 'http://localhost:1337/api',
    headers: {
        Authorization: `${'bearer ' + '5447cb1d13ff23dd294f154b90808e2ceddfcef962ff675ac45804e7821735ff814103dbe3e7019a5f70b708a01019c0b7f5828318c4663e9ecd0f899626762328cdb5bdc1e00bd1b2baacdb23f950bae5c2dfa6174ed0d5123aac54d652438d509e620be773210d88728d144bbc783f0b9fac0c6737b30f3a798983bb8572e6'}`
    }
})