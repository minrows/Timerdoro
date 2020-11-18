// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "timerdoro" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('timerdoro.helloWorld', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		const editor = vscode.window.activeTextEditor;
		let seconds = 0;

		if(!editor) {
			var minute = 25;
		} else {
			var minute = Number(editor.document.getText(editor.selection));
			if (minute === 0) {
				minute = 25;
			}
		}
		vscode.window.showInformationMessage('Timer of '+ minute + ' mins started');
		startTimer(minute, seconds);
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}




function startTimer(min: number, sec: number) : void {
	let counter = { min: min, sec: sec }; 
	let statusBar = vscode.window.createStatusBarItem();



	let intervalId = setInterval(() => {
			if (counter.sec - 1 === -1) {
				counter.min -= 1;
				counter.sec = 59;
			} else {
				counter.sec -= 1;
			}

			if (counter.min === 0 && counter.sec === 0) {
				vscode.window.showInformationMessage('Time for break ;)');
				clearInterval(intervalId);
			}

			statusBar.text = counter.min + ':'+ counter.sec ;
			statusBar.show();

		}, 1000);


}


