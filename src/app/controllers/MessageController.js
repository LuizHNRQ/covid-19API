const { Message, User } = require('../models')

class MessageController {
  async create(request, response) {
    try {
      const { title, message, userId } = request.body

      const messageResponse = await Message.create({
        title,
        message,
        user_id: userId,
      })

      return response.status(201).json(messageResponse)
    } catch (error) {
      console.log(error)
      return response
        .status(500)
        .json({ message: 'Erro ao processar requisição' })
    }
  }

  async findAll(request, response) {
    try {
      const messages = await Message.findAll({
        order: [['created_at', 'ASC']],
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['id', 'name'],
          },
        ],
      })

      return response.status(200).json(messages)
    } catch (error) {
      console.log(error)
      return response
        .status(500)
        .json({ message: 'Erro ao processar requisição' })
    }
  }
}

module.exports = new MessageController()
