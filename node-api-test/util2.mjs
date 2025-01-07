import util from 'node:util';

function bbb() {
  const callSites = util.getCallSites();

  callSites.forEach((callSite, index) => {
    console.log(`CallSite ${index + 1}:`);
    console.log(`Function Name: ${callSite.functionName}`);
    console.log(`Script Name: ${callSite.scriptName}`);
    console.log(`Line Number: ${callSite.lineNumber}`);
    console.log(`Column Number: ${callSite.column}`);
    console.log()
  });
}

function aaa() {
  bbb();
}

aaa(); 
