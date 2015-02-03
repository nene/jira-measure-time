# JIRA measure time

## Motivation

I'd like to measure the time it takes to complete the development, review or some
other activity on JIRA issue and then log the time in JIRA.

To achieve that I wrote a JavaScript snippet that you can paste into [Tampermonkey][].


## Quick Start

Grab the script from `jira-measure-time.js`


## You Need More Help?

1. Install [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en)
2. Open up Tampermonkey and create a new script
3. Copy paste the script from `jira-measure-time.js` or
   link it with `@requires` from you userscript definition.
4. **Modify @include URL in the header to match your Bitbucket url**
5. Navigate to your Bitbucket commits and behold...

[Tampermonkey]: https://chrome.google.com/webstore/detail/tampermonkey/
