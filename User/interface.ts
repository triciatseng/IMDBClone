namespace app.i {
    export interface IUser {
        _id: any;
        email: string;
        password: string;
        name: string;
        movies?: Array <string>;
        comments?: Array <string>;
        facebook: {id:string, token: string};
    }
}
