import * as argon2 from 'argon2-browser'

export async function hashPassword(password) {
    try {
      const result = await argon2.hash({
        pass: password,
        salt: new Uint8Array(16),
        time: 3,
        mem: 4096,
        hashLen: 32,
        parallelism: 1,
        type: argon2.ArgonType.Argon2id
      })
      
      return result.encoded
    } catch (error) {
      console.error('Error hashing password:', error)
      throw error
    }
  }