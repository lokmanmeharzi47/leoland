const fs = require('fs');

async function download(url, filename) {
  const res = await fetch(url);
  const text = await res.text();
  fs.writeFileSync(filename, text);
  console.log('Downloaded ' + filename);
}

async function run() {
  await download("https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzdmMGEwZWE2YzQ2MDQyZmNhN2JkZWRkNjdlMmZkZTAzEgsSBxDn9MXKnRoYAZIBJAoKcHJvamVjdF9pZBIWQhQxNjgwMTAwMjkxOTY2NzkxOTczNA&filename=&opi=89354086", "admin_lesson_builder.html");
  await download("https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sX2RhYmZjYTgwMTRhODQzZjk4MjkyN2NkOGZkZTJjODM3EgsSBxDn9MXKnRoYAZIBJAoKcHJvamVjdF9pZBIWQhQxNjgwMTAwMjkxOTY2NzkxOTczNA&filename=&opi=89354086", "ai_tutor_conversation.html");
  await download("https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzNhZjZkNzA0MzY4MzRmNDU5Yzc5MDBkNDZmNDc3NGZiEgsSBxDn9MXKnRoYAZIBJAoKcHJvamVjdF9pZBIWQhQxNjgwMTAwMjkxOTY2NzkxOTczNA&filename=&opi=89354086", "story_library_experience.html");
}

run();
