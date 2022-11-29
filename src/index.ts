import express from "express"

const app = express()

app.get("/", (req: Request, res: Response) => {
    return res.json({
        status: "Exito",
    });
});

app.listen(4000, () => console.log("Puerto 4000"));
