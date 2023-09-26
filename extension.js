const vscode = require('vscode');

function activate() {
	vscode.workspace.onDidChangeTextDocument((event) => {
		const changes = event.contentChanges[0]

		if (changes && changes.text == '=' && changes.range.start.character != 0) {
			const start = new vscode.Position(changes.range.start.line, changes.range.start.character - 1)
			const end = new vscode.Position(changes.range.end.line, changes.range.end.character + 1)
			const range = new vscode.Range(start, end)

			if (event.document.getText(range) == '!=') {
				vscode.window.activeTextEditor.edit((builder) => {
					builder.replace(range, '~=')
				})
			}
		}
	})
}

module.exports = {
	activate
}
