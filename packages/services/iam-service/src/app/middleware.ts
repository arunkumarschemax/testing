import { Request, Response, NextFunction } from "express";
import * as fs from 'fs';
import * as path from 'path';



export const middlewareHandler = (req: Request, response: Response, next: NextFunction) => {
    // const k = fs.readFileSync('./app.service.ts')
    // console.log(k)
    if (req.body.entityElements) {
        // fs.writeFileSync('./testing',JSON.stringify(req.body.entityElements),)
        const fullPath = __dirname;
        const newPath = fullPath.replace(/\\dist/, '');
        const k = fs.writeFileSync(path.join(newPath, '\\files\\k.ts'), JSON.stringify(req.body.entityElements));
    }
    next()
}


// C:\New folder (2)\library\packages\services\iam-service\