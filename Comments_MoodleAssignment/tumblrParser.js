"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseTumblrData = parseTumblrData;
function parseTumblrData(data) {
    if (!data || !data.tumblelog || !data.posts) {
        console.log("Invalid data received");
        return;
    }
    var blogInfo = {
        title: data.tumblelog.title,
        name: data.tumblelog.name,
        description: data.tumblelog.description,
        totalPosts: data.posts.length,
    };
    console.log("Title: ".concat(blogInfo.title));
    console.log("Name: ".concat(blogInfo.name));
    console.log("Description: ".concat(blogInfo.description));
    console.log("Total Posts: ".concat(blogInfo.totalPosts, "\n"));
    data.posts.forEach(function (post, index) {
        if (post["photo-url-1280"]) {
            console.log("".concat(index + 1, ". ").concat(post["photo-url-1280"]));
        }
        if (post.photos) {
            post.photos.forEach(function (photo) {
                console.log("   ".concat(photo["photo-url-1280"]));
            });
        }
    });
}
