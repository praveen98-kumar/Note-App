import connectDB from "../../utils/connectDB"

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
connectDB();
export default (req, res) => {
  res.statusCode = 200
  res.json({ name: 'John Doe' })
}
