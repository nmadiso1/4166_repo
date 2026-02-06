// test.js

import { resetPosts, createPost, readPost } from './blogService.js';

async function testReadPost() {
  console.log("Resetting posts...");
  await resetPosts();

  console.log("Creating a post...");
  const created = await createPost("Test Title", "This is the content.");
  console.log("Created post:", created);

  console.log("Reading the post by ID...");
  const found = await readPost(created.id);
  console.log("Found post:", found);

  console.log("Trying to read a non-existent post...");
  const missing = await readPost(9999);
  console.log("Missing post:", missing);
}

testReadPost();
