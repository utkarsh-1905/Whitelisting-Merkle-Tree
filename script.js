// import ABI from "./build/contracts/Whitelist.json";

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
const contractAddress = "0xA9934726cF477378D0859bAE80921291F268CA62";

let whitelistContract;

(async () => {
  const res = await fetch("build/contracts/Whitelist.json");
  const ABI = await res.json();
  whitelistContract = new web3.eth.Contract(ABI.abi, contractAddress);
})();
