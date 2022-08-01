import {UserTable} from "./Interfaces/Interfaces";



export class UserParams{

  private static userParams:UserTable | null;

  static get UserParams():UserTable | null{
    return this.userParams;
  }

  static set UserParams(userParams:UserTable | null){
    this.userParams = userParams;

  }

  static LogOut(){
    this.userParams = null;
  }

}
