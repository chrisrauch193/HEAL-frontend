## When creating new branch (feautre)
```bash
git checkout main
git pull main
git checkout -b username/feature-name
```

## Commit your code regularly
Check what files are in commit (red is not in commit, green is in commit)
```bash
git status
```

Add all files you want to commit
```bash
git add filename
```

To add everything (be careful with this)
```bash
git add .
```

Commit all the files you add
```bash
git commit -m "Commit message"
```

## Once you finish committing code to your feature branch you can push it to the Github website
```bash
git push origin username/feature-name
```

## Pull Requests and Merging
Once feature branch is push to Github website you can create pull request and merge the code here https://github.com/chrisrauch193/HEAL-frontend/pulls

Be careful when resoving conflicts

## View extra useful features
View git commit history
```bash
git log
```

View differences between different files, commits, etc...
```bash
git diff
```