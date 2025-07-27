import { Storage } from "@plasmohq/storage"

const storage = new Storage({ area: "local" })
let storageReady = false

export interface UserInfo {
  firstName: string
  lastName: string
  age: number
  mobile: string
  email: string
  gender: string
}

/* Dummy Data */
const defaultUsers: UserInfo[] = [
  { firstName: "John", lastName: "Doe", age: 30, mobile: "8376064490", email: "john.doe@yahoo.in", gender: "Male" },
  { firstName: "Tom", lastName: "Ford", age: 23, mobile: "0999038922", email: "tom.form@gmail.com", gender: "Male" },
  { firstName: "Raj", lastName: "Kundra", age: 45, mobile: "489390923", email: "raj@gmail.com", gender: "Male" },
  { firstName: "Emily", lastName: "Clark", age: 28, mobile: "9087654321", email: "emily.clark@example.com", gender: "Female" },
  { firstName: "Sudhanshu", lastName: "S", age: 32, mobile: "9192837465", email: "sudhanshu@mantys.io", gender: "Male" },
  { firstName: "Michael", lastName: "Smith", age: 40, mobile: "8081122334", email: "mike.smith@example.com", gender: "Male" },
  { firstName: "Kriti", lastName: "Arora", age: 29, mobile: "9837456120", email: "kriti@mantys.io", gender: "Female" },
  { firstName: "Arjun", lastName: "Mehta", age: 35, mobile: "9876512345", email: "arjunmehta@example.com", gender: "Male" },
  { firstName: "Ananya", lastName: "Rao", age: 27, mobile: "9008765432", email: "ananyarao@example.com", gender: "Female" },
  { firstName: "David", lastName: "Lee", age: 38, mobile: "9705648392", email: "david.lee@example.com", gender: "Male" }
]

export const storeUserData = async (): Promise<void> => {
  if (storageReady) return
  const existing = await storage.get<UserInfo[]>("userInfo")
  if (!existing) {
    await storage.set("userInfo", defaultUsers)
  }
  storageReady = true
}

export const getUserInfo = async (): Promise<UserInfo[]> => {
  await storeUserData()
  return (await storage.get<UserInfo[]>("userInfo")) || []
}

export const findUserByEmail = async (email: string): Promise<UserInfo | null> => {
  const users = await getUserInfo()
  const inputEmail = email.trim().toLowerCase()
  return users.find((u) => u.email.trim().toLowerCase() === inputEmail) || null
}
