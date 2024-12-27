# Prcoess for designing the edit watchlist page
1. Its going to be a dynamic page. So when user clicks on edit watchlist, it will take them to the edit watchlist page, with the id of the watchlist in the url. https://localhost:3001/watchlist/edit/:watchlist_id
2. generate the metaData by defining the generateMetadata function
3. When a user removes a movie from the watchlist, we can pack their ids into an array and send it to the backend to remove them from the watchlist.

# Process of passing the value to update when a user edits  a watchlist
1. If the watchlist name is the same as the previous one and the description is the same as the previous one, we don't need to send a request to the backend.
2. If the watchlist name is different from the previous one, we send a request to the backend to update the watchlist name. 