const vscode = require('vscode')

module.exports.activate = () => {
	vscode.workspace.onDidChangeTextDocument((event) => {
		const changes = event.contentChanges[0]

		if (
			!changes ||
			(event.document.languageId != 'luau' &&
				event.document.languageId != 'lua')
		) {
			return
		}

		let start = changes.range.start
		let end = changes.range.end

		if (changes.text == '!') {
			start = new vscode.Position(start.line, start.character)
			end = new vscode.Position(end.line, end.character + 2)
		} else if (changes.text == '=' && start.character != 0) {
			start = new vscode.Position(start.line, start.character - 1)
			end = new vscode.Position(end.line, end.character + 1)
		} else {
			return
		}

		const range = new vscode.Range(start, end)

		if (event.document.getText(range) == '!=') {
			vscode.window.activeTextEditor.edit((builder) => {
				builder.replace(range, '~=')
			})
		}
	})
}
