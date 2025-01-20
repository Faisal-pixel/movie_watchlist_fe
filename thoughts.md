# Prcoess for designing the edit watchlist page
1. Its going to be a dynamic page. So when user clicks on edit watchlist, it will take them to the edit watchlist page, with the id of the watchlist in the url. https://localhost:3001/watchlist/edit/:watchlist_id
2. generate the metaData by defining the generateMetadata function
3. When a user removes a movie from the watchlist, we can pack their ids into an array and send it to the backend to remove them from the watchlist.

# Process for designing the watchlist details page
1. Its going to be a dynamic page. So when user clicks on a watchlist, it will take them to the watchlist details page, with the id of the watchlist in the url. https://localhost:3001/watchlist/:watchlist_id
2. Write the generateMetadata function to generate the metadata for the page. (title and description)
3. Create the WatchlistDetailsPage async function, get the details of the page

# Process for getting the details of all movies in a watchlist
1. We know we get the ids of the movies right. So I can create an array of promises, and then use Promise.all to get the details of all the movies in the watchlist.

# Process on how to decide whether to show the add to washlist button on a movie or show a checkmarked button when it belongs to watchlist
1. If the route url is /, show the add to watchlist button on the movie card.
2. Then a pop up comes up and user can select the watchlist they want to add the movie to. If the movie already exists in a watchlist, highlight the watchlist that the movie belongs to. ALlow users to select multiple watchlists and clicks the save button.
3. So we want to show dialog when it is on larger screen and drawer when it is on smaller screen.
4. So we will be creating our custom hook
5. Think about how to select multiple watchlists. When a user clicks a watchlist, it greys out and shows checkmark and when user clicks it again, it removes the checkmark.
6. we can use promise.all to batch update the watchlist.
7. So if a user clicks on a watchlist, we add it to an array of selected watchlists. If a user clicks on it again, we remove it from the array of selected watchlists.



If a movie already belongs to a watchlist,dont show the add button.
