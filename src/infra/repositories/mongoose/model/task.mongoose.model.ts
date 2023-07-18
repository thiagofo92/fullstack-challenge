import Mongoose from 'mongoose'

const Schema = new Mongoose.Schema({
  _id: String,
  tasks: [
    {
      title: String,
      description: String,
      status: String,
      endDate: Date,
    },
  ],
})

// export const TaskMongooseModel = Mongoose.model('users-taks', Schema)
