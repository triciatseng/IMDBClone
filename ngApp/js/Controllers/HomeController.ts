namespace app.controllers {
  export class HomeController {
    public user;
    public movies: Array<app.i.IMovie>;

    constructor(
      private MovieService: app.Services.MovieService,
      private UserService: app.Services.UserService,
      private $state: ng.ui.IStateService
    ){
      this.movies = MovieService.getAll();
      this.user = UserService.status;
    }
  }
  angular.module('app').controller('HomeController', HomeController);
}
