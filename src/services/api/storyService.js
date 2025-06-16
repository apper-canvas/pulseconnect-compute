import stories from '../mockData/stories.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

class StoryService {
  constructor() {
    this.data = [...stories]
  }

  async getAll() {
    await delay(300)
    const now = new Date()
    // Filter out expired stories (older than 24 hours)
    const activeStories = this.data.filter(story => {
      const expiresAt = new Date(story.expiresAt)
      return expiresAt > now
    })
    return [...activeStories]
  }

  async getById(id) {
    await delay(200)
    const story = this.data.find(story => story.Id === parseInt(id, 10))
    if (!story) {
      throw new Error('Story not found')
    }
    return { ...story }
  }

  async create(storyData) {
    await delay(400)
    const now = new Date()
    const expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000) // 24 hours from now
    
    const newStory = {
      ...storyData,
      Id: Math.max(...this.data.map(s => s.Id)) + 1,
      viewCount: 0,
      createdAt: now.toISOString(),
      expiresAt: expiresAt.toISOString()
    }
    this.data.unshift(newStory)
    return { ...newStory }
  }

  async update(id, storyData) {
    await delay(300)
    const index = this.data.findIndex(story => story.Id === parseInt(id, 10))
    if (index === -1) {
      throw new Error('Story not found')
    }
    
    const updatedStory = { ...this.data[index], ...storyData }
    delete updatedStory.Id // Prevent Id modification
    updatedStory.Id = this.data[index].Id
    
    this.data[index] = updatedStory
    return { ...updatedStory }
  }

  async delete(id) {
    await delay(300)
    const index = this.data.findIndex(story => story.Id === parseInt(id, 10))
    if (index === -1) {
      throw new Error('Story not found')
    }
    
    const deletedStory = { ...this.data[index] }
    this.data.splice(index, 1)
    return deletedStory
  }

  async view(id) {
    await delay(200)
    const story = this.data.find(s => s.Id === parseInt(id, 10))
    if (story) {
      story.viewCount += 1
    }
    return { ...story }
  }
}

export default new StoryService()