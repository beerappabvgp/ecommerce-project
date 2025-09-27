import mongoose from 'mongoose'

console.log('🔄 Testing MongoDB Atlas connection...')

const testConnection = async () => {
  try {
    // Test connection to MongoDB Atlas
    const connectionString = "mongodb+srv://bharath:Bharath1234@cluster0.m9campr.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0"

    console.log('Attempting to connect...')
    await mongoose.connect(connectionString)

    console.log('✅ SUCCESS: Database connected successfully!')
    console.log('📊 Database name:', mongoose.connection.db.databaseName)
    console.log('🔗 Connection state:', mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected')

    // Test a simple database operation
    const collections = await mongoose.connection.db.listCollections().toArray()
    console.log('📋 Collections found:', collections.length)

    await mongoose.disconnect()
    console.log('🔌 Connection closed successfully')

  } catch (error) {
    console.error('❌ FAILED to connect to database')
    console.error('Error message:', error.message)
    console.error('Error code:', error.code)
    console.error('Error codeName:', error.codeName)

    if (error.message.includes('authentication failed')) {
      console.log('💡 This looks like an authentication issue. Please check:')
      console.log('   - Username: bharath')
      console.log('   - Password: Bharath1234')
      console.log('   - Database access permissions in MongoDB Atlas')
    }
  }
}

testConnection()
