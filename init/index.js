const mongoose = require("mongoose");
const initData = require("./data");
const Post = require("../models/posts");

main()
    .then((res) => console.log("Connection Succesful"))
    .catch((err) => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/reddit-replica');
}

const initDB = async () => {
    await Post.deleteMany({});
    initData.data = initData.data.map((obj) => ({ ...obj, owner: '6aa3fcc631f6a87b71300e14' }));
    await Post.insertMany(initData.data);
    console.log("Data was initialized");
}

initDB();
