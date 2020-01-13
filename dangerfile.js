// Import the feedback functions
import { danger, fail, warn } from "danger"

// Request a assignee and a reviewer for pull requests
if (danger.github.pr.assignee === null || danger.github.requested_reviewers === null) {
  fail("You forget to assign yourself to your PR or you forgot to include other team members as reviewers!")
}

// Request a CHANGELOG entry
const hasChangelog = danger.git.modified_files.includes("CHANGELOG.md")
if (!hasChangelog) {
  warn("Please add a changelog entry for this release.")
}