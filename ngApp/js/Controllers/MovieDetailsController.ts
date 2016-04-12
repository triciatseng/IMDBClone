namespace app.Controllers{
  export class MovieDetailsController{
    public movie: app.i.IMovie;
  }
  angular.module('app').controller('MovieDetailsController',MovieDetailsController);
}
