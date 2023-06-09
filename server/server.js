const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { authMiddleware } = require('./utils/auth');
const multer = require('multer');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');



const PORT = process.env.PORT || 3001;
const app = express();

const storage = multer.diskStorage({
  destination: 'uploads/', 
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});


const upload = multer({ storage: storage });

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.post('/api/upload', upload.single('image'), (req, res) => {
  const file = req.file;

  res.json({ message: 'File uploaded successfully' });
})


// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
  };
  
// Call the async function to start the server
  startApolloServer();
