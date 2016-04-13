namespace app.controllers {
  export class HomeController {
    public user;
    public movies: Array<app.i.IMovie>;

    constructor(
      private MovieService: app.Services.MovieService,
      private UserService: app.Services.UserService,
      private $state: ng.ui.IStateService,
      private $location: ng.ILocationService
    ){
      this.movies = MovieService.getAll();
      this.user = UserService.status;
      if($location.search().code){
        UserService.setToken($location.search().code);
        UserService.setUser();
        $location.search('');
        if($location.hash()) $location.hash('');
      }
    }
  }
  angular.module('app').controller('HomeController', HomeController);
}
