namespace app.Controllers{
  export class MovieDetailsController{
    public movie: app.i.IMovie;
    public comment: app.i.IComment;

    public removeMovie(){
      this.MovieService.remove(this.movie._id).then(() => {
        this.$state.go('Home');
      });
    }

    public createComment(){
      this.comment.movie = this.movie._id;
      this.CommentService.create(this.comment).then((res) => {
        this.movie.comments.push(res);
        this.comment.message="";
        this.comment.user="";
      });
    }

    public removeComment(c:app.i.IComment){
      this.CommentService.remove(c._id).then(() => {
        this.movie.comments.splice(this.movie.comments.indexOf(c),1);
      });
    }

    constructor(private MovieService: app.Services.MovieService, private CommentService: app.Services.CommentService, private $state: ng.ui.IStateService, private $stateParams: ng.ui.IStateParamsService){
      this.movie = MovieService.getOne($stateParams['id']);
    }
  }
  angular.module('app').controller('MovieDetailsController',MovieDetailsController);
}
