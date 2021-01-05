import connectDB from "../../../utils/connectDB";
import Note from '../../../models/Note';

connectDB();

export default async (req, res) => {
    const { method } = req;

    switch (method) {
        case "GET":
            try {
                const notes = await Note.find({});

                if(!notes){
                    return res.status(400).json({success: false});
                }
                res.status(200).json({success: true, notes});
                
            } catch (error) {
                res.status(400).json({success: false})
            }
            break;
        case "POST":
            try {
                const note = await Note.create(req.body);

                if(!note){
                    return res.status(400).json({success: false});
                }
                res.status(200).json({success: true, note});
                
            } catch (error) {
                res.status(400).json({success: false})
            }
            break;
        default:
            break;
    }
}