export interface ruling {
    "thumb": string,
    "_id": string,
    "name": string,
    "description": string,
    "category": string,
    "picture": string,
    "lastUpdated": Date,
    "votes": {
        "positive": Number,
        "negative": Number
    }
}
