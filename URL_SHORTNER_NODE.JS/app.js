import { createServer } from "http";
import { readFile } from "fs/promises";
import crypto from "crypto"
import path from "path";
import { writeFile } from "fs";

const PORT = 3000;
const DATA_FILE= path.join("data","links.json")
const serveFile = async (res, filePath, contentType) => {
    try {
        const data = await readFile(filePath);

        res.writeHead(200, {
            "Content-Type": contentType
        });

        res.end(data);
    } catch (err) {
        res.writeHead(404, {
            "Content-Type": "text/plain"
        });

        res.end("404 Page Not Found");
    }
};

const loadLinks = () => {
    try{
        const data= await readFile(url,"utf-8");
        return JSON.parse(data);
    }catch(error){
        if(error.code==="ENOENT"){
            await writeFile(url,JSON.stringify({}));
            return {};
        }
        throw error
    }
}

const server = createServer(async (req, res) => {
    console.log(req.method, req.url);


    switch (req.url) {
        case "/":
            return serveFile(
                res,
                path.join("public", "index.html"),
                "text/html"
            );

        case "/style.css":
            return serveFile(
                res,
                path.join("public", "style.css"),
                "text/css"
            );

        case "/script.js":
            return serveFile(
                res,
                path.join("public", "script.js"),
                "application/javascript"
            );

        default:
            res.writeHead(404, {
                "Content-Type": "text/plain"
            });
            res.end("404 Page Not Found");
    }

    if (req.method === "POST" && req.url === "/shorten") {

        const links = await loadLinks();

        let body = "";

        req.on("data", chunk => {
            body += chunk;
        });

        req.on("end", () => {
            console.log(body);

            const { url, shortCode } = JSON.parse(body);

            if (!url) {
                res.write(400, { "Content-Type": "text/plain" })
                return res.end("URL is required");
            }

            const finalShortCode = shortCode || crypto.randomBytes(4).toString("hex");

        });

        return;
    }
    if (req.method !== "GET") {
        res.writeHead(405);
        return res.end("Method Not Allowed");
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});