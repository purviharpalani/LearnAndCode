export function parseTumblrData(data: any) {
    if (!data || !data.tumblelog || !data.posts) {
        console.log("Invalid data received");
        return;
    }
    
    const blogInfo = {
        title: data.tumblelog.title,
        name: data.tumblelog.name,
        description: data.tumblelog.description,
        totalPosts: data.posts.length,
    };
    
    console.log(`Title: ${blogInfo.title}`);
    console.log(`Name: ${blogInfo.name}`);
    console.log(`Description: ${blogInfo.description}`);
    console.log(`Total Posts: ${blogInfo.totalPosts}\n`);
    
    data.posts.forEach((post: any, index: number) => {
        // handles single-image posts, where 'photo-url-1280' is directly a property of the 'post' object.
        if (post["photo-url-1280"]) {
            console.log(`${index + 1}. ${post["photo-url-1280"]}`);
        }
        // handles multi-image posts, where images are inside an array 'photos'
        if (post.photos) {
            post.photos.forEach((photo: any) => {
                console.log(`   ${photo["photo-url-1280"]}`);
            });
        }
    });
}
