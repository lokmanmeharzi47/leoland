const fs = require('fs');

async function download(url, filename) {
  const res = await fetch(url);
  const text = await res.text();
  fs.writeFileSync(filename, text);
  console.log('Downloaded ' + filename);
}

async function run() {
  await download("https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzE1M2I0M2U4YTc5ZDQ2NmY4ZThjM2EzNzViYjQzZTlkEgsSBxDn9MXKnRoYAZIBJAoKcHJvamVjdF9pZBIWQhQxNjgwMTAwMjkxOTY2NzkxOTczNA&filename=&opi=89354086", "reward_economy.html");
  await download("https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzRiY2E5ZmU2NjU3ZDRiYjFhYzk0MWQ4NmQxMWRlZDQ5EgsSBxDn9MXKnRoYAZIBJAoKcHJvamVjdF9pZBIWQhQxNjgwMTAwMjkxOTY2NzkxOTczNA&filename=&opi=89354086", "game_center_library.html");
  await download("https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzU5Mzc4NjZiMmE0MzQ2OTY4Mzg4MTM4YmY1M2JiMDMxEgsSBxDn9MXKnRoYAZIBJAoKcHJvamVjdF9pZBIWQhQxNjgwMTAwMjkxOTY2NzkxOTczNA&filename=&opi=89354086", "learning_path_builder.html");
}

run();
