export async function load_presentation_data() {
    try {
        const data = await fetch('data/pres-data.json');
        const pres_data = await data.json();
        return pres_data;
    }
    catch(error) {
        console.error('Error loading talks:', error);
        const talksGrid = document.querySelector('.talks-grid');
        talksGrid.innerHTML = '<p>Sorry, we could not load the talks at this time. Please try again later.</p>';
    }
    return null;
}