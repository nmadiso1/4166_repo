// blogService.js
// This module handles blog post CRUD operations

import { join } from "path";
import fs from "fs/promises";
import { format } from "date-fns";
import { nextTick } from "process";

// Filepath for posts.json. Use this for reading/writing posts.
const postsFile = join(process.cwd(), "posts.json");

/**
 * Reset posts.json: clear all posts and set nextId back to 1.
 */
export async function resetPosts() {
  const emptyData = {
    nextId: 1,
    posts: [],
  };

  await fs.writeFile(postsFile, JSON.stringify(emptyData, null, 2), "utf8");
}

/**
 * Add a new post with a unique ID and timestamp.
 * @param {string} title - Post title
 * @param {string} content - Post content
 * @returns {object} The newly created post object
 */
export async function createPost(title, content) {
  let data = await fs.readFile(postsFile, "utf8");
  data = JSON.parse(data);
  let newId = data.nextId;
  const timestamp = format(new Date(), "y-M-d h:m aaa");

  const newPost = {
    id: newId,
    title: title,
    content: content,
    timestamp: timestamp,
  };
  data.nextId++;
  data.posts.push(newPost);
  await fs.writeFile(postsFile, JSON.stringify(data, null, 2));

  return newPost;
}

/**
 * Find and return a post by its ID.
 * @param {number} id - Post ID
 * @returns {object|undefined} The post if found, otherwise undefined
 */
export async function readPost(id) {
  let data = await fs.readFile(postsFile, "utf8");
  data = JSON.parse(data);

  const post = data.posts.find((post) => post.id === id);
  return post;
}

/**
 * Update a post's title and/or content.
 * @param {number} id - Post ID
 * @param {string} newTitle - New title (optional)
 * @param {string} newContent - New content (optional)
 * @returns {boolean} True if updated successfully, false if post not found
 */
export async function updatePost(id, newTitle, newContent) {
  let data = JSON.parse(await fs.readFile(postsFile, "utf8"));
  const index = data.posts.findIndex((p) => p.id === id);

  if (index === -1) {
    return false;
  } else {
    if (newTitle) data.posts[index].title = newTitle;
    if (newContent) data.posts[index].content = newContent;
  }

  await fs.writeFile(postsFile, JSON.stringify(data, null, 2));

  return true;
}

/**
 * Delete a post by its ID.
 * @param {number} id - Post ID
 * @returns {boolean} True if deleted successfully, false if post not found
 */
export async function deletePost(id) {
  let data = JSON.parse(await fs.readFile(postsFile, "utf8"));
  const index = data.posts.findIndex((p) => p.id === id);

  if (index === -1) {
    return false;
  } else {
    data.posts.splice(index, 1);
  }
  await fs.writeFile(postsFile, JSON.stringify(data, null, 2));

  return true;
}

/**
 * Return all posts as an array of objects.
 * @returns {Array<object>} Array of all post objects
 */
export async function listPosts() {
  let data = JSON.parse(await fs.readFile(postsFile, "utf8"));
  return data.posts;
}
