import { responseMessages, statusCodes, uniqueValues } from "../constants";
import { Types } from "../database";
import jwtTokenHelper from "../helpers/jwt-token.helper";
import { ControllerResponse } from "../helpers/response.helper";
import queueProducer from "../queues/queue-producer";
import Seller, { SellerAttrs } from "../models/seller.model";
import sellerRepository from "../repository/seller.repository";
import { log } from "console";
/** Seller service class holds all methods related to User model. */
class SellerService {
  private static instance: SellerService;

  /**
   * The Singleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  private constructor() {}

  /**
   * The Singleton class defines the `getInstance` method that lets clients access
   * the unique singleton instance.
   */
  public static getInstance(): SellerService {
    if (!SellerService.instance) {
      SellerService.instance = new SellerService();
    }
    return SellerService.instance;
  }

  /**
   * @param sellerDetails content all required information to create new seller.
   * @return newly created seller.
   * */
  async createNewSeller(
    sellerDetails: SellerAttrs
  ): Promise<ControllerResponse> {
    const newlyCreatedSeller = await sellerRepository.createNewSeller(
      sellerDetails
    );

    /**
     * Push newlyCreated seller info inside queue.
     * */
    await queueProducer.publishMessage(
      "seller-info",
      newlyCreatedSeller,
      uniqueValues.SELLER_CREATE_EVENT
    );

    return {
      success: uniqueValues.TRUE,
      status: statusCodes.SUCCESS,
      message: responseMessages.SUCCESSFULLY_SIGNUP,
      data: newlyCreatedSeller,
    };
  }

  /**
   * @param sellerDetails content all required information to login new seller.
   * @return jwt token.
   * */
  async loginSeller(
    email: string,
    password: string
  ): Promise<ControllerResponse> {
    /** Fetch the seller details based on email address. */
    const isSellerPresent = await sellerRepository.getSellerDetailByEmail(
      email
    );

    /** Check password match with stored password or not. */
    if (
      !isSellerPresent ||
      !(await Seller.correctPassword(password, isSellerPresent.password))
    )
      return {
        success: uniqueValues.FALSE,
        status: statusCodes.UN_AUTHENTICATION,
        message: responseMessages.INVALID_LOGIN_DETAILS,
      };

    const newJwtToken = await jwtTokenHelper.jwtTokenGenerator({
      sellerId: isSellerPresent._id,
    });

    return {
      success: uniqueValues.TRUE,
      status: statusCodes.SUCCESS,
      message: responseMessages.SUCCESSFULLY_LOGIN,
      data: { newJwtToken },
    };
  }

  /**
   * @param sellerId sellerId of logged in seller.
   * @return seller detail based on sellerId.
   * */
  async getSellerDetailBySellerId(
    sellerId: Types.ObjectId
  ): Promise<ControllerResponse> {
    const sellerDetailsBySellerId =
      await sellerRepository.getSellerDetailBySellerId(sellerId);
    return {
      success: uniqueValues.TRUE,
      status: statusCodes.SUCCESS,
      message: responseMessages.SUCCESSFULLY_PROFILE_GET_BY_SELLER_ID,
      data: sellerDetailsBySellerId,
    };
  }

  /**
   * @param sellerId sellerId of logged in seller.
   * @return seller detail based on sellerId.
   * */
  async getSellerDetailOfLoggedInSeller(
    sellerId: Types.ObjectId
  ): Promise<ControllerResponse> {
    const sellerDetailsBySellerId =
      await sellerRepository.getSellerDetailOfLoggedInSeller(sellerId);

    return {
      success: uniqueValues.TRUE,
      status: statusCodes.SUCCESS,
      message: responseMessages.SUCCESSFULLY_PROFILE_GET_OF_LOGGED_IN_SELLER,
      data: sellerDetailsBySellerId,
    };
  }

  /**
   * @param sellerId sellerId of logged in seller.
   * @return update seller detail based on sellerId.
   * */
  async updateSellerDetailBySellerId(
    sellerId: Types.ObjectId,
    sellerDetails: any
  ): Promise<ControllerResponse> {
    const updatedSellerDetails =
      await sellerRepository.updateSellerDetailBySellerId(
        sellerId,
        sellerDetails
      );

    /**
     * Push updatedSellerDetails seller info inside queue.
     * */
    await queueProducer.publishMessage(
      "seller-info",
      updatedSellerDetails,
      uniqueValues.SELLER_UPDATE_EVENT
    );

    return {
      success: uniqueValues.TRUE,
      status: statusCodes.SUCCESS,
      message: responseMessages.SUCCESSFULLY_PROFILE_UPDATED,
      data: updatedSellerDetails,
    };
  }

  /**
   * @param sellerId sellerId of logged in seller.
   * @return deleted seller detail based on sellerId.
   * */
  async deleteSellerDetailBySellerId(
    sellerId: Types.ObjectId
  ): Promise<ControllerResponse> {
    const deletedSellerDetails =
      await sellerRepository.deleteSellerDetailBySellerId(sellerId);

    /**
     * Push deletedSellerDetails seller info inside queue.
     * */
    await queueProducer.publishMessage(
      "seller-info",
      deletedSellerDetails,
      uniqueValues.SELLER_DELETE_EVENT
    );

    return {
      success: uniqueValues.TRUE,
      status: statusCodes.SUCCESS,
      message: responseMessages.SUCCESSFULLY_PROFILE_DELETED,
      data: deletedSellerDetails,
    };
  }
}

export default SellerService.getInstance();
