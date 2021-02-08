# Praca domowa - 3

[My StopWatch - With Added JS Functionality and Data Saved in localStorage](https://malgorzata-niemczyk.github.io/jfdzr2-homework-3/src/index.html)

This is a homework activity that I completed while learning a JavaScript module on a Front-end Developer course at InfoShareAcademy. The aim of the activity was to add the functionalities to a stopwatch app using JavaScript:

Required functionalities:

Start - to start the timer

Stop - to stop the timer

Pause - to pause the timer

Reset - to reset the timer results without saving

Next - to add another timer, and the previous timer result is displayed below the main timer. (As a simulation of a situation when one runner gets into a finish line and then the timer is started for another runner)

Save - to save the timer results into localStorage

## Dependencies To Take Into Account

* The **Save** button cannot be pressed until the **Stop** button is pressed
* After pressing the **Pause** button, the timer can be resumed using either the **Start** or **Pause** button
* After pressing the **Save** button, all the current timer results are cleared and the timer is ready to be reused

## Saving The Timer Results

The results should be saved into localStorage.

There should be a possibility to give a name to the timer results that are to be saved.

The displayed timer results should use the accordion feature, that is, when the **name** of the saved result is clicked, the timer results should be shown below 

## Bonus

* Displaying the timer in a format like on real stopwatches (including milliseconds)
* The **STOP** button is not visible until after the **START** button is pressed
* The **SAVE** button is not visible until after the **STOP** button is pressed


### Extra Bonus

* Saving data into Firebase

## Scores for The Task

Working stopwatch and all its functionalities: 8 points

Basic functionalities including START, PAUSE, RESET: 3 points (that is, without NEXT, STOP and SAVE)

Bonuses: 3 points

Extra Bonus: 1 point
