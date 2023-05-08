import uniqueValuesConstants from "../constants/unique-values.constants";
import { Types } from "../database";
import { UserModel } from "../model";

/**
 * Below UserEventHandler class based on Facade design pattern.
 * */

/** UserEventHandler event class holds methods related to User model. */
class UserEventHandler {
  private async createUser(userInfo: any): Promise<void> {
    try {
      const { userId, firstName, lastName } = userInfo;
      const newlyUserInstance = UserModel.build({
        userId,
        firstName,
        lastName,
      });
      await newlyUserInstance.save();
    } catch (err) {
      console.log("error", err);
    }
  }
  private async updateUser(userInfo: any): Promise<void> {
    try {
      const { userId, firstName, lastName } = userInfo;
      await UserModel.findOneAndUpdate(
        { userId: new Types.ObjectId(userId) },
        {
          firstName,
          lastName,
        }
      );
    } catch (err) {
      console.log("error", err);
    }
  }
  async deleteUser(userInfo: any): Promise<void> {
    try {
      const { userId } = userInfo;
      await UserModel.findOneAndDelete({ userId: new Types.ObjectId(userId) });
    } catch (err) {
      console.log("error", err);
    }
  }
  async operation(eventName: any, data: any): Promise<void> {
    switch (eventName) {
      case uniqueValuesConstants.USER_CREATE_EVENT:
        this.createUser(data);
        break;
      case uniqueValuesConstants.USER_DELETE_EVENT:
        this.deleteUser(data);
        break;
      case uniqueValuesConstants.USER_UPDATE_EVENT:
        this.updateUser(data);
        break;
      default:
        break;
    }
  }
}

export default new UserEventHandler();
