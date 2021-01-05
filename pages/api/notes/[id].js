import connectDB from "../../../utils/connectDB";
import Note from '../../../models/Note';

connectDB();

export default async (req, res) => {
    const { method, query: { id } } = req;

    switch (method) {
        case "GET":
            try {
                const note = await Note.findById(id);

                if(!note){
                    return res.status(400).json({success: false});
                }
                res.status(200).json({success: true, note});
                
            } catch (error) {
                res.status(400).json({success: false})
            }
            break;
        case "PUT":
            try {
                const note = await Note.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true
                });

                if(!note){
                    return res.status(400).json({success: false});
                }
                res.status(200).json({success: true, note});
                
            } catch (error) {
                res.status(400).json({success: false})
            }
            break;
        case "DELETE":
            try {
                const deleteNote = await Note.deleteOne({ _id: id });

                if(!deleteNote){
                    return res.status(400).json({success: false});
                }
                res.status(200).json({success: true});
                
            } catch (error) {
                res.status(400).json({success: false})
            }
            break;
        default:
            break;
    }
}