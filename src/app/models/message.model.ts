export class Message {
    _id: string;
    from: string;
    to: string;
    message: string;
    date: Date;

    constructor(_id: string, from: string, to: string, message: string, date: Date) {
        this._id = _id;
        this.from = from;
        this.to = to;
        this.message = message;
        this.date = date;
    }
}