namespace app.Controllers{
  export class MovieDetailsController{
    public movie: app.i.IMovie;

    public removeMovie(){
      this.MovieService.remove(this.movie._id).then(() => {
        this.$state.go('Home');
      });
    }

    constructor(private MovieService: app.Services.MovieService, private CommentService: app.Services.CommentService, private $state: ng.ui.IStateService, private $stateParams: ng.ui.IStateParamsService){
      this.movie = MovieService.getOne($stateParams['id']);
    }
  }
  angular.module('app').controller('MovieDetailsController',MovieDetailsController);
}
