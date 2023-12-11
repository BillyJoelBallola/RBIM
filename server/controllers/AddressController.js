import { HTTP_STATUS } from '../helper/httpStatus.js';
import { addressModel } from '../models/AddressModel.js'

export const getAllAddress = async (req, res) => {
  try {
    const address = await addressModel.getAllAddress()
    return res.status(HTTP_STATUS.OK).json(address);
  } catch (error) {
    return res.json('Internal Server Error');
  }
}