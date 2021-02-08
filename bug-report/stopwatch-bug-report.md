## StopWatch Bug Report

### These are the issues I encountered when adding functionality to the stopwatch and was not able to fix them for now:

1. When the input element is filled in but the cancel button is pressed to hide the modal, the data anyway gets saved to the local storage and displayed on the page.

![](./screenshots/hiding-modal.jpg) 

2. The saved results notes, displayed as accordion, do not stay on the webpage when refreshing it despite still having this data in local storage.

3. The accordion feature does not work fully. When the result notes are added, only every other element has a properly working accordion (the others have this feature disabled).

![](./screenshots/accordion.jpg)

4. When saving a single time result from the main timer display into localStorage (without adding new times upon pressing the next button), it gets saved as an empty array.

### Later I have managed to fix all the above issues on the fix-localStorage branch in the following way:

1. Added a "type" attribute with a value of button.

2. Created the renderTimerResults() function to render the elements of the accordion with the data retrieved from localStorage and triggered this function if the localStorage with 'myResults' key exists.

3. Used the the renderTimerResults() function and within this function the renderAccordionFeature() function is triggered. 

4. Created the displayOneResult() function that upon saving the item drops the result from the timer display into an Li tag and pushes it into the lastTimesList array (this is a similar way as in the displayNextResult() function).


