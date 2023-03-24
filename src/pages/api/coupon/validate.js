import dbConnect from '../../../../lib/dbConnect'
import Coupon from '../../../../models/couponModel'

const getCouponByCode = async (request, response) => {
  const { coupon } = request.body

  const today = new Date().toISOString().split('T')[0]

  try {
    await dbConnect()

    const result = await Coupon.findOne({
      code: coupon,
      published: true,
      expiryDate: { $gte: new Date(today) },
    })

    response.status(201).send({
      message: 'List of Coupons',
      result,
    })
  } catch (error) {
    response.status(500).send({
      message: 'Error getting coupon by code',
      error,
    })
  }
}

export default getCouponByCode
