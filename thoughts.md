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
