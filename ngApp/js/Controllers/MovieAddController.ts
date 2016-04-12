namespace app.Controllers {
  export class MovieAddController {

    public movie: app.i.IMovie;

    public create(){
      this.MovieService.create(this.movie).then((res) => {
        this.$state.go('Home');
      });
    }

    constructor(private MovieService: app.Services.MovieService, private $state: ng.ui.IStateService) {}
  }

  angular.module('app').controller('MovieAddController', MovieAddController);
}
