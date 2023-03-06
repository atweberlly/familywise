import dbConnect from '../../../../lib/dbConnect'
import Category from '../../../../models/categoryModel'

export default async function handler(request, response) {
  const { method } = request

  await dbConnect()

  switch (method) {
    case 'GET': //find all Categories
      const type = request.query

      await Category.find(type)
        // return success
        .then((result) => {
          response.status(201).send({
            message: 'List of Categories',
            result,
          })
        })
        // catch error if getting Categories
        .catch((error) => {
          response.status(500).send({
            message: 'Error getting all categories',
            error,
          })
        })

      break

    case 'POST': //create category
      const category = {
        type: request.body.type,
        name: request.body.name,
        description: request.body.description,
      }

      await Category.create(category)
        // return success if the new Category is added to the database successfully
        .then((result) => {
          response.status(201).send({
            message: 'Category Successfully Created',
            result,
          })
        })
        // catch error if the new Category wasn't added successfully to the database
        .catch((error) => {
          response.status(500).send({
            message: 'Error creating category',
            error,
          })
        })

      break

    default:
      response.status(400).json({ success: false })
      break
  }
}
