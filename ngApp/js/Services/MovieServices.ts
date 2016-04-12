namespace app.Services {
  interface IMovieResource extends ng.resource.IResource<IMovieResource>,app.i.IMovie{}
  interface IMovieClass extends ng.resource.IResourceClass<IMovieResource>{}

  export class MovieService{
    private MovieResource: IMovieClass;

    public getAll(){
      return this.MovieResource.query();
    }

    public getOne(id:string){
      return this.MovieResource.get({id:id});
    }

    public create(movie:app.i.IMovie){
      return this.MovieResource.save(movie).$promise;
    }

    public update(movie:app.i.IMovie){
      return this.MovieResource.update({id:movie._id},{title:movie.title,director:movie.director,imgURL:movie.imgURL}).$promise;
    }

    public remove(id:any){
      return this.MovieResource.delete({id:id}).$promise;
    }

    constructor(private $resource:ng.resource.IResourceService){
      this.MovieResource = <IMovieClass>$resource('/api/v1/movies/:id', null, {
        'update': {method: 'PUT'}
      });
    }
  }
  angular.module('app').service('MovieService', MovieService);
}
