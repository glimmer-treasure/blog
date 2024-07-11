import { glob } from "glob";
import path from "node:path";
import process from "node:process";
import matter from "gray-matter";
import type { DefaultTheme } from "vitepress";

const rootPath = process.cwd();
const draftsDir = path.resolve(rootPath, "./drafts");
const files = glob.sync(`${draftsDir}/**/*.md`);

export const getDrafts = () => {
  let allDrafts: Array<DefaultTheme.SidebarItem> = [];
  files.forEach((postPath) => {
    const file = matter.read(postPath);
    const postInfo = {
      text: file.data.title,
      link: `/${path.relative(rootPath, postPath).slice(0, -3)}`,
    };
    allDrafts.push(postInfo);
  });
  return allDrafts;
};
