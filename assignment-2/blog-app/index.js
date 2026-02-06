// index.js
// This module reads commands from commands.json and executes them sequentially.

import fs from 'fs/promises';
import { join } from 'path';
import { 
  resetPosts,
  createPost,
  readPost,
  updatePost,
  deletePost,
  listPosts 
  } from './blogService.js';

/**
 * Executes a single blog command object.
 * The command object has an "action" property and optional data (title, content, id).
 * Each case performs any necessary input validation, executes the action, and logs the outcome.
 * 
 * @param {object} cmd - The command to process
 * 
 * Implement each case based on the descriptions below.
 */
export async function processCommand(cmd) {
  switch (cmd.action) {
    case 'reset': {
      // Clears all posts and resets nextId to 1
      await resetPosts();

      // Logs: "Posts have been reset"
      console.log("Posts have been reset");
      break;
    }
    case 'create': {
      // Check that title and content are provided
      const {title, content} = cmd;
      if (!title || !content) { 
          console.log("Title and content must be provided"); 
          break; 
        }
      // If missing, log "Title and content must be provided"
      // Otherwise, create a new post with a unique ID and timestamp
      const newPost = await createPost(title, content);

      // Logs: "Created post <id>: <title>"
      console.log(`Created post ${newPost.id}: ${newPost.title}`);
      break;
    }
    case 'read': {
      // Look up a post by ID
      const { id } = cmd 

      // If found, log "Post <id>: <title> - <content>"
      const post = await readPost(id);
      if (post) {
      console.log(`Post ${post.id}: ${post.title} - ${post.content}`);
      } else {
      // If not found, log "Post <id> not found"
      console.log(`Post ${id} not found`);
      }
      break;
    }
    case 'update': {
      // Ensure at least title or content is provided
      const { id, title, content } = cmd

      // If both are empty, log "Either title or content must be provided"
      if (!title && !content) {
        console.log("Either title or content must be provided")
        break;
      }

      // Update the post if it exists
      const success = await updatePost(id, title, content);

      // Log "Post <id> updated" if successful
      if (success) { 
        console.log(`Post updated ${id}, ${title}, ${content}`); 
      } else { 
        console.log(`Post ${id} not found`); 
      }
  break;
  }
    case 'delete': {
      const { id } = cmd;

      // Validate ID
      if (typeof id !== 'number') {
        console.log("A valid numeric ID must be provided");
        break;
      }

      const success = await deletePost(id);

      if (success) {
        console.log(`Post ${id} deleted`);
      } else {
        console.log(`Post ${id} not found`);
      }

  break;
  }

  case 'list': {
    const posts = await listPosts();
    console.log("All posts:", posts);
  break;
}
    case 'exit': {
      console.log('Exiting program');
      process.exit(0);
    }
    default: {
      console.log(`Unknown action: ${cmd.action}`);
      break;
    }
  }
}

/**
 * ===============================
 * IMPORTANT – DO NOT MODIFY
 * ===============================
 *
 * If this file is executed directly (e.g., `node index.js`),
 * it will read commands from commands.json and process them sequentially.
 * 
 * This section is required for autograding and testing.
 */
if (process.argv[1] === new URL(import.meta.url).pathname) {
  const commandsFilePath = join(process.cwd(), 'commands.json');

  const data = await fs.readFile(commandsFilePath, 'utf-8');
  const commands = JSON.parse(data);

  for (const cmd of commands) {
    await processCommand(cmd);
  }
}