const baseUrl = "https://api.github.com";

const httpHeaders = {
    "Accept" : "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "luxtechpulse",
}

export async function fetchGithubProfile(author) {
    if(!author.image && author.github) {
        const url = new URL(author.github);
        if(url.hostname == "github.com") {
            // if is a github link
            let username = url.pathname.replace(/^\/(\w+)/, '$1');
            
            try {
                const response = await fetch(`${baseUrl}/users/${username}`, { method: "GET", headers: httpHeaders });
                if(!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }
                const json = await response.json();
                author['image'] = json['avatar_url'];
            } catch(error) {
                console.error(error.message);
            }
        }
    }
    return author;
}