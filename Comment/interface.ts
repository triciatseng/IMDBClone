namespace app.i{
  export interface IComment{
    _id: any;
    message: string;
    datePosted: number;

    user: (string | IUser);
    movie: (string | IMovie);
  }
}
