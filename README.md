## Link Deploy

This project was deploy here: [https://x-career-06-team1-be.onrender.com](https://x-career-06-team1-be.onrender.com)

### This project has following structures:

```
myApp
  │─ config
  │   └─ db_config.json
  │─ controller
  │   │─ BoardController.js
  │   │─ CommentController.js
  │   │─ TaskController.js
  │   │─ UploadController.js
  │   │─ UserController.js
  │   └─ WorkSpaceController.js
  │─ DAL
  │   │─ model
  │   │   │─ baseModel.js
  │   │   │─ BoardModel.js
  │   │   │─ CommentModel.js
  │   │   │─ TaskModel.js
  │   │   │─ UploadModel.js
  │   │   │─ UserModel.js
  │   │   └─ WorkSpaceModel.js
  │   │─ schema
  │   │   │─ BoardSchema.js
  │   │   │─ CommentSchema.js
  │   │   │─ TaskSchema.js
  │   │   │─ UploadSchema.js
  │   │   │─ UserSchema.js
  │   │   └─ WorkSpaceSchema.js
  │   └─ database.js
  │─ middleware
  │   │─ Authtoken.js
  │   │─ Upload.js
  │   └─ Validate.js
  │─ public
  │   │─ audios
  │   │   └─ ảo-ảnh.mp3
  │   │─ documents
  │   │   │─ 162448-technology-template-16x9.pptx
  │   │   │─ Getting Started with A1 XLS.xlsx
  │   │   └─ hop-dong-thue-nha-chuan.doc
  │   │─ images
  │   │   │─ 1400470028_cay-du.jpg
  │   │   │─ default-board-background-img.jpg
  │   │   │─ download.jpg
  │   │   │─ naruto-and-sasuke-wallpaper-and-background-image-1366x825-id.jpg
  │   │   └─ pexels.jpg
  │   └─ default-board-background-img.jpg
  │─ router
  │   │─ BoardRouter.js
  │   │─ CommentRouter.js
  │   │─ index.js
  │   │─ TaskRouter.js
  │   │─ UploadRouter.js
  │   │─ UserRouter.js
  │   └─ WorkSpaceRouter.js
  │─ util
  │   └─ WebSockets.js
  └─ app.js
.env
.gitignore
package-lock.json
package.json
```

- db_config.json: File contains code to connect to MongoDB.
- controllers: Folder contains file to take action from folder router and send data to Client.
- DAL: Folder contains file to create data schema.
- Authtoken.js: File contains code to check authentication.
- Upload.js: File contains code to get image data from Client.
- Validate.js: File contains code to check data form from Client.
- audios: Folder contains audio from client send to server.
- documents: Folder contains document from client send to server.
- images: Folder contains image from client send to server.
- router: Folder contains file to create Rest API router path.
- WebSockets.js: File contains code to connect to socket.io for real-time function.
- app.js: File contains code to initialize the server.
- .env: File contains code storing TOKEN_SECRET value.
- .gitignore: File contains code to ignore some folder when pushing project on Github.
- package.json & package-lock.json: File contains libraries code for building the Website.
