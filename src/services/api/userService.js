import users from '../mockData/users.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

class UserService {
  constructor() {
    this.data = [...users]
  }

  async getAll() {
    await delay(300)
    return [...this.data]
  }

  async getById(id) {
    await delay(200)
    const user = this.data.find(user => user.Id === parseInt(id, 10))
    if (!user) {
      throw new Error('User not found')
    }
    return { ...user }
  }

  async create(userData) {
    await delay(400)
    const newUser = {
      ...userData,
      Id: Math.max(...this.data.map(u => u.Id)) + 1,
      followers: 0,
      following: 0,
      posts: 0,
      isOnline: true
    }
    this.data.push(newUser)
    return { ...newUser }
  }

  async update(id, userData) {
    await delay(300)
    const index = this.data.findIndex(user => user.Id === parseInt(id, 10))
    if (index === -1) {
      throw new Error('User not found')
    }
    
    const updatedUser = { ...this.data[index], ...userData }
    delete updatedUser.Id // Prevent Id modification
    updatedUser.Id = this.data[index].Id
    
    this.data[index] = updatedUser
    return { ...updatedUser }
  }

  async delete(id) {
    await delay(300)
    const index = this.data.findIndex(user => user.Id === parseInt(id, 10))
    if (index === -1) {
      throw new Error('User not found')
    }
    
    const deletedUser = { ...this.data[index] }
    this.data.splice(index, 1)
    return deletedUser
  }

  async getSuggested() {
    await delay(250)
    return this.data.slice(0, 3).map(user => ({ ...user }))
  }

  async getOnlineUsers() {
    await delay(200)
    return this.data.filter(user => user.isOnline).map(user => ({ ...user }))
  }

  async follow(userId) {
    await delay(300)
    const user = this.data.find(u => u.Id === parseInt(userId, 10))
    if (user) {
      user.followers += 1
    }
    return { ...user }
  }

  async unfollow(userId) {
    await delay(300)
    const user = this.data.find(u => u.Id === parseInt(userId, 10))
    if (user && user.followers > 0) {
      user.followers -= 1
    }
    return { ...user }
  }
}

export default new UserService()