export class User {
    _id: string = '';
    name: string = '';
    
    constructor() {}

    setValues(_id: string, name: string) {
        this._id = _id;
        this.name = name;
    }

}