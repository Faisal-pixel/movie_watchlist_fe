import {useState, useEffect} from "react";


export function useMediaQuery(query: string): boolean {
    const [matches, setMatches] = useState<boolean>(false);

    useEffect(() => {
        const mediaQueryList = window.matchMedia(query); // it creates a object for this particular given query.
        // So basically we get a MediaQueryList object that looks like this: MediaQueryList {media: "(max-width: 768px)", matches: true}.
        // So whatever query is passed in, is passed into the media property.
        const listener = (event: MediaQueryListEvent) => setMatches(event.matches); // event.matches is a boolean value that tells us if 
        // the media query is true or false.
        // We basically just add a listener that listens. because we want the window to always listen to the media query.

        // Set initial mathch state
        setMatches(mediaQueryList.matches);

        // What if it doesnt matches at first, then we need to listen
        
        mediaQueryList.addEventListener("change", listener); // So basically, this listens for changes in the media query.

        // Cleanup listener on unmount. Always clean up listeners because they can cause memory leaks.

        return () => mediaQueryList.removeEventListener("change", listener);
    }, [query])

    return matches;
}