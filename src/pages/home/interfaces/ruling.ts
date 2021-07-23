export interface ruling {
    "thumb": string,
    "_id": string,
    "name": string,
    "description": string,
    "category": string,
    "picture": string,
    "lastUpdated": Date,
    "formatDate":String,
    "votes": {
        "positive": Number,
        "negative": Number,
        "positive_percentage":Number,
        "negative_percentage":Number

    }
}
