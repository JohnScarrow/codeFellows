### Install Git

Check if you already have <a href="http://git-scm.com/" target="_blank">Git</a> installed by running the following command.

```
git --version
```

You'll see something like this if it's installed. If it is, skip to Git Config, otherwise continue below.

![](https://i.imgur.com/jBSs1qR.png)

Figure out what version of OS X you are running. From the Apple menu, choose About This Mac. The version of OS X installed appears directly below “OS X.” Click the version number to see the build number. You can also use <a href="https://support.apple.com/en-us/HT203001" target="_blank">System Information</a> to find these numbers.

![](https://support.apple.com/library/content/dam/edam/applecare/images/en_US/osx/yos_build_version.png)

If you are running:

- 10.6 Snow Leopard: download and install this: <a href="http://sourceforge.net/projects/git-osx-installer/files/git-2.3.5-intel-universal-snow-leopard.dmg/download" target="_blank">git-*-snow-leopard</a>

- 10.7 Lion: download and install this <a href="http://sourceforge.net/projects/git-osx-installer/files/git-2.3.5-intel-universal-snow-leopard.dmg/download" target="_blank">git-*-snow-leopard</a>

- 10.8 Mountain Lion: download and install this <a href="http://sourceforge.net/projects/git-osx-installer/files/git-2.3.5-intel-universal-snow-leopard.dmg/download" target="_blank">git-*-snow-leopard</a>

- 10.9 Mavericks: download and install this <a href="http://sourceforge.net/projects/git-osx-installer/files/git-2.5.3-intel-universal-mavericks.dmg/download" target="_blank">git-*-mavericks</a>

- 10.10 Yosemite: continue below

**NOTE:** You will need to change your install permissions to be able to install Git. The installer will prompt you to do so if necessary.

Using Homebrew, you can install Git, the version control system of choice among choosy developers.

Version control systems let programmers share and collaborate on code. With Git, multiple programmers can work on the same files, and Git keeps track of who made what changes, when. Git is usually used with a website, GitHub, that stores code (in "repositories") and lets programmers review and discuss changes before they are added. In short, Git makes everyone's lives easier.

To get started, run the following command.
```
brew install git
```

Once it is fully installed, run the following command.

```
git --version
```

And you'll see something like this.

![](https://i.imgur.com/jBSs1qR.png)

### Git Config

You're on the home stretch now! :racehorse:

Like artists, programmers sign their work. Let's configure Git to sign your commits with your name and email address.

Sign up for an account at Github <a href="https://github.com" target="_blank">here</a>.

**WARNING:** Before running the following commands, replace `YOUR FULL NAME` and `YOUR EMAIL ADDRESS` with the name and email from <a href="https://github.com/settings/profile" target="_blank">your GitHub account</a>.

```
git config --global user.name 'YOUR FULL NAME'
git config --global user.email 'YOUR EMAIL ADDRESS'
```

The terminal does not send success messages, in order to double check that you have successfully assigned your username and email:

```
git config --list
```

Your terminal should output the following lines:

```
user.email='YOUR EMAIL ADDRESS'
user.name='YOUR FULL NAME'
```

### Congratulations!

You have now completed Step 3 of 9 in the Code 201 pre-work. Please follow the README link below to complete the remaining steps (4-9).

### [⇐ Previous](3_atom.md) | [README ⇒](../../../../)
