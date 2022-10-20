const { kanbanBoardUpdateValidate } = require("../middleware/Validate.js");
const KanbanBoardModel = require("../model/KanbanBoardModel.js");
class KanbanBoardController {
    createKanbanBoard = async (req, res) => {
        const newKanbanBoard = new KanbanBoardModel();
        newKanbanBoard.name = req.body.name;
        newKanbanBoard.workSpaceID = req.body.workSpaceID;

        const kanbanBoard = await newKanbanBoard.save();
        res.send(kanbanBoard);
    }
    getAllKanbanBoards = (req, res) => {
        KanbanBoardModel.find().exec((err, kanbanBoards) => {
            if (err) {
                res.send("Khong the lay thong tin kanbanBoards");
            } else {
                // console.log("Lay thanh cong thong tin tat ca kanbanBoards");
                // console.log(kanbanBoards);
                res.json(kanbanBoards);
            }
        });
    };
    getKanbanBoardById = (req, res) => {
        KanbanBoardModel.find({ _id: req.query.id }).exec((err, kanbanBoard) => {
            if (err) {
                res.send("Khong the lay thong tin kanbanBoard");
            } else {
                // console.log("Lay thanh cong thong tin kanbanBoard");
                // console.log(kanbanBoard);
                res.json(kanbanBoard);
            }
        });
    };
    updateKanbanBoardById = (req, res) => {
        const { value, error } =kanbanBoardUpdateValidate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        KanbanBoardModel.findOneAndUpdate(
            { _id: req.query.id },
            value,
            { new: true },
            (err) => {
                if (err) {
                    res.send("Da xay ra loi khi update thong tin");
                } else {
                    res.send("Update thong tin thanh cong");
                }
            }
        );
    };
    deleteKanbanBoardById = (req, res) => {
        KanbanBoardModel.findOneAndDelete({ _id: req.query.id }, (err) => {
            if (err) {
                res.send("Da co loi xay ra khi delete KanbanBoard");
            } else {
                res.send("Xoa KanbanBoard thanh cong");
            }
        });
    };
    getAllTicketsOfAllKanbanBoards = async (req, res) => {
        const agg = [
            {
                $lookup: {
                    from: "kanbanBoards",
                    localField: "_id",
                    foreignField: "kanbanBoardID",
                    as: "tickets"
                }
            }
        ]
        var result = await TicketModel.aggregate(agg)
        res.send(result)
        res.send(result.length)
    };
  

   
}
module.exports = KanbanBoardController;