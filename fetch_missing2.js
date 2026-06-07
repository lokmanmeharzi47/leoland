const fs = require('fs');

async function download(url, filename) {
  const res = await fetch(url);
  const text = await res.text();
  fs.writeFileSync(filename, text);
  console.log('Downloaded ' + filename);
}

async function run() {
  await download("https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzVjOWMxODViYjgxZDQ1MWJiZjNjNjc1YzkyOGRkYjM4EgsSBxDn9MXKnRoYAZIBJAoKcHJvamVjdF9pZBIWQhQxNjgwMTAwMjkxOTY2NzkxOTczNA&filename=&opi=89354086", "ai_tutor.html");
  await download("https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzk5Y2ZlZWQ1MmFmNDQxNjI4YjY5ZGU0ZTc4ZWRkYmVjEgsSBxDn9MXKnRoYAZIBJAoKcHJvamVjdF9pZBIWQhQxNjgwMTAwMjkxOTY2NzkxOTczNA&filename=&opi=89354086", "lessons_overview.html");
}

run();
