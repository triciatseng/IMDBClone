namespace app.i{
  export interface IMovie{
    _id: any;
    title: string;
    director: string;
    imgURL: string;
    rating?: Array<number>;
    user: (string | IUser);
    comments: [string | IComment];
  }
}
