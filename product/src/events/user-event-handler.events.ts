import uniqueValuesConstants from "../constants/unique-values.constants";
import User from "../models/user.model";

/** UserEventHandler event class holds methods related to User model. */

class UserEventHandler {
  private async createUser(userInfo: any): Promise<void> {
    try {
      const { userId, firstName, lastName } = userInfo;
      const newlyUserInstance = User.build({
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
      await User.findOneAndUpdate(userId, {
        firstName,
        lastName,
      });
    } catch (err) {
      console.log("error", err);
    }
  }
  async deleteUser(userInfo: any): Promise<void> {
    try {
      const { userId } = userInfo;
      await User.findOneAndDelete(userId);
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
