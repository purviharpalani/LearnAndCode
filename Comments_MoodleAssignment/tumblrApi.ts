export async function fetchTumblrData(blogName: string, start: number, end: number) {
    const apiUrl = `https://${blogName}.tumblr.com/api/read/json?type=photo&num=${end - start + 1}&start=${start - 1}`;

    try {
        const response = await fetch(apiUrl, { method: "GET" });
        const text = await response.text();

        // The Tumblr API v1 does not return pure JSON. It wraps the JSON inside a function call, so the response is in the form 'tumblr_api_read({});'
        const jsonStart = text.indexOf("{");
        const jsonEnd = text.lastIndexOf("}"); 

        if (jsonStart === -1 || jsonEnd === -1) {
            throw new Error("Invalid JSON format received");
        }

        const jsonText = text.substring(jsonStart, jsonEnd + 1); 
        const jsonData = JSON.parse(jsonText); 

        return jsonData;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}
