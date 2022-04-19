const { MerkleTree } = require("merkletreejs");
const keccak = require("keccak256");
const express = require("express");
const app = express();

app.use(express.json());

const whitelist = ["0x0", "0x1", "0x2", "0x3", "0x4", "0x5", "0x6"];
const hashedMembers = whitelist.map((member) => keccak(member));
const tree = new MerkleTree(hashedMembers, keccak);
const root = tree.getRoot().toString("hex");

app.get("/verify", (req, res) => {
  const member = req.body.member;
  const hashMember = keccak(member);
  const proof = tree.getProof(hashMember);
  const verification = tree.verify(proof, hashMember, root);
  res.send(verification);
});

app.post("/add", (req, res) => {
  try {
    const newMember = req.body.member;
    whitelist.push(newMember);
    res.status(200).json({
      status: "ok",
    });
  } catch (e) {
    console.log(e);
  }
});

app.listen(3005, () => {
  console.log("Listenening on port 3005");
});
