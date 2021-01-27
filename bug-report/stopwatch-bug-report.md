## StopWatch Bug Report

### These are the issues I encountered when adding functionality to the stopwatch and was not able to fix them for now:

1. The accordion feature does not work fully. When the result notes are added, only every other element has a properly working accordion (the others have this feature disabled).

![](./screenshots/accordion.jpg)


2. When saving a single time result from the main timer display into local storage (without adding new times upon pressing the next button), it gets saved as an empty array.


### I have managed to fix the following issues:

1. When the input element is filled in but the cancel button is pressed to hide the modal, the data anyway gets saved to the local storage.

![](./screenshots/hiding-modal.jpg) 

2. The saved results notes, displayed as accordion, do not stay on the webpage when refreshing it despite still having this data in local storage.

