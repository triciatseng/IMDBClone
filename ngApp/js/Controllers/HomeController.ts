namespace app.controllers {
  export class HomeController {
    public movies: Array<app.i.IMovie>;

    constructor(
      private MovieService: app.Services.MovieService
    ){
      this.movies = MovieService.getAll();
    }
  }
  angular.module('app').controller('HomeController', HomeController);
}
