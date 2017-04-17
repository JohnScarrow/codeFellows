### Install Atom Text Editor

Now it's time to install Atom Text Editor, a sophisticated text editor for code, markup, and prose.

To get started, download [Atom](https://atom.io/) and run the installer. Again, go with the default installation options, unless you really know you want to change something.

Once installed, use the Start Menu to launch Atom.

### `atom` & `apm` (shell commands)

**atom**

You'll find it insanely useful to open files and directories into Atom from the Terminal.

To verify Atom is wired up correctly, run the `atom` command from your Git-Bash terminal.

If Atom opens, you're good to go.

If Atom does not open, please notify an instructor or TA in your class Slack channel.

**apm**

Once you've verified that your `atom` shell command is functional, run the following command in your terminal, from any directory, to install the base packages which will help add additional functionality to your editor.

- `apm install open-in-browser minimap highlight-selected linter linter-eslint tree-view-git-status file-icons`

This will install the following packages:
1. Open In Browser: `ctrl-alt-q` hotkey to open your HTML page in the browser from Atom
2. Mini-Map: Installs a mini map (useful for seeing your code at a high level) in the right hand column of the editor window
3. Highlight Selected: Highlights all instances of a word or phrase when one instance in double-clicked or cursor-highlighted

### Associate Atom with Git

It's important to establish a default editor with Git, as it's the program that will be used to open up all of your files.

Type the following command in your terminal:
`git config --global core.editor "atom --wait"`


### [⇐ Previous](1_terminal.md) | [Next ⇒](3_git.md)
