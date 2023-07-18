import Mongoose from 'mongoose'

let mongoose: typeof Mongoose | null = null
async function getConnection(): Promise<typeof Mongoose> {
  try {
    const url = process.env.DATABASE_URL
    const username = process.env.DATABASE_USER
    const password = process.env.DATABASE_PASSWORD
    if (!mongoose) {
      mongoose = await Mongoose.connect(url, {
        dbName: 'uhuu',
        auth: {
          username,
          password,
        },
      })
    }

    if (mongoose.connection.readyState != 1) mongoose = await Mongoose.connect('')

    mongoose.connection.on('connected', onConnection)
    mongoose.connection.on('error', onError)
    mongoose.connection.on('disconnected', onDisconnected)

    return mongoose
  } catch (error) {
    console.error(error)
    // process.exit(1)
  }
}

async function closeConnection() {
  try {
    await mongoose.connection.close()
  } catch (error) {
    console.log(error)
  }
}

function onConnection() {
  console.log('Connected to mongodb database:', mongoose.connection.db)
}
function onDisconnected() {
  console.log('Disconnected from mongodb')
}
function onError(error) {
  console.log('Fail to connect on mongodb')
  console.error(error)
}

export const Connection = {
  getConnection,
  closeConnection,
}
