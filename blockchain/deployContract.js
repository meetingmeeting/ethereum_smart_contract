const candidates = require('./candidates.js');
const fs = require('fs');
const web3 = require('./web3Client.js');
const code = fs.readFileSync('ibcs.sol').toString();
const solc = require('solc');
const compiledCode = solc.compile(code);

console.log(compiledCode);
const abiDefinition = JSON.parse(compiledCode.contracts[':Ibcs'].interface);
const VotingContract = web3.eth.contract(abiDefinition);
const byteCode = compiledCode.contracts[':Ibcs'].bytecode;
const deployedContract = VotingContract.new(candidates, { data: byteCode, from: web3.eth.accounts[0], gas: 4700000 });

module.exports = deployedContract;
