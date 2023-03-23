import dbConnect from '../../../../lib/dbConnect'
import Categories from '../../../../models/categoryModel'
import Questions from '../../../../models/questionModel'
import { getUser } from '../users/getUserV2'

const getForAdd = async (req, res) => {
  await dbConnect()
  try {
    const user = await getUser(req.headers.cookie)
    const categories = await Categories.find({ type: 'question' })
    //classic users are only classic questions
    //premium users are both and premium questions
    switch (user.planType.toLowerCase()) {
      case 'premium':
        const questionsPremium = await Questions.find({
          published: true,
          QuestionType: { $in: [user.planType.toLowerCase(), 'both'] },
        })
        res.status(200).json({ questions: questionsPremium, categories: categories })

        break

      case 'classic':
        const questionsClassic = await Questions.find({
          published: true,
          QuestionType: { $in: [user.planType.toLowerCase(), 'both'] },
        })
        res.status(200).json({ questions: questionsClassic, categories: categories })

        break

      default:
        res.status(400).json({ questions: [], categories: [] })
        break
    }
  } catch (error) {
    console.log(error)
  }
}

export default getForAdd
