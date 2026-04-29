# Pre-Merge Validation System for ZAYVORA_GAME_CODE_VALIDATION_V1
This system is designed to validate the code changes before merging them into the main branch.

## Validation Rules

### Rule 1: Duplicate Function Names

function checkDuplicateFunctionNames(fileContent) {
  const functionNames = fileContent.match(/function\s+([a-zA-Z0-9_]+)\s*\(/g);
  if (functionNames.length > 0) {
    for (const functionName of functionNames) {
      if (fileContent.includes(functionName)) {
        console.error(`Duplicate function name: ${functionName}`);
        return false;
      }
    }
  }
  return true;
}

### Rule 2: Proper Variable Declaration and Initialization

function checkVariableDeclaration(fileContent) {
  const variableDeclarations = fileContent.match(/let|const|var\s+([a-zA-Z0-9_]+)\s*=\s*(.*)/g);
  if (variableDeclarations.length > 0) {
    for (const declaration of variableDeclarations) {
      const [_, variableName, initialValue] = declaration.split(' ');
      if (!initialValue || initialValue.trim() === '') {
        console.error(`Uninitialized variable: ${variableName}`);
        return false;
      }
    }
  }
  return true;
}

### Rule 3: Clear Function Descriptions and Usage Instructions

function checkFunctionDocumentation(fileContent) {
  const functionDescriptions = fileContent.match(/\/\*\s*(.*)\s*\*\//g);
  if (functionDescriptions.length > 0) {
    for (const description of functionDescriptions) {
      if (!description.includes('Usage:')) {
        console.error(`Missing usage instructions for function`);
        return false;
      }
    }
  }
  return true;
}

module.exports = {
  checkDuplicateFunctionNames,
  checkVariableDeclaration,
  checkFunctionDocumentation
};