namespace app.i {
    export interface IUser {
        _id: any;
        email: string;
        password: string;
        name: string;

        comments?: Array <string>
    }
}
