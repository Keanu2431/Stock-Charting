Lumpkin's Charts
--------------------------
TL:DR
This project in essence is a stock chart that allows you to search up stocks and view the desired stock. Add stocks to the watchlist and remove them from the watchlist, and also allowing people to see different time frames of the chart. It givess users an idea of where they may want to buy in or sell based off of the key levels created by my algorithm
---------------------------


For this project I wanted to create something to help me practice and display my knowledge on the intricacies of OOP,APIs,Asynchronus Functions,Working With Libraries and Using Mathematical Algorythms alongside the Procedural Paradigm of programming.

I used classes to encapsulate my important functions in order to create something similar to a module.

The fetch API was used to make HTTP calls followed by chaining promises and a series of methods to extract only the needed data returned from the request.

In order for the project to work without major error I had to catch errors and apply if statements to make sure each potential error would be handled properly allowing the application to flow smoothly.

For this project I had to find a suitable library for the visual aspects of my application and find a REST API that would be easy to work with to get the data, for that I went with JSCharting and Alphavantage.co

By building a algorithmic modal based off of the S&P 500 I was able to find resistance/support/key levels of a stock. However it doesn't work for all scenarios due to the fact that the data from the API wasn't the best.

In this project I've ran into some errors, notably I was attempting to assign variables with information from the HTTP calls but that wasn't working so it led me to realize that this isnt a feasible approach and decided to delegate the majority of the applications procedures that dealt with the API data by chaining promises. Another shortcoming is that the API im using only allows for 5 API calls per minute so it led to errors that would normally not have existed. 
