import dbConnect from '../../../../lib/dbConnect'
import Coupon from '../../../../models/couponModel'

export default async function handler(request, response) {
  const { method } = request
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone
  await dbConnect()

  switch (method) {
    case 'GET': //find all coupon
      await Coupon.find({})
        // return success
        .then((result) => {
          response.status(201).send({
            message: 'List of Coupons',
            result,
          })
        })
        // catch error if getting Coupons
        .catch((error) => {
          response.status(500).send({
            message: 'Error getting all coupons',
            error,
          })
        })

      break

    case 'POST': //create coupon
      const coupon = {
        code: request.body.code,
        description: request.body.description,
        type: request.body.type,
        amount: request.body.amount,
        expiryDate: request.body.expiryDate,
        timezone: userTimezone,
        published: request.body.published,
      }

      await Coupon.create(coupon)
        // return success if the new coupon is added to the database successfully
        .then((result) => {
          response.status(201).send({
            message: 'Coupon Created Successfully',
            result,
          })
        })
        // catch error if the new coupon wasn't added successfully to the database
        .catch((error) => {
          response.status(500).send({
            message: 'Error creating coupon item',
            error,
          })
        })

      break

    default:
      response.status(400).json({ success: false })
      break
  }
}
