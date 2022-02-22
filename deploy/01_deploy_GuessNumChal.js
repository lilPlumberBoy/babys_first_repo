module.exports = async ({getNamedAccounts, deployments}) => {
   const {deploy} = deployments;
   const {account0, account1} = await getNamedAccounts();
   await deploy('GuessTheNumberChallenge', {
           from: account0 ,
     log: true,
     gaslimit: 4000000,
     value: 10000000,
   });
 };
 module.exports.tags = ['GuessTheNumberChallenge'];

