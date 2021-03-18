
let undostack = []; // this array will contain all the "undone" variables/actions
let redostack = []; // this array will contain all the "redone" variables/actions



//
// This function is initiate the function to execute
//
// funcObject is the temp variable that is returned from the function. When a manager enters a beverage id to the removed beverage
// this function will start. It adds the beverage according to the ID to the removed list
function doit(funcObj) {
    funcObj.execute(); // add beverage to removed list
    undostack.push(funcObj); // push variable containing the functions
    redostack = []; // empty redo array
}

//
// This function will "undo" the latest action.
//
// It removes the latest placed beverages in the removed list
function undo() {
    funcObj = undostack.pop(); // takes the latest variable executed variable in the
    funcObj.unexecute(); // Remove beverage to the removed list
    redostack.push(funcObj); // Push function-object into the redo-stack
    setRemovedBev(); // update the removed beverage list
}

//
// This function will "redo" the latest undone-action.
//
// It adds backs the latest placed beverages in the removed list
function redo() {
    funcobj = redostack.pop(); // takes the latest variable un-executed variable in the
    funcobj.reexecute(); // Adds beverage to removed list
    undostack.push(funcobj); //push function-object into the undo-stack
    setRemovedBev(); // update the removed beverage list
}