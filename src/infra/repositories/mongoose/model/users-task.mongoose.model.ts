import Mongoose, { Types } from 'mongoose'

const Schema = new Mongoose.Schema({
  name: String,
  email: String,
  password: String,
  tasks: [
    {
      _id: Types.ObjectId,
      title: String,
      description: String,
      status: String,
      endDate: Date,
    },
  ],
})

export const UserTasksMongooseModel = Mongoose.model('users-taks', Schema)
