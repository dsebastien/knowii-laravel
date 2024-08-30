# Contributing to Knowii

As a contributor, here are the guidelines we would like you to follow.

## General guidelines

Third party contributions are more than welcome! Here you'll find all the information you need to get started.

First, make sure to read the [general guidelines](https://github.com/knowii-oss/.github/blob/main/CONTRIBUTING.md).

## Don't know where to start?

Take a look at the project's open [issues](https://github.com/DeveloPassion/knowii/issues).
This contains tons of ideas to help us out.

## Submission guidelines

### Submitting an issue

Before you submit an issue, please search the issue tracker, maybe an issue for your problem already exists and the discussion might inform you of workarounds readily available.

We want to fix all the issues as soon as possible, but before fixing a bug we need to reproduce and confirm it. In order to reproduce bugs, we will systematically ask you to provide a minimal reproduction scenario.
Having a live, reproducible scenario gives us a wealth of important information without going back & forth to you with additional questions like:

- version of Knowii used
- a use-case that fails

A minimal reproducible scenario allows us to quickly confirm a bug (or point out coding problem) as well as confirm that we are fixing the right problem.

We will be insisting on a minimal reproducible scenario in order to save maintainers time and ultimately be able to fix more bugs.

Unfortunately, we are not able to investigate / fix bugs without a minimal reproduction, so if we don't hear back from you we are going to close an issue that doesn't have enough info to be reproduced.

You can file new issues by filling out our [new issue form](https://github.com/DeveloPassion/knowii/issues/new).

### Forking

Knowii's development is done using a forking model with Pull Requests (PRs), so the very first thing you should do is create your fork: https://help.github.com/articles/fork-a-repo/

### Integrating changes to your fork

Once you're found what you want to contribute to Knowii, then:

- Create a feature branch in your fork: `git checkout -b my-new-branch main`
- Configure the upstream
  - `git remote add upstream https://github.com/DeveloPassion/knowii.git`
  - reference: https://help.github.com/articles/configuring-a-remote-for-a-fork/

From then on, you may work on your feature at your own rhythm and commit/push to your fork.

Don't forget to write test cases (or adapt existing ones) for your changes!

### Keeping in sync

While you're busy developing your feature, and before you propose them, make sure that your fork is up-to-date with the upstream.

First, download the latest commits:

- `git fetch upstream`
- or `git remote update -p`

Then, integrate those changes to your fork (whatever branch you're working on).

First try a fast-forward merge: `git merge --ff-only upstream/main`

- that command tells git to merge the upstream branch ONLY if you local branch can be "fast forwarded" to the upstream branch (i.e., if it hasn't diverged)

If the fast-forward merge fails, then you'll have to rebase with the upstream (i.e., align): `git rebase -p upstream/main`

- the `-p` options tells git to preserve merges. This prevents git from linearizing the commits being rebased

Once done, make sure the history looks like what you expect: `git log --graph --oneline --decorate --date-order --color --boundary upstream/main`

Certainly so before creating a Pull Request (PR). If you don't do it then we'll request it anyways.

References:

- https://stackoverflow.com/questions/6406762/why-am-i-merging-remote-tracking-branch-origin-develop-into-develop
- https://help.github.com/articles/syncing-a-fork/

### Proposing your changes by submitting a Pull Request (PR)

Before you propose your changes, make sure that your fork is up-to-date with the upstream (see previous section) and that the whole test suite passes.

At this point, you'll probably want to do a rebase in order to squash your commits and align with our [commit message conventions](#commit) (you can always fix those during the rebase or using `git commit --amend ...`).

The idea there is to let you make as many commits as you want with or without respecting our commit message conventions, as long as you clean those when you're ready to send us a PR.

Once done, you may submit a new Pull Request (PR): https://github.com/DeveloPassion/knowii/pull/new/main

Note that if you didn't follow this, we'll probably ask for a cleanup/rebase before we merge your changes.

### Committing with Commitizen

To help you respect our [commit message conventions](#commit), you can use [Commitizen](https://github.com/commitizen/cz-cli).
Instead of running `git commit`, use `npm run commit` or `npm run cm`.
You'll be prompted to fill in any required fields and your commit message will be formatted according to our guidelines.

You can still use `git commit`, but be sure to follow the guidelines, otherwise [Commitlint](https://github.com/marionebl/commitlint) will throw an error during your commit.

### Workflow

Here's a summary of the workflow we recommend to contribute to Knowii along with the commands to use.

Workflow and commands:

- fork: through GitHub
- clone: `git clone https://github.com/<username>/knowii`
- add upstream: `git remote add upstream https://github.com/DeveloPassion/knowii`
  - that way you can fetch new commits that have been integrated into Knowii's main repository
- create a feature branch for whatever you want to work on
  - `git checkout -b feature/<name>`
  - you may include a specific issue number in the branch name (e.g., 24-awesome-feature)
- publish the feature branch on your fork
  - `git push -u origin feature/<name>`
- work on your feature branch
  - checkout the branch: `git checkout feature/<name>`
  - make changes: `git add ...` then `git commit -m '...'`
  - regularly commit the changes: `git commit -a -m 'refactor(core): made it great again'`
- push the changes to your fork's corresponding feature branch: `git push`
- update your fork/feature branch with upstream changes
  - first fetch the changes: `git fetch upstream`
    - alternative: `git remote update -p`
  - then merge or rebase
    - try fast-forward merge: `git merge --ff-only upstream/main`
    - rebase if fast-forward failed: `git rebase -p upstream/main`
  - see "Keeping in sync" section for details!
- create your Pull Request (PR); see "Proposing your changes by submitting a Pull Request (PR)" for details

Sometimes you might want to work with others on some feature.

In any case, after PRs are merged into Knowii, you can normally forget about the feature branches and delete those to keep your fork clean

- `git branch -d feature/<name>`

_It's important to keep in mind that anytime you want to continue working on an ongoing feature branch or start a new one, you'll need to fetch from upstream and merge (fast-forward) or rebase. Without this, you'll quickly fall out of sync and end up with nightmarish merges..._

Also, consider your fork to be transient. If you get lost at some point, then you can always rebase and accept everything from the upstream. If you still get lost with that and can't go back to a clean state, then just shelve your changes or create a patch file, then delete your fork/local repo and start over :)

Rinse and repeat :)

## <a name="commit"></a> Commit Message Guidelines

We have precise rules over how our git commit messages can be formatted. This leads to **more readable messages** that are easy to follow when looking through the **project history**.
We also use the git commit messages to generate our changelog.

We're using the following commit message format: `type(scope): subject`

#### Type & Scope

Each commit must specify a valid type and scope. Use the `npm run commit` command to make sure you comply.

#### Subject

The subject contains succinct description of the change:

- use the imperative, present tense: "change" not "changed" nor "changes"
- do not capitalize first letter
- do not place a period `.` at the end
- entire length of the commit message must not go over 50 characters
- describe what the commit does, not what issue it relates to or fixes
- **be brief, yet descriptive** - we should have a good understanding of what the commit does by reading the subject

### Body

Just as in the **subject**, use the imperative, present tense: "change" not "changed" nor "changes".
The body should include the motivation for the change and contrast this with previous behavior.

### Footer

The footer should contain any information about **Breaking Changes** and is also the place to
[reference GitHub issues that this commit closes](https://help.github.com/articles/closing-issues-via-commit-messages/).

**Breaking Changes** should start with the word `BREAKING CHANGE:` with a space or two newlines.
The rest of the commit message is then used for this.
