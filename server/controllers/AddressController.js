import { HTTP_STATUS } from '../helper/httpStatus.js';
import { addressModel } from '../models/AddressModel.js'

export const getAllAddress = async (req, res) => {
  try {
    const address = await addressModel.getAllAddress()
    return res.json({ success: true, data: address});
  } catch (error) {
    return res.json({ success: false, message: 'Internal Server Error'});
  }
}