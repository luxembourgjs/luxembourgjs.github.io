import { fetchGithubProfile } from "../api/github.js";
async function load_authors(talk) {
    let fetch_authors_promises = [];
    talk.authors.forEach(author => {
        fetch_authors_promises.push(fetchGithubProfile(author));
    });

    talk.authors = await Promise.all(fetch_authors_promises);
    return talk;
}

export async function load_data() {
    try {
        const data = await fetch('data/pres-data.json');
        const pres_data = await data.json();
        let result = { slides: []};
        let fetch_result = [];
        
        pres_data.slides.forEach((talk, index) => {
            fetch_result.push(load_authors(talk));
        });
        result['slides'] = await Promise.all(fetch_result);
        return result;
    }
    catch(error) {
        console.error('Error loading talks:', error);
        const talksGrid = document.querySelector('.talks-grid');
        talksGrid.innerHTML = '<p>Sorry, we could not load the talks at this time. Please try again later.</p>';
    }
    return null;
}