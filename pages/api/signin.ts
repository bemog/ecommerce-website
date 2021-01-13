import { NextApiRequest, NextApiResponse } from 'next'
import { connectToDB } from 'db/connect'
import jwt from 'jsonwebtoken'

export default async function signin(req: NextApiRequest, res: NextApiResponse) {
  const { db } = await connectToDB()

  const { username, email, password } = req.body

  try {
    const nameCheck = await db.collection('users').findOne({ username })
    const emailCheck = await db.collection('users').findOne({ email })

    if (nameCheck || emailCheck) {
      res.status(406).send({})
    }

    const user = {
      username,
      email,
      password,
      cart: [],
      history: [],
      tokens: [],
    }

    const token = jwt.sign({ _id: username }, process.env.JWT_SECRET)

    user.tokens = user.tokens.concat({ token })

    await db.collection('users').insertOne(user)

    res.status(201).send({ user, token })
  } catch (error) {
    res.status(400).send({})
  }
}