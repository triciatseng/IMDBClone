namespace app.Controllers {
  export class MovieUpdateController{
    public movie: app.i.IMovie;

    public update(){
      this.MovieService.update(this.movie).then((res) => {
        this.$state.go('Movie Details',{id:this.movie._id});
      });
    }

    constructor(private MovieService: app.Services.MovieService, private $state: ng.ui.IStateService, private $stateParams: ng.ui.IStateParamsService){
        this.movie = MovieService.getOne($stateParams['id']);
    }
  }
  angular.module('app').controller('MovieUpdateController', MovieUpdateController);
}
