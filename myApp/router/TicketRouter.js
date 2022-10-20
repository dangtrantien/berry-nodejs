const express=require('express')
const TicketRouter=express.Router()
const TicketController=require('../controller/TicketController.js')

const ticketController=new TicketController()

TicketRouter.get('/',ticketController.getAllTickets)
TicketRouter.get('/getTicketById',ticketController.getTicketById)
TicketRouter.post('/createTicket',ticketController.createTicket)
TicketRouter.put('/updateTicketById',ticketController.updateTicketById)
TicketRouter.delete('/deleteTicketById',ticketController.deleteTicketById)

module.exports=TicketRouter;