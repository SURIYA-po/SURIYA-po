import React, { useRef, useState } from 'react';
import { CiSearch } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import './searchButton.css';
// Import the new CSS file
 
// Assuming this service is available (from previous context)
import projectService from '../adminpanel/services/projectService'; 

function SearchButton({ onMessage }) {
    
    // Refs for DOM manipulation
    const searchFieldRef = useRef(null);
    const searchInputRef = useRef(null);
    const pairRef = useRef(null);
    const searchRef = useRef(null); // Ref remains unused but kept as requested

    // State for UI and Search Data
    const [searchVisibles, setSearchVisibles] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const toggleSearch = () => {
        const newState = !searchVisibles;
        setSearchVisibles(newState);
        onMessage(newState);
        
        if (newState) {
            // OPEN State
            searchFieldRef.current.style.maxWidth = '300px';
            pairRef.current.style.backgroundColor = "#70e000";
            searchRef.current.style.backgroundColor = "#70e000"; // Added back for completeness
            searchInputRef.current.focus();
        } else {
            // CLOSE State
            searchFieldRef.current.style.maxWidth = '0px';
            pairRef.current.style.backgroundColor = "#1b1c1d";
            searchRef.current.style.backgroundColor = "#3c3c3c"; // Added back for completeness
            
            // Clear search state on closing the search bar
            setSearchTerm(''); 
            setResults([]); 
        }
    };
    
    // --- New Feature: Handle Search API Call ---
    const handleSearch = async () => {
        if (searchTerm.trim() === '') {
            setResults([]);
            return;
        }

        setIsLoading(true);
        try {
            // Call the service function with the current search term
            const response = await projectService.getProjects(searchTerm);
            
            // Format results for display in the textarea (Title and ID snippet)
            const formattedResults = response.data.map(
                (item, index) => `${index + 1}. ${item.title} (ID: ${item._id.slice(-4)})` 
            ).join('\n'); 

            setResults(formattedResults);
            
        } catch (error) {
            console.error("Error fetching search results:", error);
            setResults("Error fetching results. Check console.");
        } finally {
            setIsLoading(false);
        }
    };
    
    // Trigger search when Enter is pressed
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    // Prepare content for the textarea based on current state
    const textareaContent = (() => {
        if (isLoading) return "Searching...";
        if (searchTerm === '') return 'Type a keyword and press Enter...';
        if (results.length > 0) return results;
        return 'No results found.';
    })();


    return (
        // Added wrapper for vertical alignment of results area
        <div className='search-container'> 
            <div className='pair' ref={pairRef}>
                <div className="search-field" ref={searchFieldRef}>
                    <input 
                        type="text" 
                        placeholder="Search projects..." 
                        ref={searchInputRef}
                        onChange={(e) => setSearchTerm(e.target.value)} // Capture input
                        onKeyDown={handleKeyDown} // Trigger search on Enter
                        value={searchTerm}
                    />
                </div>
                
                <div className='search' ref={searchRef}>
                    {searchVisibles ? (
                        // On Cross click, toggle and clear
                        <RxCross2 onClick={toggleSearch} />
                    ) : (
                        // On Search click, open the bar
                        <CiSearch onClick={toggleSearch} />
                    )}
                </div>
            </div>

            <br /><br />
            {searchVisibles && (
                <div className='textareas'>
                    <textarea
                        name="searchResults"
                        id="searchResults"
                        placeholder="Searched Items"
                        readOnly
                        rows={6} // Increased rows for better visibility
                        cols={30}
                        // Display the dynamic content
                        value={textareaContent}
                    />
                </div>
            )}
        </div>
    )
}

export default SearchButton;