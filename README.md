https://patzal.github.io/devcon-pretalx/

# Known issues

- 80-90 percent of the content is dynamic, but there are a few exceptions (days of the conference are hardcoded)
- UI is quick and dirty, the top of the table is ugly on smaller screens
- in the table only the start time of the talks are considered (every talks looks to be of the same length)
- routing was not added, running out of time, hence the back button on the detailed view
- caching is done with localstorage, other strategies might fit better
- some general code quality issues, like code reuse & usage of constants, etc.
- on the deployed version there are 2 headers :-/
