const { MerkleTree } = require("merkletreejs");
const keccak = require("keccak256");
const express = require("express");
const app = express();

app.use(express.json());

const whitelist = [
  "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
  "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2",
  "0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db",
  "0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB",
  "0x617F2E2fD72FD9D5503197092aC168c91465E7f2",
  "0x17F6AD8Ef982297579C203069C1DbfFE4348c372",
];
const hashedMembers = whitelist.map((member) => keccak(member));
const tree = new MerkleTree(hashedMembers, keccak, { sortPairs: true });
const root = tree.getRoot().toString("hex");

app.get("/verify", (req, res) => {
  const member = req.body.member;
  const hashMember = keccak(member);
  const verification = tree.getHexProof(hashMember);
  res.status(200).json({
    data: verification,
    root: root,
  });
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
