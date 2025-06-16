import posts from '../mockData/posts.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

class PostService {
  constructor() {
    this.data = [...posts]
  }

  async getAll() {
    await delay(400)
    return [...this.data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  }

  async getById(id) {
    await delay(200)
    const post = this.data.find(post => post.Id === parseInt(id, 10))
    if (!post) {
      throw new Error('Post not found')
    }
    return { ...post }
  }

  async create(postData) {
    await delay(500)
    const newPost = {
      ...postData,
      Id: Math.max(...this.data.map(p => p.Id)) + 1,
      likes: 0,
      comments: 0,
      shares: 0,
      createdAt: new Date().toISOString()
    }
    this.data.unshift(newPost)
    return { ...newPost }
  }

  async update(id, postData) {
    await delay(300)
    const index = this.data.findIndex(post => post.Id === parseInt(id, 10))
    if (index === -1) {
      throw new Error('Post not found')
    }
    
    const updatedPost = { ...this.data[index], ...postData }
    delete updatedPost.Id // Prevent Id modification
    updatedPost.Id = this.data[index].Id
    
    this.data[index] = updatedPost
    return { ...updatedPost }
  }

  async delete(id) {
    await delay(300)
    const index = this.data.findIndex(post => post.Id === parseInt(id, 10))
    if (index === -1) {
      throw new Error('Post not found')
    }
    
    const deletedPost = { ...this.data[index] }
    this.data.splice(index, 1)
    return deletedPost
  }

  async like(id) {
    await delay(200)
    const post = this.data.find(p => p.Id === parseInt(id, 10))
    if (post) {
      post.likes += 1
    }
    return { ...post }
  }

  async unlike(id) {
    await delay(200)
    const post = this.data.find(p => p.Id === parseInt(id, 10))
    if (post && post.likes > 0) {
      post.likes -= 1
    }
    return { ...post }
  }

  async getTrending() {
    await delay(300)
    return this.data
      .filter(post => post.hashtags && post.hashtags.length > 0)
      .slice(0, 6)
      .map(post => ({ ...post }))
  }
}

export default new PostService()