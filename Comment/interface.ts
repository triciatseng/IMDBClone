namespace app.i{
  export interface IComment{
    _id: string;
    name: string;
    message: string;
    datePosted: number;

    user: (string | IUser);
    movie: (string | IMovie);
  }
}
