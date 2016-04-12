namespace app.Controllers {
  export class GlobalController{
    public status: {_id: string, name: string};

    public logout(){
      this.UserService.logout();
      this.$state.go('Login');
    }

    constructor(private UserService: app.Services.UserService, private $state: ng.ui.IStateService){
      this.status = UserService.status;
    }
  }
  angular.module('app').controller('GlobalController',GlobalController);
}
