namespace app.i{
  export interface IComment{
    _id: any;
    name: string;
    message: string;
    datePosted: number;

    user: (string | IUser);
    movie: (string | IMovie);
  }
}
