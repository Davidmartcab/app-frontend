export class User {
    _id: string = '';
    name: string = '';
    connected: boolean = false;
    
    constructor() {}

    setValues(_id: string, name: string) {
        this._id = _id;
        this.name = name;
    }

}