import dbConnect from '../../../../lib/dbConnect'
import Category from '../../../../models/categoryModel'

export default async function handler(request, response) {
  const {
    query: { id },
    method,
  } = request

  await dbConnect()

  switch (method) {
    case 'GET' /* Get a model by its ID */:
      await Category.findById(id)

        //return success
        .then((result) => {
          response.status(201).send({
            message: 'Success',
            result,
          })
        })

        // catch error
        .catch((error) => {
          response.status(500).send({
            message: 'Error getting category',
            error,
          })
        })

      break

    case 'PUT' /* Edit a model by its ID */:
      let newValues = {
        type: request.body.type,
        name: request.body.name,
        description: request.body.description,
      }
      //update newValues by id
      await Category.findByIdAndUpdate(id, newValues, {
        new: true,
        runValidators: true,
      })
        // return success message if new category is updated successfully
        .then((result) => {
          response.status(201).send({
            message: 'Category is successfully updated',
            result,
          })
        })
        // catch error if new category wasn't updating successfully
        .catch((error) => {
          response.status(500).send({
            message: 'Error updating',
            error,
          })
        })

      break

    case 'DELETE' /* Delete a model by its ID */:
      await Category.deleteOne({ _id: id })

        //return success
        .then((result) => {
          response.status(201).send({
            message: 'Category is Successfully deleted',
            result,
          })
        })

        // catch error
        .catch((error) => {
          response.status(500).send({
            message: 'Error deleting category item',
            error,
          })
        })
      break

    default:
      response.status(400).json({ success: false })
      break
  }
}
