const minify = require("html-minifier").minify;
const fs = require("fs-extra");
const path = require("path");



async function copyStaticAssets() {
    const projectRoot = path.join(__dirname,"..")
    const dist = path.join(projectRoot,"dist");
    const src = path.join(projectRoot,"src");
    const assets = [
        "nrlint-core.html",
        "nrlint-core.js",
        "nrlint-rules.html",
        "nrlint-rules-function-eslint.html"
    ];
    await fs.mkdir(dist,{recursive: true});
    for (let i=0; i<assets.length; i++) {
        if (/\.html/.test(assets[i])) {
            const content = await fs.readFile(path.join(src,assets[i]),"utf-8")
            await fs.writeFile(path.join(dist,assets[i]), minify(content, {minifyCSS: true, minifyJS: true}))
        } else if (/\.js/.test(assets[i])) {
            await fs.copy(path.join(src,assets[i]),path.join(dist,assets[i]))
        } else {
            await fs.mkdir(path.join(dist,assets[i]), {recursive: true});
            await fs.copy(path.join(src,assets[i]),path.join(dist,assets[i]))
        }
    }

}



(async function() {
    await copyStaticAssets();
})().catch(err => {
    console.error(err);
    process.exit(1);
});
