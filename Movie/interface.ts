namespace app.i{
  export interface IMovie{
    _id: any;
    title: string;
    director: string;
    imgURL: string;

    user: (string | IUser);
  }
}
