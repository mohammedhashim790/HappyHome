import {UserTable} from "./Interfaces/Interfaces";



export class UserParams{

  /**
   * UserTable Reference to Store User Details
   * @private
   */
  private static userParams:UserTable | null;

  static get UserParams():UserTable | null{
    return this.userParams;
  }

  static set UserParams(userParams:UserTable | null){
    this.userParams = userParams;

  }

  /**
   * LogOut UserParams
   * @constructor
   */
  static LogOut(){
    this.userParams = null;
  }

}
